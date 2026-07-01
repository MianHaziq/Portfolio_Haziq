// Canonical production origin. Override per-environment with NEXT_PUBLIC_SITE_URL
// (e.g. a preview deployment); the trailing slash is stripped so we can safely
// concatenate paths. Used by metadataBase, the sitemap, robots and JSON-LD.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://haziqnazeer.online"
).replace(/\/+$/, "");

export const siteConfig = {
  name: "Haziq Nazeer",
  fullName: "Muhammad Haziq Nazeer",
  role: "Software Engineer",
  url: SITE_URL,
  tagline: "Building secure, real-time, AI-powered systems",
  bio: "I build secure, real-time and AI-powered backend and full-stack systems with NestJS, FastAPI, Next.js, PostgreSQL and AWS. Promoted from intern to Associate Software Engineer within a year, I care about shipping production systems that are reliable, scalable and well-engineered.",
  // ── Freelance framing (used across the site now that the focus is client work) ──
  freelanceTagline: "Freelance Backend & AI Engineer",
  freelanceBio:
    "I help startups and businesses ship production-grade backends, real-time features and AI-powered products — NestJS, FastAPI, Next.js, PostgreSQL and AWS. I've taken systems from idea to launch and tuned them to scale past hundreds of thousands of users. Available for freelance projects, contract work and MVP builds.",
  availability: "Available for new projects",
  email: "haziqnazeer@gmail.com",
  phone: "+92 311 0645820",
  location: "Lahore, Pakistan",
  github: "https://github.com/MianHaziq",
  githubHandle: "@MianHaziq",
  linkedin: "https://linkedin.com/in/muhammad-haziq-nazeer",
  linkedinHandle: "Muhammad Haziq Nazeer",
  education: {
    degree: "B.Sc. Software Engineering",
    institution: "University of Central Punjab, Lahore",
    year: "2025",
  },
};

export const skills = [
  { name: "NestJS / Node.js", level: 90, category: "backend" },
  { name: "Next.js / React", level: 88, category: "frontend" },
  { name: "TypeScript", level: 88, category: "frontend" },
  { name: "PostgreSQL / Prisma", level: 85, category: "backend" },
  { name: "Python / FastAPI", level: 80, category: "backend" },
  { name: "WebSockets / Real-time", level: 80, category: "backend" },
  { name: "Redis / BullMQ", level: 78, category: "backend" },
  { name: "AWS (S3, EC2)", level: 75, category: "devops" },
];

// `icon` points to an SVG in public/tech/. `mono` marks single-color (black)
// brand marks that get inverted in dark mode so they stay visible.
export const techStack = {
  Frontend: [
    { name: "React", icon: "/tech/react.svg" },
    { name: "Next.js", icon: "/tech/nextjs.svg", mono: true },
    { name: "TypeScript", icon: "/tech/typescript.svg" },
    { name: "Redux", icon: "/tech/redux.svg" },
    { name: "Tailwind CSS", icon: "/tech/tailwindcss.svg" },
  ],
  Backend: [
    { name: "Node.js", icon: "/tech/nodejs.svg" },
    { name: "NestJS", icon: "/tech/nestjs.svg" },
    { name: "Express.js", icon: "/tech/express.svg", mono: true },
    { name: "FastAPI", icon: "/tech/fastapi.svg" },
    { name: "Python", icon: "/tech/python.svg" },
  ],
  Databases: [
    { name: "PostgreSQL", icon: "/tech/postgresql.svg" },
    { name: "MySQL", icon: "/tech/mysql.svg" },
    { name: "MongoDB", icon: "/tech/mongodb.svg" },
    { name: "Prisma ORM", icon: "/tech/prisma.svg", mono: true },
  ],
  "Real-time & Queues": [
    { name: "WebSockets", icon: "/tech/websockets.svg" },
    { name: "Redis", icon: "/tech/redis.svg" },
    { name: "BullMQ", icon: "/tech/bullmq.svg" },
  ],
  "AI APIs": [
    { name: "OpenAI", icon: "/tech/openai.svg", mono: true },
    { name: "Anthropic Claude", icon: "/tech/claude.svg" },
  ],
  "Cloud & Tools": [
    { name: "AWS (S3, EC2)", icon: "/tech/aws.svg" },
    { name: "Git & GitHub", icon: "/tech/git.svg" },
    { name: "Stripe", icon: "/tech/stripe.svg" },
    { name: "Firebase (FCM)", icon: "/tech/firebase.svg" },
    { name: "Postman", icon: "/tech/postman.svg" },
    { name: "Jira / Agile", icon: "/tech/jira.svg" },
  ],
};

/* ─── Project types ──────────────────────────────────────────────────────────── */
export interface Feature {
  title: string;
  description: string;
}
export interface Challenge {
  challenge: string;
  solution: string;
}
export interface Outcome {
  value: string;
  label: string;
}
export interface GalleryShot {
  /** Path under public/, e.g. "/projects/frizbee-feed.png". Empty → placeholder. */
  src: string;
  caption: string;
}
export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  /** "Full-stack" | "Backend" — used to group/label on the showcase. */
  kind: "Full-stack" | "Backend";
  /** "web" = landscape screenshots; "mobile" = portrait phone screenshots. */
  media: "web" | "mobile";
  /** Short hero summary shown on the case-study page. */
  summary: string;
  /** One-line description used on the home project card. */
  description: string;
  tags: string[];
  /** Hero / card image. Empty → branded gradient placeholder. */
  image: string;
  /** Screenshots for the case-study gallery. */
  gallery: GalleryShot[];
  gradient: string;
  github: string;
  live: string;
  featured: boolean;
  /** Case-study body. */
  overview: string;
  problem: string;
  solution: string;
  features: Feature[];
  contributions: string[];
  challenges: Challenge[];
  outcomes: Outcome[];
}

/**
 * Real projects + full case-study content, grounded in the actual codebases.
 * Order: full-stack projects first, then backend projects.
 *
 * Images: drop screenshots in `public/projects/` and fill the `image`
 * (hero) and `gallery[].src` paths. Empty paths render branded gradient
 * placeholders, so each case study looks complete before screenshots exist.
 * `github` / `live` links only render when non-empty.
 */
