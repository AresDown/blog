export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get("url");

    if (!target) {
      return new Response("Missing url parameter", { status: 400 });
    }

    // 发起反代请求
    const upstream = await fetch(target, {
      method: "GET",
      headers: {
        "User-Agent": req.headers.get("User-Agent") || "",
        "Referer": req.headers.get("Referer") || "",
      }
    });

    // 返回内容
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/octet-stream",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response("Proxy Error: " + err.message, { status: 500 });
  }
}
