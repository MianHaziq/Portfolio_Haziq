export const siteConfig = {
  name: "Haziq Nazeer",
  fullName: "Muhammad Haziq Nazeer",
  role: "Software Engineer",
  tagline: "Building secure, real-time, AI-powered systems",
  bio: "I build secure, real-time and AI-powered backend and full-stack systems with NestJS, FastAPI, Next.js, PostgreSQL and AWS. Promoted from intern to Associate Software Engineer within a year, I care about shipping production systems that are reliable, scalable and well-engineered.",
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
