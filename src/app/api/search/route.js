// Place this at: src/app/api/search/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const pageToken = searchParams.get("pageToken") || "";
  const maxResults = searchParams.get("maxResults") || 20;

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("q", q);
  url.searchParams.set("maxResults", maxResults);
  url.searchParams.set("key", process.env.API_KEY);
  if (pageToken) url.searchParams.set("pageToken", pageToken);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.error.message }, { status: res.status });
  }

  // YouTube search returns id as { kind, videoId } — normalize it and inject
  // placeholder statistics so VideoCard doesn't break
  const items = (data.items || []).map((item) => ({
    ...item,
    id: item.id.videoId, // flatten so VideoCard's video.id works
    statistics: { viewCount: 0, likeCount: 0 }, // search API doesn't return stats
  }));

  return Response.json({ ...data, items });
}
