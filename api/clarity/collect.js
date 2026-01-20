export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const upstream = await fetch("https://h.clarity.ms/collect", {
      method: "POST",
      headers: {
        "Content-Type": req.headers.get("Content-Type"),
        "Content-Encoding": req.headers.get("Content-Encoding") || "",
        "User-Agent": req.headers.get("User-Agent"),
        "Accept": req.headers.get("Accept") || "*/*",
      },
      body: req.body
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response("Proxy Error: " + err.message, { status: 500 });
  }
}