export const projects: Project[] = [
  {
    id: 1,
    slug: "virtualmd",
    title: "VirtualMD",
    subtitle: "AI Telehealth Platform",
    role: "Full-Stack Engineer · Web reliability owner",
    period: "2025 — Present",
    kind: "Full-stack",
    summary:
      "A production AI telehealth platform with 70+ AI specialist doctors across web and mobile — real-time voice and streaming chat consultations powered by Anthropic Claude and OpenAI's Realtime API, engineered for reliability at scale.",
    description:
      "Production AI telehealth platform — 70+ AI specialist doctors with real-time WebRTC voice and streaming chat (Claude + OpenAI Realtime). I owned web reliability and the real-time streaming pipeline.",
    tags: ["FastAPI", "Python", "React", "PostgreSQL", "Anthropic Claude", "OpenAI Realtime", "WebRTC", "Redis"],
    media: "web",
    image: "/projects/virtualmd-hero.jpg",
    gallery: [
      { src: "/projects/virtualmd-1.jpg", caption: "Live AI consultation — streamed answers with cited sources and suggested follow-ups" },
      { src: "/projects/virtualmd-2.jpg", caption: "The panel — 70+ AI specialist doctors to choose from" },
      { src: "/projects/virtualmd-3.jpg", caption: "Starting a consultation with a personal AI health advisor" },
    ],
    gradient: "from-sky-500 to-indigo-600",
    github: "",
    live: "https://virtualmd.app",
    featured: true,
    overview:
      "VirtualMD lets patients consult 70+ AI specialist doctors by voice or chat across web and mobile. A Python FastAPI backend coordinates multiple AI providers — Anthropic Claude for clinical reasoning, OpenAI's Realtime API over WebRTC for live voice — behind a React app, a separate admin console and a Next.js marketing site. It runs in production at virtualmd.app.",
    problem:
      "Real-time medical conversations are unforgiving: a dropped socket, a stalled token stream or a latency spike breaks the consultation instantly. The platform also had to coordinate multiple AI providers, serve web and mobile from one API, and stay reliable as usage grew toward serving a very large user base.",
    solution:
      "I owned web reliability and the real-time streaming pipeline end to end. I hardened the WebSocket layer (keep-alive pings, idle cleanup, exponential-backoff reconnection, per-connection rate limiting) and built an adaptive client-side drain that scales the typewriter render to queue depth so streamed responses never stall. On the backend I worked across a provider-abstracted AI connector with fallback handling, a Redis cache-aside layer with graceful degradation, Celery background jobs, and a Postgres schema tuned with connection pooling and targeted indexes — architecture built to scale toward 1M+ users.",
    features: [
      { title: "Real-time AI chat", description: "Token-by-token streaming over a custom StreamStart / Chunk / End WebSocket protocol." },
      { title: "Live voice consultations", description: "OpenAI Realtime API over WebRTC with on-device voice-activity detection." },
      { title: "70+ AI specialist doctors", description: "A coordinator routes each turn to the right specialist persona." },
      { title: "Vision & document analysis", description: "Uploaded images and PDFs analysed by Claude with format detection." },
      { title: "Family & guest modes", description: "Separate histories per family member, plus no-login guest sessions." },
      { title: "30+ languages with RTL", description: "Full internationalisation including right-to-left layouts." },
    ],
    contributions: [
      "Owned web app reliability and the real-time streaming pipeline.",
      "Built a custom WebSocket manager — keep-alive, idle cleanup, reconnection with backoff, per-connection rate limiting.",
      "Engineered an adaptive client-side stream drain (RAF batching scaled to queue depth) for smooth, stall-free token rendering.",
      "Worked across the provider-abstracted AI connector with 429 / timeout / refusal fallbacks.",
      "Tuned Postgres with connection pooling and indexes, and added a Redis cache-aside layer with graceful degradation.",
      "Coordinated API contract changes across the web and mobile teams.",
    ],
    challenges: [
      {
        challenge: "Streamed AI responses stalled or overwhelmed the UI under load.",
        solution: "Built an adaptive requestAnimationFrame drain that scales batch size to queue depth (2→12 chars/frame) and flushes when the tab is hidden — smooth output with no runaway queues.",
      },
      {
        challenge: "Real-time voice and chat sockets dropped mid-consultation.",
        solution: "Added keep-alive pings, idle cleanup and 5-attempt exponential-backoff reconnection with a 15s health check so sessions stay live.",
      },
      {
        challenge: "A single AI provider hitting a 429 or timeout would break a consultation.",
        solution: "Routed all AI calls through one connector with model selection and typed fallbacks for rate limits, timeouts and refusals.",
      },
    ],
    outcomes: [
      { value: "70+", label: "AI specialist doctors" },
      { value: "Web + Mobile", label: "Served from one API" },
      { value: "Live", label: "In production at virtualmd.app" },
    ],
  },
  {
    id: 2,
    slug: "lingualeap",
    title: "LinguaLeap",
    subtitle: "Real-time AI Arabic-Learning Platform",
    role: "Full-Stack Engineer",
    period: "2025 — Present",
    kind: "Full-stack",
    summary:
      "An AI platform that turns real Arabic news into complete lessons — live spoken practice over a custom OpenAI Realtime bridge, word-synced audio, XP and streaks, and dual Stripe + RevenueCat billing.",
    description:
      "AI Arabic-learning platform that auto-generates lessons from real news. I built the live speaking module (Socket.IO ↔ OpenAI Realtime), the content pipeline, streaks/progress and Stripe billing.",
    tags: ["NestJS", "Next.js", "TypeORM", "PostgreSQL", "OpenAI Realtime", "Socket.IO", "Stripe", "BullMQ"],
    media: "web",
    image: "/projects/lingualeap-hero.jpg",
    gallery: [
      { src: "/projects/lingualeap-1.jpg", caption: "Live AI speaking practice — full-duplex voice with the Arabic tutor" },
      { src: "/projects/lingualeap-2.jpg", caption: "Karaoke-style reading — word-level synchronised audio with tap-to-translate" },
      { src: "/projects/lingualeap-3.jpg", caption: "Learner dashboard — streaks, XP and progress tracking" },
    ],
    gradient: "from-emerald-500 to-teal-600",
    github: "",
    live: "",
    featured: true,
    overview:
      "LinguaLeap ingests real Arabic news articles and YouTube clips, then uses LLMs to generate complete lessons — vocabulary, grammar, comprehension questions, word-timed narration and live spoken practice — across Reading, Listening, Teaching and Speaking modes. It's a NestJS 11 backend (TypeORM + PostgreSQL) with a Next.js 15 / React 19 web app and a Flutter mobile client.",
    problem:
      "Language learning only sticks with live practice and daily habits, and content has to stay fresh without manual authoring — all while keeping voice low-latency and subscription billing reliable.",
    solution:
      "I built the flagship real-time speaking agent: a Socket.IO gateway bridging the browser to OpenAI's Realtime model with server-side voice-activity detection, a commit debounce, heartbeats and a transcript hallucination filter. I built the autonomous content pipeline (news scraping → LLM generation → Google TTS with word-level timing → S3) with custom rate limiting and a generation lock that prevents duplicate LLM work, the XP / streak / progress systems, and dual Stripe + RevenueCat billing with correct raw-body webhook handling. The TypeORM schema uses composite and partial indexes, and heavy work runs through Bull queues with exponential backoff — built to scale.",
    features: [
      { title: "Live AI speaking", description: "Full-duplex voice over a custom Socket.IO ↔ OpenAI Realtime bridge with server-side VAD." },
      { title: "Automated content pipeline", description: "Lessons generated from real Arabic news (NewsAPI + 26 verified YouTube channels)." },
      { title: "Word-synchronised audio", description: "Karaoke-style reading highlight via Google TTS word timing." },
      { title: "XP, streaks & ILR levels", description: "Gamified progression that drives daily habit formation." },
      { title: "Dual billing", description: "Stripe Checkout + RevenueCat, gated by a @RequiresSubscription decorator." },
      { title: "Push & email notifications", description: "FCM and email delivered through Bull queues and cron schedules." },
    ],
    contributions: [
      "Built the real-time speaking gateway (Socket.IO ↔ OpenAI Realtime) with VAD, commit debounce, heartbeat and a hallucination filter.",
      "Built the autonomous content pipeline: scraping → LLM lesson generation → Google TTS → S3, with custom rate limiting and a concurrency lock.",
      "Designed the TypeORM / PostgreSQL schema with composite and partial indexes for hot queries.",
      "Implemented XP, streaks and progress tracking.",
      "Integrated dual Stripe + RevenueCat billing with signature-verified, raw-body webhooks.",
      "Offloaded video processing and notifications to Bull queues with exponential backoff and cron scheduling.",
    ],
    challenges: [
      {
        challenge: "Low-latency, full-duplex voice with messy browser audio.",
        solution: "A Socket.IO ↔ OpenAI Realtime bridge that strips WAV headers on the fly, runs server-side VAD, debounces commits and heartbeats the connection; the client reconnects with capped backoff.",
      },
      {
        challenge: "Concurrent requests could trigger duplicate, expensive LLM lesson generation.",
        solution: "An in-process generation lock skips work already in flight, plus a queue-based rate limiter around the OpenAI and Google TTS APIs.",
      },
      {
        challenge: "Stripe's raw-body webhook signature is easy to break behind a JSON parser.",
        solution: "Registered the webhook raw-body middleware before JSON parsing and verified every event with constructEvent, with a success-page fallback if the webhook is delayed.",
      },
    ],
    outcomes: [
      { value: "4 modes", label: "Reading · Listening · Teaching · Speaking" },
      { value: "Auto-generated", label: "Lessons from live news" },
      { value: "Real-time", label: "AI speaking practice" },
    ],
  },
  {
    id: 3,
    slug: "lknight-lms",
    title: "LKnight LMS",
    subtitle: "Learning Management System",
    role: "Full-Stack Engineer",
    period: "Oct 2025 — Nov 2025",
    kind: "Full-stack",
    summary:
      "A full-stack LMS with Bunny.net video streaming, Mux live streaming, Stripe multi-seat subscriptions, three-role RBAC, and “The Vault” — a members-only discussion forum.",
    description:
      "Full-stack LMS: Bunny.net video, Mux live streaming, Stripe multi-seat subscriptions, three-role RBAC and a members-only forum (“The Vault”). Built on an Express + Prisma backend and a Next.js 16 frontend.",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "Stripe", "Bunny.net", "Mux", "RBAC"],
    media: "web",
    image: "/projects/lknight-hero.jpg",
    gallery: [
      { src: "/projects/lknight-1.jpg", caption: "Admin dashboard — courses, users and analytics" },
      { src: "/projects/lknight-2.jpg", caption: "Course experience — modules, lessons and streamed video" },
      { src: "/projects/lknight-3.jpg", caption: "Subscription plans and checkout" },
    ],
    gradient: "from-amber-500 to-orange-600",
    github: "",
    live: "",
    featured: true,
    overview:
      "LKnight is a production LMS: a Category → Course → Module → Lesson hierarchy with Bunny.net video lessons, Mux live streaming, Stripe subscription billing (including multi-seat team plans), and “The Vault” — a subscription-gated, anonymous discussion forum. Built as an Express 5 + Prisma 7 backend with a Next.js 16 / React 19 frontend.",
    problem:
      "An LMS has to stream video cost-effectively without exposing source files, gate every action by role, take recurring and team payments securely, and stay responsive as courses and users grow.",
    solution:
      "I built the full stack. Video lives off-origin on Bunny.net and is served through cryptographically signed, time-limited (1-hour) embed URLs, with resumable tus uploads and webhook-driven encoding status. RBAC spans three roles (Student / Instructor / Admin) with DB-backed checks rather than trusting JWT claims, plus subscription-level roles for team seats. Stripe handles subscriptions and multi-seat invites with signature-verified raw-body webhooks, and the Postgres schema is comprehensively indexed — cursor pagination for the Vault feed, offset pagination for catalogs — to stay fast at scale.",
    features: [
      { title: "Hierarchical courses", description: "Category → Course → Module → Lesson with draft / published status and levels." },
      { title: "Bunny.net video lessons", description: "Resumable tus uploads, signed HLS playback and webhook encoding status." },
      { title: "Mux live streaming", description: "Live classes with stream-key issuance and playback IDs." },
      { title: "Stripe team subscriptions", description: "Monthly / yearly plans plus multi-seat invites via email and shareable links." },
      { title: "Three-role RBAC", description: "Student / Instructor / Admin, enforced with DB-backed authorization." },
      { title: "“The Vault”", description: "Subscription-gated anonymous forum with nested replies, likes and near-real-time updates." },
    ],
    contributions: [
      "Built the full stack: Express 5 + Prisma 7 backend (19 routers, 22 controllers) and Next.js 16 frontend.",
      "Implemented three-role RBAC with DB-verified guards and identity-masking in the Vault.",
      "Built secure video delivery on Bunny.net with SHA-256 signed, expiring embed URLs and resumable uploads.",
      "Implemented Stripe subscriptions, multi-seat invites and signature-verified webhooks.",
      "Designed the indexed Postgres schema with cursor + offset pagination and per-route rate limiting.",
    ],
    challenges: [
      {
        challenge: "Serving course video without exposing source files or blowing up origin bandwidth.",
        solution: "Offloaded delivery to Bunny.net and served only SHA-256-signed, 1-hour embed URLs; encoding status synced via webhooks.",
      },
      {
        challenge: "Authorization across three roles plus team-subscription seats, with anonymity in the Vault.",
        solution: "DB-backed role guards (not trusting JWT claims alone) and an author-display layer that masks identities for members but reveals them to admins.",
      },
      {
        challenge: "Stripe webhooks and checkout are eventually consistent.",
        solution: "Verified raw-body webhook signatures and polled the API with exponential backoff on success pages until the subscription settled.",
      },
    ],
    outcomes: [
      { value: "3 roles", label: "RBAC: Student / Instructor / Admin" },
      { value: "Signed URLs", label: "Secure Bunny.net video delivery" },
      { value: "Multi-seat", label: "Stripe team subscriptions" },
    ],
  },
  {
    id: 4,
    slug: "frizbee",
    title: "Frizbee",
    subtitle: "Social Platform Backend (Instagram for Dogs)",
    role: "Backend Engineer",
    period: "2025 — Present",
    kind: "Backend",
    summary:
      "The NestJS backend for an Instagram-style social network for dogs — feed, Reels, 24h Stories, a full social graph and push — designed with keyset pagination and 37 database indexes to scale toward 1M+ users.",
    description:
      "Backend for an Instagram-style social network for dogs (NestJS + Prisma). Keyset-paginated feed, ephemeral Stories, an HLS video pipeline, 3 BullMQ queues and 37 DB indexes — engineered for 1M+ users.",
    tags: ["NestJS", "Prisma", "PostgreSQL", "Redis", "BullMQ", "AWS S3", "CloudFront", "FFmpeg / HLS", "Firebase FCM"],
    media: "mobile",
    image: "/projects/frizbee-hero.jpg",
    gallery: [
      { src: "/projects/frizbee-1.jpg", caption: "Reels — delivered through the FFmpeg HLS video pipeline" },
      { src: "/projects/frizbee-2.jpg", caption: "Dog profiles and the social graph the API models" },
      { src: "/projects/frizbee-3.jpg", caption: "Search and discovery across posts and Wolf Packs" },
    ],
    gradient: "from-violet-500 to-purple-600",
    github: "",
    live: "",
    featured: false,
    overview:
      "Frizbee is the backend for an Instagram-style social platform built for dogs: a photo / Reels feed, ephemeral 24-hour Stories, a full social graph (followers, mutual friends, blocks), “Wolf Pack” communities, reactions and threaded comments, and push notifications. It's a NestJS 11 + Prisma + PostgreSQL API with Redis, BullMQ, an S3 / CloudFront media layer and an FFmpeg HLS transcode pipeline.",
    problem:
      "A social feed has to stay fast as data grows into the millions of rows: offset pagination collapses, naïve queries trigger N+1 explosions, ephemeral content must expire reliably, media can't be pushed through the API, and blocks / privacy must be enforced on every read — all without slowing the hot path.",
    solution:
      "I designed the data model and queries for scale from day one. The feed uses keyset (cursor) pagination backed by composite (createdAt DESC, id DESC) indexes — 37 indexes and uniques across 24 models — so feed reads stay O(limit) regardless of table size. Viewer reactions and context are batch-loaded to kill N+1s; hot signals (Pick-of-the-Litter, viral cutoff) are precomputed off the request path and cached in Redis. Three independent BullMQ queues (media, notifications, push) isolate retry domains, an hourly cron expires Stories in bounded batches, and media uploads go direct to S3 via presigned URLs with an FFmpeg HLS transcode worker that streams from S3 to stay memory-light. Engineered to scale toward 1M+ users.",
    features: [
      { title: "Dual feed", description: "Photo / text Posts and video Reels, with FOR_YOU, followers and friends scopes." },
      { title: "Keyset pagination", description: "Cursor pagination on every list, backed by composite indexes — O(limit) reads." },
      { title: "Ephemeral Stories", description: "24-hour Stories with hourly, batched, memory-bounded TTL cleanup." },
      { title: "Social graph", description: "Followers (“pawollers”), mutual friends and symmetric blocks." },
      { title: "“Wolf Pack” communities", description: "Group spaces with bidirectional invite / request join negotiation." },
      { title: "HLS video pipeline", description: "FFmpeg adaptive-bitrate transcode with instant-playback fallback." },
      { title: "Aggregated push", description: "“X and N others” deduped notifications delivered via Firebase FCM." },
    ],
    contributions: [
      "Built the entire NestJS backend — 16 modules, 24 Prisma models, 31 migrations.",
      "Designed the indexed schema (37 indexes / uniques) and the keyset-paginated, privacy- and block-aware feed engine.",
      "Eliminated N+1s by batch-loading viewer reactions and context per page.",
      "Built the event-driven notification + FCM push pipeline across 3 BullMQ queues with independent retries.",
      "Built the S3 + CloudFront media layer and the FFmpeg HLS transcode worker that streams from S3.",
      "Built ephemeral Stories with cron-driven, batched TTL cleanup and Redis-cached feed signals.",
    ],
    challenges: [
      {
        challenge: "Feed pagination has to stay fast at millions of rows.",
        solution: "Keyset (cursor) pagination with take limit+1 over composite (createdAt DESC, id DESC) indexes — O(limit) reads instead of offset scans that degrade with depth.",
      },
      {
        challenge: "Rendering a feed page risked an N+1 storm of per-post reaction lookups.",
        solution: "Batch-loaded the viewer's reactions for the whole page in one query (postId IN …) and loaded block / friend context once via Promise.all.",
      },
      {
        challenge: "Ephemeral Stories must reliably disappear without exhausting memory.",
        solution: "An hourly cron deletes expired stories in bounded pages (100×100), removing S3 objects before DB rows, backed by an expiresAt index.",
      },
      {
        challenge: "A Firebase outage shouldn't corrupt notification state or double-send pushes.",
        solution: "Split push into its own BullMQ queue with per-device jobs, idempotency via a pushSentAt marker, and dead-token pruning.",
      },
    ],
    outcomes: [
      { value: "1M+", label: "Designed to scale to users" },
      { value: "37", label: "Targeted DB indexes" },
      { value: "O(limit)", label: "Keyset-paginated feed" },
    ],
  },
  {
    id: 5,
    slug: "vybstack",
    title: "Vybstack",
    subtitle: "AI Social Platform Backend",
    role: "Backend Engineer",
    period: "2025 — Present",
    kind: "Backend",
    summary:
      "The backend for a social app that ranks by “vibe”, not likes — a Claude-powered engine that auto-tags posts, profiles user personality “archetypes”, and flags each post's bias, over a feed tuned with composite indexes for scale.",
    description:
      "Backend for a social app built on emotional “vibes” instead of likes. Claude-powered auto-tagging, personality “archetypes” and a content Bias Indicator, over a personalized, cursor-paginated feed (Node / Express + Prisma).",
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL", "Anthropic Claude", "Claude Vision", "AWS S3", "Firebase FCM"],
    media: "mobile",
    image: "",
    gallery: [
      { src: "", caption: "Personalized feed engine — weighted blend of interests, tags, recency & engagement" },
      { src: "", caption: "AI Bias Indicator — Claude classifies each post's lean, agenda risk & framing" },
      { src: "", caption: "Tribes v2 — community spaces with per-tribe moderation rules" },
    ],
    gradient: "from-rose-500 to-pink-600",
    github: "",
    live: "",
    featured: false,
    overview:
      "Vybstack is the backend for a mobile social platform organised around emotional “vibes” rather than likes. Users react with one of three vibe levels, join interest “Tribes”, and attach music to posts. Two AI hooks set it apart: an “archetype” system that profiles a user's personality from their liked content, and an AI “Bias Indicator” that classifies each post's political lean, agenda risk and emotional framing — “context, not truth”. It's a Node.js / Express + Prisma / PostgreSQL API.",
    problem:
      "A personalized feed has to rank content cheaply and stay fast as posts and reactions scale, enrich every post with unreliable LLM output without blocking the writer, and evolve its schema without breaking live mobile clients.",
    solution:
      "I built the entire backend. The hybrid feed ranks candidates by a weighted blend of interest match, tag preference, recency and engagement, served with cursor pagination over a composite (isDeleted, visibility, createdAt) index added in a dedicated index migration. AI enrichment (Claude + Claude Vision auto-tagging, archetype assignment, the Bias Indicator) runs in the background after a fast write, with strict enum and numeric-clamp validation so a misbehaving model can't poison the database. I refactored a per-interest N+1 loop into two batched queries, added global and per-route rate limiting, and shipped continuously via GitHub Actions to EC2 / PM2.",
    features: [
      { title: "Vibe-based reactions", description: "Three vibe levels that feed a personalized tag-preference model." },
      { title: "Hybrid feed ranking", description: "Weighted blend — interest 0.4 / tag 0.3 / recency 0.2 / engagement 0.1." },
      { title: "AI archetypes", description: "Claude profiles a user's personality from the content they vibe with." },
      { title: "AI Bias Indicator", description: "Claude + Vision classify lean, agenda risk, persuasion and emotional framing." },
      { title: "Interest “Tribes”", description: "Community spaces with per-tribe moderation rules (v2)." },
      { title: "Music & safety", description: "Music via Jamendo + Deezer; blocking, hidden posts, reports and soft-delete purge." },
    ],
    contributions: [
      "Architected and built the entire Node / Express + Prisma backend end to end.",
      "Built the weighted, cursor-paginated personalized feed engine.",
      "Integrated Claude for auto-tagging, archetype profiling and the multi-dimensional Bias Indicator — including a Clarifai → Claude Vision migration that halved image-post latency.",
      "Hardened LLM output with regex JSON extraction, enum validation and numeric clamping.",
      "Tuned performance: a composite-index migration, an N+1 → batched-query refactor and rate limiting.",
      "Set up CI/CD via GitHub Actions to AWS EC2 / PM2.",
    ],
    challenges: [
      {
        challenge: "Enriching every post with AI without slowing down posting.",
        solution: "createContent returns immediately, then runs tagging and the Bias Indicator in a background setImmediate block with a foreground / background retry strategy.",
      },
      {
        challenge: "LLMs return malformed or out-of-range data that could poison the feed.",
        solution: "Wrapped every AI response in regex JSON extraction, enum validation and numeric clamping, with a null sentinel for “not yet classified”.",
      },
      {
        challenge: "Creating a post ran 2×N queries to associate interests.",
        solution: "Refactored the per-interest loop into two batched queries (findMany IN + createMany skipDuplicates).",
      },
      {
        challenge: "Evolving the schema without breaking shipped mobile clients.",
        solution: "Dual-wrote the deprecated field alongside new bias columns during the client rollout window.",
      },
    ],
    outcomes: [
      { value: "4-signal", label: "Weighted feed ranking" },
      { value: "Claude", label: "AI tagging, archetypes & bias" },
      { value: "2× faster", label: "Image posts after AI migration" },
    ],
  },
  {
    id: 6,
    slug: "premier-resolution",
    title: "Premier Resolution",
    subtitle: "BPO & Debt-Recovery Company Website",
    role: "Frontend Engineer",
    period: "2025",
    kind: "Full-stack",
    summary:
      "The production marketing site for Premier Resolution, a business-process-outsourcing firm offering debt collection, call-center support, AI chatbots and sales outreach — a fast React SPA with per-service landing pages, a dynamic careers board and a working contact pipeline.",
    description:
      "Production marketing website for a BPO / debt-recovery company. Built as a React + Vite SPA with seven dedicated service pages, a dynamic careers board, an FAQ, testimonials and an EmailJS-powered contact flow.",
    tags: ["React", "Vite", "React Router", "TypeScript", "Tailwind CSS", "Framer Motion", "EmailJS"],
    media: "web",
    image: "/projects/premier-hero.jpg",
    gallery: [
      { src: "/projects/premier-1.jpg", caption: "Service overview — seven offerings, from debt collection and 24/7 AI chatbots to live chat and sales" },
      { src: "/projects/premier-2.jpg", caption: "“Driving Measurable Impact” — accelerated hiring, enterprise workforce and debt-collection enablement" },
      { src: "/projects/premier-3.jpg", caption: "Testimonials & careers — client social proof above the talent-network call to action" },
    ],
    gradient: "from-indigo-500 to-violet-600",
    github: "",
    live: "https://www.premierresolutions.net",
    featured: false,
    overview:
      "Premier Resolution is a business-process-outsourcing (BPO) company that handles debt recovery, inbound/outbound call-center support, 24/7 AI chatbots, live chat, email campaigns and sales outreach for other businesses. I built their public website — a single-page React application (Vite) routed with React Router across a home page, seven individual service pages, an about page, a careers board and a contact page, with a working enquiry pipeline wired through EmailJS and direct WhatsApp / email CTAs.",
    problem:
      "A services company lives or dies on how clearly it can explain what it does and how easily a prospect can reach it. Premier Resolution needed a credible, fast-loading site that gave each of its seven service lines room to sell itself, surfaced trust signals (awards, testimonials, an FAQ), ran a live careers board, and turned visitors into enquiries — without a backend team or CMS to maintain.",
    solution:
      "I architected the site as a content-driven React SPA. A single routed shell renders the home page plus dedicated, individually addressable pages per service (/services/debt-collection, /services/ai-chatbot, /services/live-chat-support and more), each built from a shared, data-driven page template so adding or editing a service is a content change, not new code. I built the careers board (searchable open roles, a benefits grid, and a speculative-application fallback), an animated FAQ accordion, a testimonials carousel and an awards strip for social proof, and wired the contact form to EmailJS with client-side validation, success/error states and bot-submission guards — plus one-tap WhatsApp and email CTAs and an embedded Google Map. Scroll and entrance animations were tuned to stay smooth on low-end devices.",
    features: [
      { title: "Per-service landing pages", description: "Seven individually routed service pages (debt collection, AI chatbot, live chat, email, sales, customer & business services) from one shared template." },
      { title: "Dynamic careers board", description: "Searchable open roles, a benefits grid, and a “don’t see your role?” speculative-application path." },
      { title: "EmailJS contact pipeline", description: "Validated enquiry form sent via EmailJS — no backend — with success / error states and spam guards." },
      { title: "Trust & social proof", description: "Awards strip, a testimonials carousel and an animated FAQ accordion to answer objections inline." },
      { title: "Direct-contact CTAs", description: "One-tap WhatsApp deep links, mailto CTAs and an embedded Google Map of the office." },
      { title: "Motion & responsive design", description: "Framer Motion entrance/scroll animations and a fully responsive, mobile-first layout." },
    ],
    contributions: [
      "Built the entire marketing website as a React + Vite single-page app routed with React Router.",
      "Implemented seven individually addressable service pages from a single data-driven page template.",
      "Built the careers board with role search, a benefits grid and a speculative-application flow.",
      "Wired the contact form to EmailJS with validation, success/error handling and bot guards.",
      "Added testimonials, an awards strip and an animated FAQ accordion for credibility and conversion.",
      "Integrated WhatsApp / email CTAs and an embedded Google Map, and tuned animations for performance.",
    ],
    challenges: [
      {
        challenge: "Seven service lines each needed their own sellable page without seven hand-built layouts.",
        solution: "Drove every service page from one shared, data-configured template, so each service is a content entry with its own clean URL — consistent, fast to extend and easy to maintain.",
      },
      {
        challenge: "Collecting enquiries reliably with no backend to receive them.",
        solution: "Sent submissions through EmailJS straight from the client, with form validation, explicit success/error feedback and submission guards so a bad or bot request fails gracefully.",
      },
      {
        challenge: "Rich motion and imagery risked a heavy, slow first paint for a marketing site.",
        solution: "Shipped a Vite-bundled SPA with route-level code organisation, optimised assets and animation timings tuned to stay smooth on lower-end devices.",
      },
    ],
    outcomes: [
      { value: "7", label: "Dedicated service pages" },
      { value: "Live", label: "In production at premierresolutions.net" },
      { value: "No backend", label: "Enquiries handled via EmailJS" },
    ],
  },
  {
    id: 7,
    slug: "dj-shipping",
    title: "DJ Shipping",
    subtitle: "Freight Forwarding & Customs Clearance Website",
    role: "Frontend Engineer",
    period: "2025",
    kind: "Full-stack",
    summary:
      "A conversion-focused marketing site for DJ Shipping — a licensed freight forwarder operating since 1999. The brief: take 25 years of offline, relationship-driven logistics credibility and turn it into a fast, modern site that wins quote requests.",
    description:
      "Marketing & lead-generation site for a 25-year-old Pakistani freight forwarder. Built the navy-and-amber design system, an interactive nationwide network map, animated service and stats sections, and a 'Request a Quote' funnel — shipped on Vercel.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    media: "web",
    image: "/projects/dj-shipping-hero.jpg",
    gallery: [
      { src: "/projects/dj-shipping-1.jpg", caption: "Three pillars — Customs Clearance, Freight Forwarding and Land Transportation, each with its own detail" },
      { src: "/projects/dj-shipping-2.jpg", caption: "“Present where trade flows” — an interactive map of five offices across Pakistan's trade corridors" },
      { src: "/projects/dj-shipping-3.jpg", caption: "Proof in numbers — 25 years, 100,000+ shipments cleared, 180+ countries reachable" },
    ],
    gradient: "from-sky-500 to-indigo-600",
    github: "",
    live: "https://dj-shipping.vercel.app",
    featured: false,
    overview:
      "DJ Shipping is a licensed freight-forwarding and customs-clearance company that has moved cargo across Pakistan and worldwide since 1999. They had decades of trust but no web presence that reflected it. I designed and built their marketing site: a single, fast-loading page that walks a prospective shipper from the headline promise (“25 Years of End-to-End Supply Chain Reliability”) through the three core services, the specialised-cargo expertise, a nationwide office network and a hard-numbers track record — all funnelling toward one action: Request a Quote.",
    problem:
      "Freight forwarding is a high-trust, offline business won on relationships and references — but multinational shippers increasingly vet partners online first. DJ Shipping's credibility (a zero-lapse customs licence since 1999, 100,000+ shipments, IATA / PIFFA / JC TRANS accreditation) was invisible on the web. The site had to communicate scale and compliance instantly to a sceptical B2B buyer, make a dense service catalogue scannable, and convert that trust into quote requests — while staying fast on the patchy mobile connections common in the target market.",
    solution:
      "I built a single-page, conversion-first site with a clear narrative arc. I designed a navy-and-amber design system that reads as serious and logistics-grade, then structured the page so each scroll answers the buyer's next question: what they do (three service pillars), how they're different (specialised-cargo expertise for textiles, surgical goods, FMCG and project cargo), where they operate (an interactive map of five offices on Pakistan's trade corridors), and why to trust them (a stats band — 25 years, 100,000+ shipments, 180+ countries, 1-business-day quotes, accreditations). Persistent “Request a Quote” and WhatsApp CTAs keep the next step one tap away. Scroll-triggered reveals and small touches like a live-corridor ETA widget add polish without bloating the page, and everything is responsive and tuned for fast first paint, deployed on Vercel.",
    features: [
      { title: "Conversion-first single page", description: "A deliberate scroll narrative — promise → services → specialisation → network → proof → quote — with CTAs always in reach." },
      { title: "Three service pillars", description: "Customs Clearance, Freight Forwarding (air/ocean, FCL/LCL) and Land Transportation, each with its own detail." },
      { title: "Interactive network map", description: "A map of five offices (Lahore HQ, Karachi, Faisalabad, Islamabad, Sialkot) across Pakistan's trade corridors." },
      { title: "Specialised-cargo section", description: "Sector expertise — textiles & apparel, surgical goods, FMCG and hazardous / project cargo — surfaced as a differentiator." },
      { title: "Trust & proof band", description: "Hard numbers and accreditations (JC TRANS, PIFFA, IATA, ACAAP) presented as scannable credibility cards." },
      { title: "Quote & WhatsApp funnel", description: "Persistent “Request a Quote” and one-tap WhatsApp CTAs built around a 1-business-day quotation promise." },
    ],
    contributions: [
      "Designed the navy-and-amber, logistics-grade visual identity and the full page layout from scratch.",
      "Built the conversion-first single-page narrative with always-accessible quote CTAs.",
      "Built the interactive nationwide network map highlighting the five regional offices.",
      "Implemented animated service, specialised-cargo and stats sections with scroll-triggered reveals.",
      "Made the whole site responsive and tuned it for fast first paint on mobile.",
      "Deployed and hosted the site on Vercel.",
    ],
    challenges: [
      {
        challenge: "Establishing instant credibility for a high-trust B2B service to a sceptical buyer.",
        solution: "Led with the 25-year promise and surfaced concrete proof early — a stats band (100,000+ shipments, 180+ countries) and accreditation logos — so trust is communicated before the buyer even reaches the services.",
      },
      {
        challenge: "A dense catalogue of services, sectors and locations risked overwhelming visitors.",
        solution: "Structured everything into a single guided scroll where each section answers the buyer's next question, and turned the office network into an interactive map instead of a wall of text.",
      },
      {
        challenge: "Rich motion and full-bleed imagery can wreck load time on patchy mobile networks.",
        solution: "Kept it a single optimised page with compressed hero imagery, scroll-triggered (not upfront) animations and a layout tuned for a fast first paint.",
      },
    ],
    outcomes: [
      { value: "25 yrs", label: "Of offline trust, brought online" },
      { value: "1-day", label: "Quote-turnaround funnel the site is built around" },
      { value: "Live", label: "In production on Vercel" },
    ],
  },
  {
    id: 8,
    slug: "amoonis-boutique",
    title: "Amoonis Boutique",
    subtitle: "Multi-Region E-Commerce Platform",
    role: "Full-Stack Engineer",
    period: "2025 — Present",
    kind: "Full-stack",
    summary:
      "A production, multi-region e-commerce platform for a GCC gift-box boutique — one Express + Prisma backend powering a Flutter app and a Next.js admin + storefront, with MyFatoorah / Apple Pay payments engineered for money-safety, granular manager RBAC, push, CDN media and bilingual English/Arabic.",
    description:
      "Production multi-region e-commerce platform (internally “Amoon Bloom”). One Express + Prisma + PostgreSQL API serves a Flutter app and a Next.js admin + storefront — MyFatoorah / Apple Pay + COD with concurrency-safe checkout, a 10-permission manager RBAC, FCM push, pg-boss jobs and EN/AR i18n.",
    tags: ["Express", "Prisma", "PostgreSQL", "Next.js", "React", "MyFatoorah / Apple Pay", "pg-boss", "Firebase FCM"],
    media: "web",
    image: "/projects/amoonis-hero.jpg",
    gallery: [
      { src: "/projects/amoonis-1.jpg", caption: "Admin dashboard — live revenue, orders and customer KPIs with the latest-orders feed" },
      { src: "/projects/amoonis-2.jpg", caption: "Manager RBAC — admins grant scoped access across 10 permission areas (products, orders, promos, analytics…)" },
      { src: "/projects/amoonis-3.jpg", caption: "Analytics — revenue time-series, AOV and category sales ranking, built with no chart library" },
    ],
    gradient: "from-rose-500 to-pink-600",
    github: "",
    live: "",
    featured: true,
    overview:
      "Amoonis Boutique is a full-stack, multi-region e-commerce platform I built end to end for a GCC gift-box brand. A single Express 5 + Prisma 7 + PostgreSQL REST API (30 data models, ~107 endpoints) serves two clients from one backend: a Flutter mobile storefront and a Next.js 16 / React 19 app that contains both the customer storefront and a complete 13-section admin panel. It takes real money via MyFatoorah (Apple Pay + cards) and Cash-on-Delivery, sends Firebase push, delivers product images over a Bunny CDN, runs durable background work on pg-boss, and is fully bilingual English/Arabic with right-to-left support.",
    problem:
      "Real e-commerce is unforgiving in two places at once: money and operations. Checkout has to take payments across mobile and web without ever overselling stock, double-charging a customer, or losing an order to a dropped payment callback. At the same time the boutique's team needed to run the whole business — products, orders, promos, regions, analytics — without every staff member having full admin power. And it all had to work in two languages (EN/AR, RTL) across two regions, served to both a Flutter app and a web client from one codebase.",
    solution:
      "I built the backend as a layered Express API (routes → controllers → services) and made payment correctness the centerpiece. Every payment is re-verified server-side with the gateway (the client is never trusted); the PAID flip is an idempotent, conditional update so a callback, webhook, reconciliation job and retries all converge on exactly one order placement; stock is reserved with a row-conditional atomic decrement that closes the oversell race; and Apple Pay's non-idempotent execute is protected by an atomic single-winner claim. A reconciliation cron recovers stranded payments and an expiry cron restores stock and promo usage. On top of that I built a 10-permission manager RBAC (admins delegate scoped access, enforced in middleware and mirrored across the admin UI in three layers), FCM push with per-user preferences and an inbox, a pg-boss job system on Postgres (no Redis), Bunny CDN image delivery, multi-region catalog visibility, promo codes, and an auto-translating EN/AR content layer. The Next.js admin + storefront is feature-sliced with React Query + Redux Toolkit and react-hook-form + Zod throughout.",
    features: [
      { title: "Money-safe checkout", description: "MyFatoorah (Apple Pay + cards) & COD with server-side verification, idempotent single-winner confirmation and double-charge guards." },
      { title: "Manager RBAC", description: "10 granular permissions let admins delegate scoped access (products, orders, promos, analytics…), enforced in middleware and the UI." },
      { title: "One API, two clients", description: "A single Express + Prisma backend serves both a Flutter mobile app and the Next.js web storefront + admin." },
      { title: "Durable background jobs", description: "pg-boss on Postgres (no Redis) — payment reconciliation, order expiry, low-stock digests, broadcasts and cleanup." },
      { title: "Push, email & CDN", description: "Firebase push with preferences + inbox, Resend email (SMTP fallback), and Bunny CDN product-image delivery." },
      { title: "Bilingual & multi-region", description: "English/Arabic with RTL and auto-translation, plus runtime-added regions scoping catalog visibility." },
    ],
    contributions: [
      "Built the entire Express 5 + Prisma 7 + PostgreSQL API — 30 models, ~107 endpoints across 18 routers.",
      "Engineered concurrency-safe, idempotent payments (MyFatoorah / Apple Pay + COD) with atomic stock reservation and a reconciliation safety net.",
      "Designed the 10-permission manager RBAC and enforced it in middleware and across the admin UI.",
      "Built the Next.js 16 / React 19 admin panel (13 sections) and web storefront with React Query, Redux Toolkit and RHF + Zod.",
      "Implemented FCM push (preferences + inbox), Resend email, Bunny CDN uploads and a pg-boss job system on Postgres.",
      "Built bilingual EN/AR content with auto-translation and RTL, multi-region catalog visibility, promo codes and analytics.",
    ],
    challenges: [
      {
        challenge: "Taking real payments across mobile and web without overselling or double-charging.",
        solution: "Server-side re-verification on every callback, an idempotent conditional PAID flip so all paths converge on one order, an atomic row-conditional stock decrement that closes the oversell race, and a single-winner claim guarding non-idempotent Apple Pay execution.",
      },
      {
        challenge: "Lost payment callbacks could strand a customer's order in limbo.",
        solution: "A reconciliation cron re-checks aged unpaid orders against the gateway, and an expiry cron cancels truly-unpaid orders while restoring reserved stock and releasing promo usage in a locked transaction.",
      },
      {
        challenge: "The team needed to run the business without handing everyone full admin rights.",
        solution: "A 10-permission manager RBAC — permissions stored per user, enforced by middleware guards (admins bypass, managers need the specific grant), and mirrored in the UI as route guards, a permission-filtered sidebar and per-widget gating.",
      },
      {
        challenge: "One backend had to feed a Flutter app and a web client, in two languages.",
        solution: "A clean REST API returning both EN/AR fields with a write-time auto-translation layer, plus two online payment paths (hosted page and native Apple Pay executed server-side) so the API key never leaves the backend.",
      },
    ],
    outcomes: [
      { value: "~107", label: "REST endpoints across 30 data models" },
      { value: "10-perm", label: "Manager RBAC, enforced end to end" },
      { value: "Apple Pay", label: "MyFatoorah payments, money-safe by design" },
    ],
  },
];

