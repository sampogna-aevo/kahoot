# Quickstart: QuizAoVivo

## Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account (free tier)

## Setup

### 1. Clone and Install

```bash
git clone <repo-url>
cd kahoot
npm install
```

### 2. Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your `Project URL` and `anon public` key from Settings → API
3. Create a `rooms` table:

```sql
CREATE TABLE rooms (
  code TEXT PRIMARY KEY,
  host_id TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'AWAITING',
  current_question INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT REFERENCES rooms(code),
  nickname TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  is_connected BOOLEAN DEFAULT true,
  UNIQUE(room_code, nickname)
);

-- Enable realtime on tables
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE players;
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing User Story 1

1. **Create Room**: Click "Criar Sala" → Receive 6-char code
2. **Share Code**: Copy the code shown
3. **Verify**: Room appears in browser console (dev mode)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 4
- **Realtime**: Supabase Realtime (Broadcast + Presence)
- **Deployment**: Vercel (free tier)

## Project Structure

```
app/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── room/[code]/      # Room routes
│   │   └── api/room/         # API routes
│   ├── components/           # UI components
│   ├── lib/                  # Utilities
│   └── hooks/                # Custom hooks
```

## Common Commands

```bash
npm run dev      # Start development server
npm run lint     # Run ESLint
npm run build    # Production build
```
