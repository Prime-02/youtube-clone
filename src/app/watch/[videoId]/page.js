"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import VideoPlayer from "@/app/components/ui/videos/VideoPlayer";
import VideoDetails from "@/app/components/ui/videos/VideoDetails";
import CommentList from "@/app/components/ui/videos/CommentList";
import RelatedVideos from "@/app/components/ui/videos/RelatedVideos";
import axiosInstance from "@/app/lib/axiosInstance";

export default function WatchPage({ params }) {
  const { videoId } = use(params);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/api/videos/${videoId}`)
      .then(setVideo)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [videoId]);

  if (loading)
    return (
      <p className="p-4 text-sm" style={{ color: "var(--text-muted)" }}>
        Loading...
      </p>
    );
  if (!video)
    return (
      <p className="p-4 text-sm" style={{ color: "var(--text-muted)" }}>
        Video not found.
      </p>
    );

  return (
    <div
      className="flex gap-6 px-4"
      style={{
        color: "var(--text-primary)",
        height: "calc(100vh - 3.5rem)", // full height minus topbar
      }}
    >
      {/* Left — player + details + comments, independently scrollable */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto py-4 scrollbar-hide">
        <VideoPlayer videoId={videoId} />
        <VideoDetails video={video} />
        <CommentList videoId={videoId} />
      </div>

      {/* Right — related videos, independently scrollable */}
      <div className="hidden lg:flex flex-col w-96 shrink-0 overflow-y-auto py-4 scrollbar-hide">
        <RelatedVideos categoryId={video?.snippet?.categoryId} />
      </div>
    </div>
  );
}
