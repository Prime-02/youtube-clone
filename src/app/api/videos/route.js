export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const regionCode = searchParams.get("regionCode") || "NG";
  const maxResults = searchParams.get("maxResults") || 20;
  const categoryId = searchParams.get("categoryId") || "";
  const pageToken = searchParams.get("pageToken") || "";

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,statistics");
  url.searchParams.set("chart", "mostPopular");
  url.searchParams.set("regionCode", regionCode);
  url.searchParams.set("maxResults", maxResults);
  url.searchParams.set("key", process.env.API_KEY);
  if (categoryId) url.searchParams.set("videoCategoryId", categoryId);
  if (pageToken) url.searchParams.set("pageToken", pageToken);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.error.message }, { status: res.status });
  }

  return Response.json(data);
}
