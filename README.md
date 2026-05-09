# 🎬 WeTube

> A YouTube-inspired video streaming web application built as part of my frontend engineering internship at **MaxFront Technologies Limited**.

---

## 📌 Overview

WeTube is a fully functional YouTube clone that consumes the **YouTube Data API v3** to deliver a real-time video browsing and playback experience. The project was designed and developed by **Utojiuba Chidera** during an internship at MaxFront Technologies Limited, with the goal of demonstrating proficiency in modern frontend engineering — from API integration and component architecture to UI/UX design and performance optimization.

The application replicates core YouTube experiences including a persistent dark-mode UI, category-based video filtering, keyword search, hover-to-preview, independent scroll panes on the watch page, and a collapsible sidebar — all built from scratch without any UI component library.

---

## ✨ Features

### 🏠 Home Feed
- Displays trending videos fetched from the YouTube Data API filtered by region (`NG` by default)
- **Infinite scroll** — new videos load automatically as the user scrolls to the bottom, powered by the `IntersectionObserver` API
- **Category filtering** via a sticky pill bar (Music, Gaming, Sports, News, etc.) — selecting a category refetches the feed instantly

### 🔍 Search
- A fully functional search bar in the topbar accepts keyword queries
- On submission, the URL updates to `/?search=<query>` and the feed re-renders with results from YouTube's Search endpoint
- Category pills are hidden during search and replaced with a contextual results label
- Seamlessly returns to the normal trending feed when the search is cleared

### ▶️ Watch Page
- Clicking any video navigates to `/watch/[videoId]` and loads an embedded YouTube player with autoplay
- Displays video title, channel name, like count, view count, and a collapsible description
- **Independent scroll panes** — the left column (player + details + comments) and the right column (related videos) scroll independently without affecting each other
- Comments are loaded from the YouTube Comments API, showing author, timestamp, and like count

### 🖱️ Hover-to-Preview
- Hovering over any video card for **1 second** triggers a muted, looping inline preview of the video via an embedded iframe
- The preview disappears immediately on mouse leave with no layout shift

### 🗂️ Sidebar
- Collapsible sidebar with navigation links (Home, Explore, Subscriptions, History, Trending, Gaming, News, and more)
- Collapses to icon-only mode when toggled via the hamburger menu in the topbar
- The main content area shifts responsively as the sidebar expands or collapses

### 🔝 Topbar
- Sticky header with the WeTube branded logo, a search bar with voice search icon and clear button, video upload icon, notifications bell with a live badge, and a profile button
- Search input highlights on focus with a blue border

### 🌑 Permanent Dark Mode
- The entire app uses a consistent dark theme modelled after YouTube's own dark palette
- Colors are defined as CSS custom properties (`--bg-primary`, `--bg-surface`, `--text-primary`, etc.) in `globals.css`, making the theme trivially easy to update globally
- `color-scheme: dark` is set on the root `html` element so native browser UI (scrollbars, inputs) match

### 📱 Responsive Design
- The video grid adapts from 1 column on mobile up to 4 columns on large screens
- The related videos panel is hidden on smaller screens and shown as a fixed-width side column on `lg` and above
- The sidebar collapses automatically to icon-only on smaller viewports

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | JavaScript (ES2024) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + CSS custom properties |
| Icons | [Lucide React](https://lucide.dev/) |
| HTTP Client | [Axios](https://axios-http.com/) via a shared `axiosInstance` |
| Image Optimization | Next.js `<Image />` component |
| Video Playback | YouTube `<iframe>` Embed API |
| Data Source | [YouTube Data API v3](https://developers.google.com/youtube/v3) |
| Font | Geist Sans & Geist Mono (via `next/font/google`) |
| Routing | Next.js App Router (file-based, dynamic segments) |

---

## 📁 Project Structure

```
└── 📁src
    └── 📁app
        └── 📁api
            └── 📁comments
                ├── route.js
            └── 📁search
                ├── route.js
            └── 📁videos
                └── 📁[videoId]
                    ├── route.js
                ├── route.js
        └── 📁components
            └── 📁ui
                └── 📁videos
                    ├── CategoryPills.js
                    ├── CommentList.js
                    ├── RelatedVideos.js
                    ├── VideoCard.js
                    ├── VideoDetails.js
                    ├── VideoFeed.js
                    ├── VideoPlayer.js
                ├── Sidebar.js
                ├── Topbar.js
        └── 📁lib
            ├── axiosInstance.js
        └── 📁watch
            └── 📁[videoId]
                ├── page.js
        ├── favicon.ico
        ├── globals.css
        ├── layout.js
        └── page.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** v18 or higher
- A **YouTube Data API v3** key (free) — follow the steps below to get one

#### Getting a YouTube Data API v3 Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and sign in with a Google account
2. Click **Select a project** at the top, then **New Project** — give it any name and click **Create**
3. In the left sidebar go to **APIs & Services → Library**
4. Search for **YouTube Data API v3**, click on it, then click **Enable**
5. In the left sidebar go to **APIs & Services → Credentials**
6. Click **Create Credentials → API key** — your key will be generated and displayed immediately
7. *(Recommended)* Click **Edit API key**, scroll to **API restrictions**, select **Restrict key**, choose **YouTube Data API v3**, and save — this limits the key to only this API in case it is ever exposed

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wetube.git
cd wetube
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root of the project:

```env
API_KEY=your_youtube_data_api_v3_key_here
```

> ⚠️ Never commit your `.env.local` file. It is already excluded via `.gitignore`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🔑 API Endpoints (Internal)

These are Next.js Route Handlers that act as a proxy between the client and the YouTube Data API, keeping the API key server-side only.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/videos` | Fetch trending videos by category and page token |
| `GET` | `/api/videos/[videoId]` | Fetch a single video's full details |
| `GET` | `/api/search` | Search videos by keyword |
| `GET` | `/api/comments` | Fetch top-level comments for a video |

---

## 👨‍💻 Author

**Utojiuba Chidera**
Frontend Engineering Intern — MaxFront Technologies Limited

---

## 📄 License

This project was built for internship and educational purposes.