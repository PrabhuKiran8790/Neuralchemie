import { onNavigate } from '$app/navigation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const preparePageTransition = () => {
	onNavigate((navigation) => {
		if (!(document as any).startViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
};
