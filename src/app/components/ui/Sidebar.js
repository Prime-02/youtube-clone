"use client";

import Link from "next/link";
import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
} from "lucide-react";

const mainLinks = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Explore", href: "/" },
  { icon: PlaySquare, label: "Subscriptions", href: "/" },
];

const libraryLinks = [
  { icon: Clock, label: "History", href: "/" },
  { icon: PlaySquare, label: "Your videos", href: "/" },
  { icon: ThumbsUp, label: "Liked videos", href: "/" },
];

const exploreLinks = [
  { icon: Flame, label: "Trending", href: "/" },
  { icon: ShoppingBag, label: "Shopping", href: "/" },
  { icon: Music2, label: "Music", href: "/" },
  { icon: Film, label: "Films", href: "/" },
  { icon: Radio, label: "Live", href: "/" },
  { icon: Gamepad2, label: "Gaming", href: "/" },
  { icon: Newspaper, label: "News", href: "/" },
  { icon: Trophy, label: "Sport", href: "/" },
  { icon: Lightbulb, label: "Learning", href: "/" },
  { icon: Shirt, label: "Fashion & Beauty", href: "/" },
];

function SidebarSection({ title, links, collapsed }) {
  return (
    <div className="py-2" style={{ borderBottom: "1px solid var(--border)" }}>
      {!collapsed && title && (
        <p
          className="px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {title}
        </p>
      )}
      {links.map(({ icon: Icon, label, href }) => (
        <Link
          key={label}
          href={href}
          className={`flex items-center gap-4 px-3 py-2 rounded-xl transition-colors ${collapsed ? "justify-center" : ""}`}
          style={{ color: "var(--text-primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          title={collapsed ? label : undefined}
        >
          <Icon
            size={20}
            style={{ color: "var(--text-primary)" }}
            className="shrink-0"
          />
          {!collapsed && <span className="text-sm font-medium">{label}</span>}
        </Link>
      ))}
    </div>
  );
}

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] overflow-y-auto transition-all duration-200 z-40 scrollbar-hide ${
        collapsed ? "w-16" : "w-60"
      }`}
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="py-2">
        <SidebarSection links={mainLinks} collapsed={collapsed} />
        <SidebarSection
          title={collapsed ? "" : "You"}
          links={libraryLinks}
          collapsed={collapsed}
        />
        <SidebarSection
          title={collapsed ? "" : "Explore"}
          links={collapsed ? exploreLinks.slice(0, 5) : exploreLinks}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}
