/** Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // /secure 页面返回 HTML
  if (path === "/secure") {
    const email = request.headers.get("Cf-Access-Authenticated-User-Email") || "anonymous";
    const timestamp = new Date().toISOString();
    const countryList = ["MY", "SG", "US", "AU"];
    const links = countryList.map(c => `<a href="/secure/${c}">${c}</a>`).join(" ");

    return new Response(
      `<html><head><meta charset="UTF-8"></head><body><h2>${email} authenticated at ${timestamp} from ${links}</h2></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // /secure/${COUNTRY} 返回图片
  const countryMatch = path.match(/^\/secure\/([A-Z]{2})$/);
  if (countryMatch) {
    const country = countryMatch[1];
    try {
      const object = await FLAGS.get(`${country}.png`, { type: "arrayBuffer" });
      return new Response(object, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=3600"
        }
      });
    } catch {
      return new Response("Flag not found", { status: 404 });
    }
  }

  return new Response("Not found", { status: 404 });
}

