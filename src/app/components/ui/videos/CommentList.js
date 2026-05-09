"use client";

import axiosInstance from "@/app/lib/axiosInstance";
import { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";

function timeAgo(publishedAt) {
  const diff = Date.now() - new Date(publishedAt).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days >= 365) return `${Math.floor(days / 365)} year(s) ago`;
  if (days >= 30) return `${Math.floor(days / 30)} month(s) ago`;
  if (days >= 1) return `${days} day(s) ago`;
  return "Today";
}

export default function CommentList({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/comments", { params: { videoId } })
      .then((data) => setComments(data.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [videoId]);

  if (loading)
    return (
      <p className="text-sm py-4" style={{ color: "var(--text-muted)" }}>
        Loading comments...
      </p>
    );
  if (!comments.length)
    return (
      <p className="text-sm py-4" style={{ color: "var(--text-muted)" }}>
        No comments available.
      </p>
    );

  return (
    <div className="flex flex-col gap-5 py-4">
      <h2
        className="font-bold text-base"
        style={{ color: "var(--text-primary)" }}
      >
        {comments.length} Comments
      </h2>
      {comments.map((item) => {
        const comment = item.snippet.topLevelComment.snippet;
        const initials = comment.authorDisplayName?.charAt(0).toUpperCase();

        return (
          <div key={item.id} className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                background: "var(--bg-surface)",
                color: "var(--text-secondary)",
              }}
            >
              {initials}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {comment.authorDisplayName}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {timeAgo(comment.publishedAt)}
                </p>
              </div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {comment.textDisplay}
              </p>
              <p
                className="flex items-center gap-1 text-xs mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                <ThumbsUp size={12} />
                {comment.likeCount}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