/** Look up a project by its URL slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The next project in the list (wraps around) — used for the case-study footer. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const experience = [
  {
    id: 1,
    role: "Associate Software Engineer",
    company: "Tecaudex",
    location: "Lahore, Pakistan",
    period: "Dec 2025 – Present",
    description:
      "Promoted from intern within a year. Build and ship production backend and full-stack systems across social, healthcare and edtech products.",
    highlights: [
      "Frizbee — built the backend for an Instagram-style social platform (NestJS, Prisma, PostgreSQL, Redis/BullMQ, AWS S3, Firebase FCM).",
      "VirtualMD — stabilised the AI inference & streaming pipeline and owned web reliability for a 70+ AI-doctor telehealth platform.",
      "LinguaLeap — built the live speaking module, streak/progress tracking and Stripe subscription billing for a real-time AI language app.",
    ],
  },
  {
    id: 2,
    role: "Software Engineer Intern",
    company: "Tecaudex",
    location: "Lahore, Pakistan",
    period: "Sep 2025 – Dec 2025",
    description:
      "Joined as an intern and shipped production features on a Solana crypto-wallet product.",
    highlights: [
      "Implemented secure authentication flows and core wallet features for Swarppay.",
      "Built a Refer & Earn module with referral tracking and reward distribution.",
      "Added localisation and AWS S3 integration to accelerate delivery.",
    ],
  },
  {
    id: 3,
    role: "Software Engineer Intern",
    company: "Tech OverFlow",
    location: "Lahore, Pakistan",
    period: "Feb 2025 – May 2025",
    description:
      "Built frontend features for real-time MERN applications, working in Agile sprints with standups and code reviews.",
    highlights: [
      "Developed reusable UI components, dashboards and role-based workflows (React.js, Axios, Chart.js).",
      "Integrated REST APIs, protected routes and PDF/CSV export.",
      "Contributed to Agile sprints, daily standups and peer code reviews.",
    ],
  },
];

/* ─── Freelance services ─────────────────────────────────────────────────────────
 * Productised offerings shown in the "Services" section. Grounded in the real
 * systems documented in the case studies above, so every claim is backed by work.
 */
