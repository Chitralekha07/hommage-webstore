import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Trash2, Pencil, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { heroAspects, mediaUrl, type HeroAspect, type Post, type PostSection, type SiteSettings } from "@/lib/content";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Hommage" },
      { name: "description", content: "Hommage admin panel for events, journal and homepage media." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin — Hommage" },
      { property: "og:description", content: "Private administration area for the Hommage website." },
    ],
  }),
  component: AdminPage,
});

async function uploadMedia(file: File) {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return { path, type: file.type.startsWith("video") ? "video" : "image" } as const;
}

function AdminPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const roleQuery = useQuery({
    queryKey: ["is-admin", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data);
    },
  });

  if (checking) {
    return <Centered>Checking your session…</Centered>;
  }

  if (!userId) return <SignIn />;

  if (roleQuery.isLoading) return <Centered>Loading the panel…</Centered>;

  if (!roleQuery.data) {
    return (
      <Centered>
        <p>This account does not have admin access.</p>
        <button
          type="button"
          className="btn-tactile mt-8"
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </button>
      </Centered>
    );
  }

  return <AdminPanel />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center text-sm leading-loose text-muted-foreground">
      {children}
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (error) toast.error(error.message);
    else toast.success("Welcome back.");
  }

  return (
    <div className="mx-auto max-w-md px-6 py-28">
      <p className="eyebrow text-gold">Hommage</p>
      <h1 className="mt-5 text-3xl text-teal">Admin sign in</h1>
      <div className="gold-rule mt-8" />
      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={pending} className="btn-tactile btn-tactile-solid w-full">
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function AdminPanel() {
  const [tab, setTab] = useState<"event" | "journal" | "upcoming" | "home">("event");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:px-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="eyebrow text-gold">Admin</p>
          <h1 className="mt-4 text-3xl text-teal">Manage the house</h1>
        </div>
        <button type="button" className="btn-tactile" onClick={() => supabase.auth.signOut()}>
          Sign out
        </button>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {(
          [
            ["event", "Events"],
            ["journal", "Journal"],
            ["upcoming", "Upcoming announcements"],
            ["home", "Homepage hero"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`btn-tactile ${tab === value ? "btn-tactile-solid" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="gold-rule mt-10" />

      {tab === "home" ? <HeroEditor /> : <PostsManager section={tab} />}
    </div>
  );
}

function usePosts(section: PostSection) {
  return useQuery({
    queryKey: ["posts", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("section", section)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Post[];
    },
  });
}

const emptyDraft = {
  title: "",
  body: "",
  event_date: "",
  location: "",
  media_url: null as string | null,
  media_type: null as string | null,
};

function PostsManager({ section }: { section: PostSection }) {
  const queryClient = useQueryClient();
  const { data: posts = [], isLoading } = usePosts(section);
  const [editing, setEditing] = useState<Post | null>(null);
  const [draft, setDraft] = useState({ ...emptyDraft });
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);

  function startNew() {
    setEditing(null);
    setDraft({ ...emptyDraft });
    setFile(null);
    setOpen(true);
  }

  function startEdit(post: Post) {
    setEditing(post);
    setDraft({
      title: post.title,
      body: post.body,
      event_date: post.event_date ?? "",
      location: post.location ?? "",
      media_url: post.media_url,
      media_type: post.media_type,
    });
    setFile(null);
    setOpen(true);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim()) {
      toast.error("A title is required.");
      return;
    }
    setPending(true);
    try {
      let media_url = draft.media_url;
      let media_type = draft.media_type;
      if (file) {
        const uploaded = await uploadMedia(file);
        media_url = uploaded.path;
        media_type = uploaded.type;
      }
      const payload = {
        section,
        title: draft.title.trim(),
        body: draft.body,
        event_date: draft.event_date.trim() || null,
        location: draft.location.trim() || null,
        media_url,
        media_type,
      };
      const { error } = editing
        ? await supabase.from("posts").update(payload).eq("id", editing.id)
        : await supabase.from("posts").insert(payload);
      if (error) throw error;
      toast.success(editing ? "Post updated." : "Post published.");
      setOpen(false);
      setEditing(null);
      setDraft({ ...emptyDraft });
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ["posts", section] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save the post.");
    } finally {
      setPending(false);
    }
  }

  async function remove(post: Post) {
    if (!window.confirm(`Delete “${post.title}”?`)) return;
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (post.media_url && !post.media_url.startsWith("http")) {
      await supabase.storage.from("media").remove([post.media_url]);
    }
    toast.success("Post deleted.");
    queryClient.invalidateQueries({ queryKey: ["posts", section] });
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl text-teal">
          {section === "event"
            ? "Event posts"
            : section === "journal"
              ? "Journal posts"
              : "Upcoming announcements"}
        </h2>
        <button type="button" onClick={startNew} className="btn-tactile inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> {section === "upcoming" ? "New announcement" : "New post"}
        </button>
      </div>

      {open && (
        <form onSubmit={save} className="mt-8 space-y-6 border border-gold/25 p-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">{section === "upcoming" ? "Message" : "Text"}</Label>
            <Textarea
              id="body"
              rows={8}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date (optional)</Label>
              <Input
                id="date"
                value={draft.event_date}
                onChange={(e) => setDraft({ ...draft, event_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (optional)</Label>
              <Input
                id="location"
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="media">Image or video</Label>
            <input
              id="media"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:border file:border-gold/40 file:bg-transparent file:px-4 file:py-2 file:text-xs file:tracking-[0.18em] file:text-teal file:uppercase"
            />
            {draft.media_url && !file && (
              <p className="text-xs text-muted-foreground">Current media attached.</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={pending} className="btn-tactile btn-tactile-solid">
              {pending ? "Saving…" : editing ? "Save changes" : "Publish"}
            </button>
            <button type="button" className="btn-tactile" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-10">
        {isLoading ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing published yet.</p>
        ) : (
          <ul className="divide-y divide-gold/20 border-y border-gold/20">
            {posts.map((post) => (
              <li key={post.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                <div className="min-w-0">
                  <p className="text-lg text-teal">{post.title}</p>
                  <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    {post.event_date || new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-tactile" onClick={() => startEdit(post)}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button type="button" className="btn-tactile" onClick={() => remove(post)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function HeroEditor() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("id, hero_url, hero_type, hero_aspect")
        .eq("id", "main")
        .maybeSingle();
      if (error) throw error;
      return (data as SiteSettings | null) ?? null;
    },
  });

  const [aspect, setAspect] = useState<HeroAspect>("full");
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (data?.hero_aspect) setAspect(data.hero_aspect as HeroAspect);
  }, [data?.hero_aspect]);

  const preview = useMemo(() => mediaUrl(data?.hero_url), [data?.hero_url]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    try {
      let hero_url = data?.hero_url ?? null;
      let hero_type = data?.hero_type ?? null;
      if (file) {
        const uploaded = await uploadMedia(file);
        hero_url = uploaded.path;
        hero_type = uploaded.type;
      }
      const { error } = await supabase
        .from("site_settings")
        .upsert({ id: "main", hero_url, hero_type, hero_aspect: aspect });
      if (error) throw error;
      toast.success("Homepage hero updated.");
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update the hero.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={save} className="mt-12 max-w-2xl space-y-8">
      <h2 className="text-xl text-teal">Homepage hero</h2>

      {preview && (
        <p className="text-xs text-muted-foreground">
          Current: {data?.hero_type === "video" ? "video" : "image"} in use.
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="hero-file">Upload a photo or video</Label>
        <input
          id="hero-file"
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:border file:border-gold/40 file:bg-transparent file:px-4 file:py-2 file:text-xs file:tracking-[0.18em] file:text-teal file:uppercase"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="eyebrow text-gold">Aspect ratio</legend>
        {heroAspects.map((option) => (
          <label key={option.value} className="flex items-center gap-3 text-sm text-foreground/80">
            <input
              type="radio"
              name="aspect"
              value={option.value}
              checked={aspect === option.value}
              onChange={() => setAspect(option.value)}
              className="accent-[var(--teal)]"
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pending} className="btn-tactile btn-tactile-solid">
          {pending ? "Saving…" : "Save hero"}
        </button>
        {data?.hero_url && (
          <button
            type="button"
            className="btn-tactile"
            onClick={async () => {
              const { error } = await supabase
                .from("site_settings")
                .update({ hero_url: null, hero_type: null })
                .eq("id", "main");
              if (error) toast.error(error.message);
              else {
                toast.success("Reverted to the default film.");
                queryClient.invalidateQueries({ queryKey: ["site-settings"] });
              }
            }}
          >
            Use default film
          </button>
        )}
      </div>
    </form>
  );
}
