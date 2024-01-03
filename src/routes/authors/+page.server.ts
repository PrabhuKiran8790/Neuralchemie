import { config } from '$lib/config';
import { getPostsByAuthor } from '$lib/posts';
import type { Post } from '$lib/types';

export const load = async () => {
	const { authors } = config;
	const aliases = authors.map((author) => author.aliases).flat();

	const author_posts: { [key: string]: Post[] } = {};

	for (const author of aliases) {
		author_posts[author] = await getPostsByAuthor(author);
	}

	return {
		aliases,
		author_posts
	};
};
