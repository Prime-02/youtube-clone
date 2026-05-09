"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Eye } from "lucide-react";

function formatViews(views) {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
}

function timeAgo(publishedAt) {
  const diff = Date.now() - new Date(publishedAt).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days >= 365) return `${Math.floor(days / 365)}y ago`;
  if (days >= 30) return `${Math.floor(days / 30)}mo ago`;
  if (days >= 1) return `${days}d ago`;
  return "Today";
}

export default function VideoCard({ video }) {
  const { id, snippet, statistics } = video;
  const thumbnail =
    snippet.thumbnails?.maxres?.url ||
    snippet.thumbnails?.high?.url ||
    snippet.thumbnails?.default?.url;
  const initials = snippet.channelTitle?.charAt(0).toUpperCase();

  const [hovered, setHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    hoverTimer.current = setTimeout(() => setShowPreview(true), 1000);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setShowPreview(false);
    clearTimeout(hoverTimer.current);
  };

  return (
    <Link
      href={`/watch/${id}`}
      className="flex flex-col gap-2 cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail / Preview */}
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden"
        style={{ background: "#1a1a1a" }}
      >
        <Image
          src={thumbnail}
          alt={snippet.title}
          fill
          className={`object-cover transition-all duration-300 ${
            showPreview ? "opacity-0" : "opacity-100 group-hover:scale-105"
          }`}
        />
        {showPreview && (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${id}`}
            allow="autoplay; encrypted-media"
            className="absolute inset-0 w-full h-full pointer-events-none"
            title="preview"
          />
        )}
        {/* Live badge */}
        {snippet.liveBroadcastContent === "live" && (
          <div
            className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold text-white"
            style={{ background: "var(--accent)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
            LIVE
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex gap-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: "var(--accent)" }}
        >
          {initials}
        </div>
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <p
            className="text-sm font-semibold line-clamp-2 leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {snippet.title}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--text-secondary)" }}
          >
            {snippet.channelTitle}
          </p>
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {statistics?.viewCount > 0 && (
              <>
                <span className="flex items-center gap-1">
                  <Eye size={11} />
                  {formatViews(statistics.viewCount)}
                </span>
                <span>•</span>
              </>
            )}
            <span>{timeAgo(snippet.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
