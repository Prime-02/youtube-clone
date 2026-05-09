"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VideoCard from "./VideoCard";
import CategoryPills from "./CategoryPills";
import axiosInstance from "@/app/lib/axiosInstance";

export default function VideoFeed() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-16">
          <div
            className="w-8 h-8 border-4 rounded-full animate-spin"
            style={{
              borderColor: "var(--bg-surface)",
              borderTopColor: "var(--accent)",
            }}
          />
        </div>
      }
    >
      <VideoFeedInner />
    </Suspense>
  );
}

function VideoFeedInner() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchVideos = useCallback(
    async ({
      pageToken = "",
      categoryId = selectedCategory,
      query = searchQuery,
      replace = false,
    }) => {
      setLoading(true);
      try {
        const endpoint = query ? "/api/search" : "/api/videos";
        const params = query
          ? { q: query, pageToken }
          : { categoryId, pageToken };

        const data = await axiosInstance.get(endpoint, { params });
        setVideos((prev) => (replace ? data.items : [...prev, ...data.items]));
        setNextPageToken(data.nextPageToken || null);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory, searchQuery],
  );

  // Re-fetch whenever the search query changes
  useEffect(() => {
    setSelectedCategory("");
    fetchVideos({ query: searchQuery, replace: true });
  }, [searchQuery]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchVideos({ categoryId, query: "", replace: true });
  };

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !loading) {
          fetchVideos({ pageToken: nextPageToken });
        }
      },
      { threshold: 0.1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextPageToken, loading, fetchVideos]);

  return (
    <div>
      {/* Hide category pills when searching */}
      {!searchQuery && (
        <CategoryPills
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
      )}

      {/* Search heading */}
      {searchQuery && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Results for{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              "{searchQuery}"
            </span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video.id?.videoId || video.id} video={video} />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center py-8">
        {loading && (
          <div
            className="w-8 h-8 border-4 rounded-full animate-spin"
            style={{
              borderColor: "var(--bg-surface)",
              borderTopColor: "var(--accent)",
            }}
          />
        )}
      </div>
    </div>
  );
}
