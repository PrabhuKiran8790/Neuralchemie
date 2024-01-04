import { authorPathToAlias } from '$lib/config.js';
import { getPostsByAuthor } from '$lib/posts.js';

export const load = async ({ params }) => {
	const { author } = params;
	return {
		path: author,
		posts: await getPostsByAuthor(authorPathToAlias(author) as string)
	};
};
