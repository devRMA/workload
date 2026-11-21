import { once } from "node:events";
import { createServer } from "node:http";
import { expect } from "@playwright/test";
import { test } from "./support/fixtures";

test("serves off-origin responses locally while exposing attempted requests", async ({ page }) => {
  const appResponse = await page.goto("/robots.txt");
  expect(appResponse?.status()).toBe(200);
  expect(await appResponse?.text()).toContain("User-Agent:");

  const offOriginRequests: string[] = [];
  const offOrigin = createServer((request, response) => {
    offOriginRequests.push(request.url ?? "");
    if (request.url === "/script.js") {
      response.writeHead(200, { "Content-Type": "application/javascript" }).end();
    } else {
      response.writeHead(204).end();
    }
  });
  offOrigin.listen(0, "127.0.0.1");
  await once(offOrigin, "listening");

  try {
    const address = offOrigin.address();
    if (!address || typeof address === "string") throw new Error("Expected a loopback TCP address");
    const scriptUrl = `http://127.0.0.1:${address.port}/script.js`;
    const pixelUrl = `http://127.0.0.1:${address.port}/pixel`;

    const [scriptRequest, scriptResponse] = await Promise.all([
      page.waitForRequest(scriptUrl),
      page.waitForResponse(scriptUrl),
      page.addScriptTag({ url: scriptUrl }),
    ]);
    const [pixelResponse] = await Promise.all([
      page.waitForResponse(pixelUrl),
      page.setContent(`<img src="${pixelUrl}" alt="">`),
    ]);

    expect(scriptRequest.resourceType()).toBe("script");
    expect(scriptResponse.status()).toBe(200);
    expect(await scriptResponse.text()).toBe("");
    expect(pixelResponse.status()).toBe(204);
    expect(offOriginRequests).toEqual([]);
  } finally {
    await new Promise<void>((resolve, reject) => {
      offOrigin.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
