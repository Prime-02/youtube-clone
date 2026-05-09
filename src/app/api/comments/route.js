export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  const url = new URL("https://www.googleapis.com/youtube/v3/commentThreads");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("videoId", videoId);
  url.searchParams.set("maxResults", "20");
  url.searchParams.set("order", "relevance");
  url.searchParams.set("key", process.env.API_KEY);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.error.message }, { status: res.status });
  }

  return Response.json(data);
}
