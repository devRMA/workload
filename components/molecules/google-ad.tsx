"use client";

import { useEffect } from "react";

interface GoogleAdProps {
	slot?: string;
	format?: "auto" | "fluid";
	responsive?: "true" | "false";
	className?: string;
}

export function GoogleAd({
	slot,
	format = "auto",
	responsive = "true",
	className = "",
}: GoogleAdProps) {
	const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				// @ts-ignore
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			} catch (err) {
				console.error("AdSense error:", err);
			}
		}
	}, []);

	if (!adClient) {
		return (
			<div className="flex aspect-video w-full items-center justify-center rounded-xl border-2 border-dashed border-muted bg-muted/50 p-6 text-center text-muted-foreground">
				<div className="space-y-2">
					<p className="font-semibold">Espaço para Anúncio</p>
					<p className="text-sm">Configure NEXT_PUBLIC_ADSENSE_ID para ativar</p>
				</div>
			</div>
		);
	}

	return (
		<div className={`overflow-hidden rounded-xl bg-muted/30 ${className}`}>
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client={adClient}
				data-ad-slot={slot}
				data-ad-format={format}
				data-full-width-responsive={responsive}
			/>
		</div>
	);
}
