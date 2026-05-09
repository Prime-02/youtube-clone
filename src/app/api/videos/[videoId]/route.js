export async function GET(request, { params }) {
  const { videoId } = await params;

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,statistics,contentDetails");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", process.env.API_KEY);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.error.message }, { status: res.status });
  }

  return Response.json(data.items?.[0] || null);
}