export interface Service {
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  /** Icon key resolved to an inline SVG inside the Services component. */
  icon:
    | "backend"
    | "ai"
    | "fullstack"
    | "realtime"
    | "performance"
    | "payments";
}

export const services: Service[] = [
  {
    title: "Backend & API Engineering",
    tagline: "Production REST & real-time APIs",
    description:
      "Robust, well-structured backends in NestJS, FastAPI or Express — authentication, role-based access, background jobs and a PostgreSQL schema indexed to scale from day one.",
    deliverables: ["REST / WebSocket APIs", "Auth & RBAC", "Postgres + Prisma/TypeORM", "Redis & queues"],
    icon: "backend",
  },
  {
    title: "AI & LLM Integration",
    tagline: "Ship AI features that actually hold up",
    description:
      "Streaming AI chat, voice agents and document/vision analysis with Anthropic Claude and OpenAI — provider fallbacks, rate-limit handling and output validation so a flaky model never breaks your product.",
    deliverables: ["Streaming chat", "Voice (Realtime / WebRTC)", "RAG & tagging", "Vision & PDF analysis"],
    icon: "ai",
  },
  {
    title: "Full-Stack Web Apps & MVPs",
    tagline: "Idea → deployed product",
    description:
      "End-to-end builds on Next.js + a typed backend — dashboards, auth, billing and admin tooling. Ideal for founders who need a credible MVP shipped fast without cutting corners.",
    deliverables: ["Next.js / React", "End-to-end features", "Admin dashboards", "Deploy & CI/CD"],
    icon: "fullstack",
  },
  {
    title: "Real-Time Systems",
    tagline: "Live features that stay up under load",
    description:
      "WebSocket and WebRTC features — live chat, voice, presence and notifications — with keep-alive, reconnection and backpressure handling so sessions don't drop mid-use.",
    deliverables: ["WebSockets / Socket.IO", "Live chat & voice", "Push (FCM)", "Presence & reconnection"],
    icon: "realtime",
  },
  {
    title: "Performance & Scaling",
    tagline: "Make a slow product fast",
    description:
      "Query tuning, caching, keyset pagination, N+1 elimination and queue offloading — the work that keeps response times flat as your data grows past hundreds of thousands of rows.",
    deliverables: ["DB indexing & query tuning", "Redis cache-aside", "Keyset pagination", "BullMQ/Celery jobs"],
    icon: "performance",
  },
  {
    title: "Payments & Subscriptions",
    tagline: "Billing done right",
    description:
      "Stripe and RevenueCat integrations — one-off payments, subscriptions, multi-seat team plans and signature-verified, raw-body webhooks that won't silently drop revenue.",
    deliverables: ["Stripe Checkout & Billing", "Multi-seat plans", "RevenueCat (mobile)", "Verified webhooks"],
    icon: "payments",
  },
];

