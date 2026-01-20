export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const upstream = await fetch("https://h.clarity.ms/collect", {
      method: "POST",
      headers: {
        "Content-Type": req.headers.get("Content-Type"),
        "User-Agent": req.headers.get("User-Agent"),
      },
      body: req.body
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type"),
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response("Proxy Error: " + err.message, { status: 500 });
  }
}
