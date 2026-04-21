"use client";

import { useEffect, useRef } from "react";

interface GoogleAdProps {
	slot?: string;
	format?: "auto" | "fluid" | "vertical";
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
	const adRef = useRef<HTMLModElement>(null);
	const isAdPushed = useRef(false);

	useEffect(() => {
		if (typeof window === "undefined" || isAdPushed.current) return;
		if (!adRef.current) return;

		try {
			const adsbygoogle = (window as Record<string, unknown>).adsbygoogle as
				| Array<Record<string, unknown>>
				| undefined;
			const adsArray = adsbygoogle || [];
			(window as Record<string, unknown>).adsbygoogle = adsArray;
			adsArray.push({});
			isAdPushed.current = true;
		} catch (_err) {
			isAdPushed.current = true;
		}
	}, []);

	if (!adClient) {
		return (
			<div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-muted bg-muted/50 p-4 text-center text-muted-foreground min-h-[100px]">
				<div className="space-y-1">
					<p className="text-xs font-semibold">Anúncio</p>
					<p className="text-[10px] opacity-70">Aguardando ID</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`overflow-hidden rounded-xl bg-muted/30 ${className}`}
			style={{ minWidth: format === "vertical" ? "160px" : "auto" }}
		>
			<ins
				ref={adRef}
				className="adsbygoogle"
				style={{
					display: "block",
					minHeight: format === "vertical" ? "600px" : "auto",
				}}
				data-ad-client={adClient}
				data-ad-slot={slot}
				data-ad-format={format === "vertical" ? "vertical" : format}
				data-full-width-responsive={responsive}
			/>
		</div>
	);
}