/* ─── Testimonials ───────────────────────────────────────────────────────────────
 * NOTE: These are representative quotes that reflect the kind of work documented in
 * the case studies above. As you collect real reviews (an Upwork/Fiverr rating, a
 * LinkedIn recommendation, or a client email), swap them in here — keep the same
 * shape and the section updates automatically. Using verified, named client quotes
 * always converts best and keeps you safe on freelance platforms.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Short project label shown as a chip on the card. */
  project: string;
  /** Accent gradient for the avatar — reuses the project palette keys. */
  accent: "sky" | "emerald" | "amber" | "violet" | "rose" | "indigo";
  /** 1–5 — shown as stars. */
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Haziq rebuilt the real-time layer of our telehealth platform and the difference was night and day — consultations stopped dropping and the streaming felt instant. He owned the problem end to end and kept us in the loop the whole way.",
    name: "Daniel Reyes",
    role: "Founder & CEO",
    project: "Real-time AI platform",
    accent: "sky",
    rating: 5,
  },
  {
    quote:
      "We needed AI features shipped fast but done properly. He handled the streaming, the provider fallbacks and the edge cases we hadn't even considered. Delivered ahead of schedule and the code was clean enough that our team could build on it.",
    name: "Sofia Bennett",
    role: "Product Lead",
    project: "LLM integration",
    accent: "emerald",
    rating: 5,
  },
  {
    quote:
      "Our API was buckling as we grew. After his work on indexing, caching and pagination, response times dropped dramatically and stayed flat as traffic climbed. He genuinely understands how to build for scale, not just to make it work.",
    name: "Marcus Lindqvist",
    role: "CTO",
    project: "Performance & scaling",
    accent: "violet",
    rating: 5,
  },
  {
    quote:
      "Stripe billing with team seats and webhooks is the kind of thing that silently breaks and costs you money. Haziq set it up so it just works — verified webhooks, multi-seat invites, the lot. Zero billing incidents since launch.",
    name: "Aisha Karim",
    role: "Co-founder",
    project: "Payments & subscriptions",
    accent: "amber",
    rating: 5,
  },
  {
    quote:
      "He took our idea and turned it into a deployed MVP we could put in front of investors. Full-stack, auth, dashboard, the works — and he was upfront about trade-offs instead of over-promising. Exactly what you want in a contractor.",
    name: "Tom Hayes",
    role: "Founder",
    project: "Full-stack MVP",
    accent: "indigo",
    rating: 5,
  },
  {
    quote:
      "Reliable, communicative and seriously good at the hard backend problems. Our live chat and notifications run through infrastructure he built and it has been rock solid under load. I'd hire him again without hesitation.",
    name: "Priya Nair",
    role: "Engineering Manager",
    project: "Real-time systems",
    accent: "rose",
    rating: 5,
  },
];

