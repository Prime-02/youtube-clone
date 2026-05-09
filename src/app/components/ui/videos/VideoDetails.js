"use client";

import { useState } from "react";
import { ThumbsUp, Eye, ChevronDown, ChevronUp } from "lucide-react";

function formatViews(views) {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views;
}

function formatLikes(likes) {
  if (likes >= 1_000_000) return `${(likes / 1_000_000).toFixed(1)}M`;
  if (likes >= 1_000) return `${(likes / 1_000).toFixed(1)}K`;
  return likes;
}

export default function VideoDetails({ video }) {
  const [expanded, setExpanded] = useState(false);
  const { snippet, statistics } = video;

  return (
    <div className="flex flex-col gap-3 py-4">
      <h1
        className="text-lg font-bold leading-snug"
        style={{ color: "var(--text-primary)" }}
      >
        {snippet.title}
      </h1>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "var(--accent)" }}
          >
            {snippet.channelTitle?.charAt(0).toUpperCase()}
          </div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {snippet.channelTitle}
          </p>
        </div>

        <div className="flex gap-2">
          <span
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full"
            style={{
              background: "var(--bg-surface)",
              color: "var(--text-primary)",
            }}
          >
            <ThumbsUp size={14} />
            {formatLikes(statistics.likeCount)}
          </span>
          <span
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full"
            style={{
              background: "var(--bg-surface)",
              color: "var(--text-primary)",
            }}
          >
            <Eye size={14} />
            {formatViews(statistics.viewCount)} views
          </span>
        </div>
      </div>

      {/* Description */}
      <div
        className="rounded-xl p-3"
        style={{ background: "var(--bg-surface)" }}
      >
        <p
          className={`text-sm whitespace-pre-line ${!expanded ? "line-clamp-3" : ""}`}
          style={{ color: "var(--text-secondary)" }}
        >
          {snippet.description || "No description available."}
        </p>
        {snippet.description?.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm font-semibold mt-2 transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            {expanded ? (
              <>
                <ChevronUp size={14} /> Show less
              </>
            ) : (
              <>
                <ChevronDown size={14} /> Show more
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
