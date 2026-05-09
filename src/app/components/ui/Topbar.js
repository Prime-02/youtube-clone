"use client";

import { useState } from "react";
import { Search, Mic, Video, Bell, User, Menu, X } from "lucide-react";
import Link from "next/link";

function WeTubeLogo() {
  return (
    <Link href="/" className="flex items-center gap-1.5">
      <svg
        width="28"
        height="20"
        viewBox="0 0 28 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="28" height="20" rx="5" fill="#FF0000" />
        <polygon points="11,5 11,15 20,10" fill="white" />
      </svg>
      <span className="text-xl font-bold tracking-tight">
        <span style={{ color: "var(--text-primary)" }}>We</span>
        <span style={{ color: "var(--accent)" }}>Tube</span>
      </span>
    </Link>
  );
}

export default function Topbar({ onMenuClick }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/?search=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex backdrop-blur-3xl items-center gap-4 px-4 h-14"
      style={{
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full transition-colors"
          style={{ color: "var(--text-primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <WeTubeLogo />
      </div>

      {/* Center: Search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-1 max-w-2xl mx-auto items-center"
      >
        <div
          className="flex flex-1 items-center rounded-l-full px-4 h-10 transition-all"
          style={{
            background: "var(--bg-input)",
            border: `1px solid ${focused ? "#1c62b9" : "var(--border)"}`,
            boxShadow: focused ? "inset 0 1px 4px rgba(0,0,0,0.4)" : "none",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--text-primary)" }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full ml-1"
              style={{ color: "var(--text-secondary)" }}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="h-10 px-5 rounded-r-full flex items-center transition-colors"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderLeft: "none",
            color: "var(--text-primary)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--bg-surface)")
          }
        >
          <Search size={18} />
        </button>
        <button
          type="button"
          className="ml-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: "var(--bg-surface)",
            color: "var(--text-primary)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--bg-surface)")
          }
          aria-label="Voice search"
        >
          <Mic size={18} />
        </button>
      </form>

      {/* Right: Action icons */}
      <div className="flex items-center gap-1 shrink-0 ml-auto">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ color: "var(--text-primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          aria-label="Create"
        >
          <Video size={20} />
        </button>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center relative transition-colors"
          style={{ color: "var(--text-primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
        </button>
        <button
          className="ml-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ background: "var(--accent)" }}
          aria-label="Profile"
        >
          <User size={16} />
        </button>
      </div>
    </header>
  );
}