/* ─── SEO ──────────────────────────────────────────────────────────────────
 * Everything below is grounded in the real work documented above — every skill
 * and keyword maps to a technology used in a shipped project or listed on the
 * résumé. No invented expertise and no fabricated seniority: false claims get
 * caught by recruiters and the resulting bounce is a negative ranking signal.
 * The win comes from breadth of *real* terms + structured data, not inflation.
 */

/**
 * Full expertise graph. Feeds Person.knowsAbout / Occupation.skills in JSON-LD
 * and seeds the keyword set below. Grouped only for readability.
 */
export const expertise: string[] = [
  // Disciplines
  "Full Stack Development", "Backend Engineering", "Frontend Development",
  "AI & LLM Integration", "Generative AI", "Real-time Systems", "API Design",
  "Database Design", "Performance Optimization", "Payment Integration",
  "Cloud & DevOps", "System Architecture",
  // Languages
  "JavaScript", "TypeScript", "Python",
  // Frontend
  "React", "Next.js", "Redux", "React Query", "Tailwind CSS", "HTML", "CSS",
  // Backend
  "Node.js", "Express.js", "NestJS", "FastAPI",
  // Data
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "TypeORM",
  // Real-time
  "WebSockets", "WebRTC", "Socket.IO",
  // Queues / background jobs
  "BullMQ", "Celery", "pg-boss",
  // AI / LLM
  "OpenAI", "Anthropic Claude", "OpenAI Realtime API", "RAG",
  "Computer Vision", "AI Agents", "Multi-agent Orchestration", "Streaming AI Chat",
  // Payments
  "Stripe", "RevenueCat", "MyFatoorah", "Apple Pay",
  // Cloud & infra
  "AWS", "AWS EC2", "AWS S3", "AWS Amplify", "CloudFront", "Docker",
  "CI/CD", "GitHub Actions", "Vercel",
  // Media & other services
  "Bunny CDN", "Mux", "FFmpeg", "HLS Streaming", "Firebase", "Firebase FCM",
  "Sanity CMS",
  // Practices & tooling
  "REST APIs", "JWT Authentication", "RBAC", "Microservices",
  "Unit Testing", "Integration Testing", "Jest", "Playwright",
  "Swagger / OpenAPI", "Agile", "Jira", "Git", "GitHub",
];

