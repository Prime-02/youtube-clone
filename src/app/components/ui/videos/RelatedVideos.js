"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/lib/axiosInstance";
import VideoCard from "./VideoCard";

export default function RelatedVideos({ categoryId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/videos", { params: { categoryId } })
      .then((data) => setVideos(data.items || []))
      .catch(console.error);
  }, [categoryId]);

  return (
    <div className="flex flex-col gap-3">
      <h2
        className="font-bold text-base"
        style={{ color: "var(--text-primary)" }}
      >
        Related Videos
      </h2>
      <div className="flex flex-col gap-4">
        {videos.map((video, i) => (
          <VideoCard key={i} video={video} />
        ))}
      </div>
    </div>
  );
}
