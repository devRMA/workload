import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function TwitterImage() {
  return renderOgImage("work");
}
