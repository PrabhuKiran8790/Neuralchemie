import { json, type RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export const GET: RequestHandler = async ({ url }) => {
	const posts = await getPosts();

	if (url.searchParams.get('latest') === 'true') {
		return json(posts[0]);
	}

	return json(posts);
};
