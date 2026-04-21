"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { AdBlockModal } from "@/components/molecules/ad-block-modal";
import { GoogleAd } from "@/components/molecules/google-ad";

const AD_VIEW_KEY = "workload_last_ad_view";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function AdManager() {
	const [showModal, setShowModal] = useState(false);
	const [canShowAd, setCanShowAd] = useState(false);
	const [isAdBlockActive, setIsAdBlockActive] = useState(false);
	const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

	const checkAdBlock = useCallback(async () => {
		try {
			await fetch(
				"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
				{
					method: "HEAD",
					mode: "no-cors",
				},
			);
			setIsAdBlockActive(false);
		} catch (_error) {
			setIsAdBlockActive(true);
			setShowModal(true);
		}
	}, []);

	const checkWeeklyLimit = useCallback(() => {
		const lastView = localStorage.getItem(AD_VIEW_KEY);
		const now = Date.now();

		if (!lastView || now - Number(lastView) > ONE_WEEK_MS) {
			setCanShowAd(true);
		}
	}, []);

	useEffect(() => {
		checkAdBlock();
		checkWeeklyLimit();
	}, [checkAdBlock, checkWeeklyLimit]);

	const handleAdViewed = () => {
		localStorage.setItem(AD_VIEW_KEY, Date.now().toString());
		setCanShowAd(false);
	};

	const handleModalConfirm = () => {
		setShowModal(false);
		window.location.reload();
	};

	if (!adClient) return null;

	return (
		<>
			<Script
				async
				src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
				crossOrigin="anonymous"
				strategy="afterInteractive"
			/>

			<AdBlockModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={handleModalConfirm}
			/>

			{canShowAd && !isAdBlockActive && (
				<div className="container mx-auto my-8 px-4">
					<div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5 p-1 transition-all hover:border-primary/40">
						<div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
						<div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

						<div className="relative p-4 md:p-6">
							<div className="mb-4 flex items-center justify-between">
								<span className="rounded-full bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
									Anúncio da Semana
								</span>
								<button
									type="button"
									onClick={handleAdViewed}
									className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
								>
									Remover (já vi por hoje)
								</button>
							</div>

							<GoogleAd slot="1234567890" />

							<p className="mt-4 text-center text-xs text-muted-foreground">
								Sua visualização ajuda a manter o WorkLoad gratuito. Obrigado
								pelo apoio!
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
