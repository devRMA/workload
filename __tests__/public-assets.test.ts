import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

const MAXIMUM_ICON_BYTES = 150 * 1024;
const FAVICON_SOURCE = "/favicon.ico";
const ICO_SIGNATURE = [0x00, 0x00, 0x01, 0x00];
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_SIGNATURE = [0xff, 0xd8, 0xff];

function readPublicAsset(source: string): Buffer {
  return readFileSync(join(process.cwd(), "public", source.replace(/^\//, "")));
}

function startsWith(bytes: Buffer, signature: readonly number[]): boolean {
  return signature.every((byte, index) => bytes[index] === byte);
}

function readPngDimensions(bytes: Buffer): { width: number; height: number } {
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

const manifestIcons = manifest().icons ?? [];

describe("public icon assets", () => {
  it("serves favicon.ico as an icon resource and not as a JPEG", () => {
    const bytes = readPublicAsset(FAVICON_SOURCE);

    expect(startsWith(bytes, ICO_SIGNATURE)).toBe(true);
    expect(startsWith(bytes, JPEG_SIGNATURE)).toBe(false);
  });

  it("serves every manifest icon as a PNG and not as a JPEG", () => {
    expect(manifestIcons).toHaveLength(2);
    for (const icon of manifestIcons) {
      const bytes = readPublicAsset(icon.src);

      expect(startsWith(bytes, PNG_SIGNATURE), `${icon.src} is not a PNG`).toBe(true);
      expect(startsWith(bytes, JPEG_SIGNATURE), `${icon.src} is a JPEG`).toBe(false);
    }
  });

  it("encodes every manifest icon at the size the manifest declares for it", () => {
    expect(manifestIcons).toHaveLength(2);
    for (const icon of manifestIcons) {
      const { width, height } = readPngDimensions(readPublicAsset(icon.src));

      expect(`${width}x${height}`, `${icon.src} does not match its declared sizes`).toBe(icon.sizes);
    }
  });

  it("keeps every icon the app requests at most 150 kB", () => {
    const oversized: string[] = [];
    for (const source of [FAVICON_SOURCE, ...manifestIcons.map((icon) => icon.src)]) {
      const { byteLength } = readPublicAsset(source);
      if (byteLength > MAXIMUM_ICON_BYTES) oversized.push(`${source}: ${byteLength} bytes`);
    }

    expect(oversized).toEqual([]);
  });
});
