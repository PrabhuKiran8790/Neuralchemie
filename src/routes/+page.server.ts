import { getPosts } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await getPosts();
	return {
		posts: res.slice(0, 10)
	};
};