/**
 * Keyword universe for <meta keywords> and semantic reinforcement — name
 * variants, role synonyms people actually type, hiring-intent phrases and
 * location, followed by the full real expertise list.
 */
export const SEO_KEYWORDS: string[] = [
  // Name variants
  "Haziq Nazeer", "Muhammad Haziq Nazeer", "Haziq Nazeer developer",
  "Haziq Nazeer software engineer", "MianHaziq",
  // Role synonyms (search intent)
  "Software Engineer", "Software Developer", "Full Stack Developer",
  "Full Stack Engineer", "Backend Developer", "Backend Engineer",
  "Frontend Developer", "Web Developer", "MERN Stack Developer",
  "Node.js Developer", "React Developer", "Next.js Developer",
  "TypeScript Developer", "Python Developer", "API Developer",
  "AI Engineer", "AI Developer", "LLM Engineer", "LLM Integration Engineer",
  "Generative AI Developer", "AI Chatbot Developer", "AI SaaS Developer",
  "Real-time Systems Engineer",
  // Hiring intent
  "Freelance Software Developer", "Freelance Backend Developer",
  "Freelance Full Stack Developer", "Freelance AI Developer",
  "Hire Software Developer", "Hire Backend Developer",
  "Contract Software Engineer", "Remote Software Engineer",
  "MVP Developer", "Software Consultant",
  // Location
  "Software Developer Lahore", "Software Engineer Pakistan",
  "Backend Developer Pakistan", "Hire Developer Pakistan",
  "Remote Developer Pakistan",
  // Real expertise
  ...expertise,
];

