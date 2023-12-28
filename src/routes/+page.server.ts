import { getPosts } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await getPosts();

	return {
		// only return the first 10 posts
		posts: res.slice(0, 10)
	};
};
