import { dev } from '$app/environment';
import { localToGithubURL } from '$lib/utils';
import type { Post } from '$lib/types';

export const getPosts = async () => {
	let posts: Post[] = [];

	const mdPaths = import.meta.glob('../../posts/*/page.md', { eager: true });

	for (const path in mdPaths) {
		const file = mdPaths[path];
		const slug = path.split('/').slice(3)[0];

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } as Post;
			if (post.image && !dev) {
				// only convert if starts with /posts because you need to point the image to the actual github raw url
				if (typeof post.image === 'string' && post.image.startsWith('/posts')) {
					post.image = localToGithubURL({ src: post.image });
				} else if (Array.isArray(post.image)) {
					post.image = post.image.map((image) => {
						if (image.startsWith('/posts')) {
							return localToGithubURL({ src: image });
						}
						return image;
					});
				}
			}
			!post.draft && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
};

export const tagToSlug = (tag: string) => {
	return tag.replace(/ /g, '-').toLowerCase();
};
