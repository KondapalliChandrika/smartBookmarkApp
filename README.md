# SmartBookmark 

A modern, production-ready bookmark manager with real-time sync, built with Next.js and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

##  Features

-  **Google OAuth Authentication** - Secure sign-in with Google
-  **Responsive Design** - Beautiful UI that works on all devices
-  **Real-time Sync** - Bookmarks sync instantly across all tabs and devices
-  **Premium UI/UX** - Glassmorphism design with smooth animations
-  **Row Level Security** - Your bookmarks are private and secure
-  **Optimistic Updates** - Instant feedback for better UX
-  **PostgreSQL Database** - Reliable data storage with Supabase
- **Framer Motion** - Smooth, professional animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - App Router with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication (Google OAuth)
  - Row Level Security

### Deployment
- **Vercel** - Optimized for Next.js

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Cloud Console account

### Installation

1. **Clone the repository**

```bash
 git clone https://github.com/KondapalliChandrika/smartBookmarkApp.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**



```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📖 Full Setup Guide

For complete setup instructions including Supabase configuration, database schema, and Google OAuth setup, see [SETUP.md](./SETUP.md).

##  Project Structure

```
SmartBookMarkApp/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (redirects)
│   ├── login/               # Login page
│   ├── dashboard/           # Dashboard (protected)
│   └── auth/callback/       # OAuth callback
├── components/              # React components
│   ├── Navbar.tsx          # Navigation bar
│   ├── BookmarkCard.tsx    # Bookmark display
│   ├── BookmarkGrid.tsx    # Grid with Realtime
│   ├── AddBookmarkModal.tsx # Add bookmark form
│   ├── EmptyState.tsx      # Empty state UI
│   └── LoadingSkeleton.tsx # Loading states
├── lib/                     # Utilities
│   ├── supabase/           # Supabase clients
│   └── queries/            # Database operations
├── styles/                  # Styling
│   ├── theme.ts            # Color system
│   └── globals.css         # Global styles
├── types/                   # TypeScript types
│   └── bookmark.ts         # Type definitions
└── middleware.ts           # Auth middleware
```

##  Design System

All colors are centralized in `styles/theme.ts`. No hardcoded colors in components.

### Color Palette

- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Background**: Dark slate (#0f172a)
- **Glass**: Translucent with backdrop blur

### Design Principles

- **Glassmorphism** - Frosted glass effect with backdrop blur
- **Smooth Animations** - Framer Motion for all interactions
- **Mobile-First** - Responsive design from the ground up
- **Accessibility** - Semantic HTML and ARIA labels

##  Security

- **Row Level Security (RLS)** - Users can only access their own bookmarks
- **Google OAuth** - Secure authentication via Supabase Auth
- **Environment Variables** - Sensitive data never committed
- **HTTPS Only** - Secure connections in production



## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy






