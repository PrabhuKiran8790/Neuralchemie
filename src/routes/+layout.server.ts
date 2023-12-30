import { db } from '$lib/db.server';
export const load = async ({ locals }) => {
	const likes = await db.blog.findMany({
		select: {
			slug: true,
			likes: true
		}
	});

	const session = await locals.getSession();

	if (!session) {
		return {
			likes: likes
		};
	}

	const likedPosts = await db.blog.findMany({
		where: {
			likedBy: {
				some: { email: session?.user?.email }
			}
		},
		select: {
			slug: true
		}
	});

	const slugList = likedPosts.map((blog) => blog.slug);

	return {
		likes,
		session: await locals.getSession(),
		likedPosts: slugList
	};
};
