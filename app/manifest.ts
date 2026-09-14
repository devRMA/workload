import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WorkLoad - Calculadora de Horas",
    short_name: "WorkLoad",
    description: "Calcule sua jornada de trabalho de forma simples e intuitiva.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f1116",
    theme_color: "#2a62d1",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
