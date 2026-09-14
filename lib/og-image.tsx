import { ImageResponse } from "next/og";
import type { CalculatorView } from "@/lib/calculator-view";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

const CANVAS = "#0f1116";
const ACCENT = "#2a62d1";
const INK = "#f2f3f6";
const INK_MUTED = "#a6abb5";

const OG_CONTENT: Record<CalculatorView, { title: string; subtitle: string }> = {
  work: {
    title: "Jornada, horas extras e banco de horas",
    subtitle: "A que horas você pode sair, quanto já trabalhou e quanto tem de hora extra.",
  },
  salary: {
    title: "Valor da hora e salário líquido CLT",
    subtitle: "Quanto vale a sua hora, já com INSS, IRRF e dependentes.",
  },
};

export function renderOgImage(view: CalculatorView): ImageResponse {
  const { title, subtitle } = OG_CONTENT[view];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: CANVAS,
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          W
        </div>
        <span style={{ color: INK, fontSize: 40, fontWeight: 600 }}>WorkLoad</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span style={{ color: INK, fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{title}</span>
        <span style={{ color: INK_MUTED, fontSize: 32, lineHeight: 1.4 }}>{subtitle}</span>
      </div>

      <span style={{ color: ACCENT, fontSize: 28, fontWeight: 600 }}>workload.devrma.com</span>
    </div>,
    OG_IMAGE_SIZE,
  );
}
