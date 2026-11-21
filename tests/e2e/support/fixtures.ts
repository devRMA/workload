import { type BrowserContext, test as base } from "@playwright/test";

export async function installExternalNetworkRoute(context: BrowserContext, baseURL: string | undefined) {
  if (!baseURL) throw new Error("baseURL is required for the E2E network fixture");

  const origin = new URL(baseURL).origin;
  await context.route(
    (url) => (url.protocol === "http:" || url.protocol === "https:") && url.origin !== origin,
    (route) =>
      route.request().resourceType() === "script"
        ? route.fulfill({ contentType: "application/javascript", body: "" })
        : route.fulfill({ status: 204 }),
  );
}

export const test = base.extend<{ externalNetwork: undefined }>({
  externalNetwork: [
    async ({ context, baseURL }, use) => {
      await installExternalNetworkRoute(context, baseURL);
      await use(undefined);
    },
    { auto: true },
  ],
});