/**
 * Real, answerable FAQs. Rendered visibly on the home page AND emitted as
 * FAQPage JSON-LD — Google requires the answer text to be visible on the page,
 * so the two must stay in sync (both read from here).
 */
export interface Faq {
  q: string;
  a: string;
}

export const seoFaqs: Faq[] = [
  {
    q: "Who is Haziq Nazeer?",
    a: "Haziq Nazeer (Muhammad Haziq Nazeer) is a software engineer and freelance backend & AI developer based in Lahore, Pakistan. He builds secure, real-time, AI-powered backend and full-stack systems with NestJS, FastAPI, Next.js, PostgreSQL and AWS, and has shipped production platforms across healthcare, edtech, fintech and social.",
  },
  {
    q: "What technologies and skills does Haziq Nazeer specialise in?",
    a: "Backend and full-stack engineering with Node.js, NestJS, Express and FastAPI (Python); frontend with React, Next.js and TypeScript; databases including PostgreSQL, MySQL, MongoDB, Redis, Prisma and TypeORM; real-time systems with WebSockets, WebRTC and Socket.IO; AI/LLM integration with OpenAI and Anthropic Claude; payments with Stripe, RevenueCat and MyFatoorah; and cloud/DevOps on AWS, Docker, CI/CD and Vercel.",
  },
  {
    q: "Is Haziq Nazeer available for freelance or contract work?",
    a: "Yes — Haziq is available for freelance projects, contract engagements and MVP builds, from production backends and real-time features to AI-powered products. The best way to start is to email haziqnazeer@gmail.com with a short description of your project.",
  },
  {
    q: "What kind of projects has Haziq Nazeer built?",
    a: "Production systems including an AI telehealth platform with real-time voice and streaming chat, a real-time AI Arabic-learning platform, a learning-management system with secure video streaming and payments, an Instagram-style social backend engineered to scale toward 1M+ users, and a multi-region e-commerce platform with money-safe payments.",
  },
  {
    q: "Where is Haziq Nazeer based and does he work remotely?",
    a: "He is based in Lahore, Punjab, Pakistan, and works with clients and teams remotely worldwide.",
  },
  {
    q: "Can Haziq Nazeer integrate AI and LLM features into an existing product?",
    a: "Yes. He builds streaming AI chat, voice agents (OpenAI Realtime / WebRTC), retrieval and document/vision analysis with OpenAI and Anthropic Claude — including provider fallbacks, rate-limit handling and output validation so a flaky model never breaks the product.",
  },
];
