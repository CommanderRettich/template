# Claude Code Rules - Project Template

> Coding conventions, Git workflow, and AI Agent usage for this project.
> **Customize this file for your specific project!**

---

## AI Agents (Role-Based Development)

Dieses Projekt nutzt spezialisierte AI Agents für strukturierte Feature-Entwicklung.

**Agents verfügbar in `.claude/agents/`:**

### Development Workflow Agents
| Agent | Aufgabe |
|-------|---------|
| `requirements-engineer.md` | Feature-Idee → Spec mit Acceptance Criteria |
| `solution-architect.md` | Spec → Tech-Design (DB Schema, Components, APIs) |
| `frontend-dev.md` | Design → UI Components (React, Tailwind, shadcn) |
| `backend-dev.md` | Design → APIs + Database (Supabase, Next.js) |
| `qa-engineer.md` | Implementation → Testing gegen Acceptance Criteria |
| `devops.md` | Tested → Production Deployment |

### Quality & Management Agents
| Agent | Aufgabe |
|-------|---------|
| `security-reviewer.md` | Security Audit (OWASP, RLS, API Security) |
| `code-reviewer.md` | Code Review (Best Practices, Performance) |
| `project-manager.md` | Sprint Planning, Status Tracking, Coordination |
| `database-migration.md` | Supabase Migrations, RLS Policies, Schema Changes |

**Nutzung (kurz):**
```
Arbeite als Frontend Developer und baue die UI für PROJ-1.
Nutze den QA Engineer und teste das Feature.
```

**Nutzung (explizit):**
```
Lies .claude/agents/frontend-dev.md und handle danach.
```

**Wenn der User einen Agent referenziert** (z.B. "nutze Frontend Developer", "arbeite als QA Engineer"):
→ Lies die entsprechende Datei in `.claude/agents/` und befolge die Anweisungen darin.

**Vollständige Anleitung:** Siehe `HOW_TO_USE_AGENTS.md`

---

## Git Workflow

**WICHTIG: Vor PR erstellen immer fragen!**

Niemals direkt auf `main` arbeiten. Der `main` Branch wird deployed.

**Workflow:**
1. Feature-Branch erstellen (`git checkout -b feature/xyz origin/main`)
2. Änderungen machen
3. **Mit main synchronisieren** (`git fetch origin main && git rebase origin/main`)
4. Änderungen committen
5. **User fragen:** "Soll ich einen PR erstellen und mergen?"
6. Wenn ja: PR erstellen (`gh pr create`) und sofort mergen (`gh pr merge --merge`)

**Was NICHT tun:**
- ❌ Automatisch PRs erstellen ohne zu fragen
- ❌ Ungefragt deployen (PR merge = deploy)
- ❌ Direkt auf main arbeiten
- ❌ Ohne Sync mit main pushen

**Immer:**
- ✅ Auf Feature-Branch arbeiten
- ✅ **Vor dem Push mit main synchronisieren**
- ✅ **Vor PR fragen** ob PR erstellt und gemerged werden soll
- ✅ Wenn PR gewünscht: erstellen und sofort mergen

---

## Tech Stack Overview

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 15+ | App Router, Server Components |
| Language | TypeScript | Strict mode |
| UI | React 19 | Server Components by default |
| Styling | Tailwind CSS | Utility-first, mobile-first |
| Components | shadcn/ui + Radix | Accessible primitives |
| Database | Supabase | PostgreSQL with RLS |
| Auth | Supabase Auth | Email/password, OAuth |
| Validation | Zod | Runtime schema validation |

---

## Project Structure

```
project/
├── .claude/
│   └── agents/           # AI Agent definitions
├── features/             # Feature Specs (PROJ-X.md)
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React Components
│   │   └── ui/           # shadcn/ui components
│   └── lib/              # Utility functions
├── public/               # Static files
├── CLAUDE.md             # This file
├── PROJECT_CONTEXT.md    # Project status & roadmap
└── HOW_TO_USE_AGENTS.md  # Agent usage guide
```

---

## Component Patterns

### Server vs Client Components

```tsx
// Server Component (default) - no directive needed
export default async function Page() {
  const data = await fetchData();
  return <DataList data={data} />;
}

// Client Component - explicit directive required
"use client";
import { useState } from "react";

export function InteractiveComponent() {
  const [state, setState] = useState(false);
  return <button onClick={() => setState(!state)}>Toggle</button>;
}
```

### When to use which:
- **Server Components:** Data fetching, auth checks, static content
- **Client Components:** Interactivity, forms, event handlers, browser APIs

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `VideoCard.tsx` |
| Files (multi-word) | kebab-case | `video-player.tsx` |
| Functions | camelCase | `fetchVideos` |
| Constants | UPPERCASE | `MAX_UPLOAD_SIZE` |
| Types/Interfaces | PascalCase | `VideoData` |
| Database tables | snake_case | `video_categories` |

---

## Environment Variables

### Server-Side Only (Never expose!)
```bash
SUPABASE_SERVICE_ROLE_KEY=     # Admin access, bypasses RLS
STRIPE_SECRET_KEY=             # Stripe API key
RESEND_API_KEY=                # Email API key
```

### Public (Safe to expose)
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_URL=               # App URL for redirects
```

---

## Common Mistakes to Avoid

1. **Forgetting `await params`** → Next.js 15+ requires awaiting route params
2. **Using wrong Supabase client** → Server vs Browser client
3. **Exposing service role key** → Never use in client code
4. **Missing auth checks** → Always verify user in protected routes
5. **Not using RLS** → Enable Row Level Security on all tables
6. **Skipping input validation** → Always validate with Zod server-side

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server

# Quality Checks
npm run typecheck        # TypeScript check (no emit)
npm run lint             # ESLint check
npm run lint:fix         # ESLint with auto-fix
npm run format:check     # Check Prettier formatting
npm run format           # Fix Prettier formatting

# Build
npm run build            # Production build
```

---

**Customize this file as your project grows!**
