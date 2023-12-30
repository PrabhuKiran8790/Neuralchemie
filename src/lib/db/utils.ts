import { db } from '$lib/db.server';

export const getAllLikedPostsByEmail = async ({ email }: { email: string }) => {
	db.blog.findMany({
		where: {
			likedBy: {
				some: { email: email }
			}
		}
	});
};

export const getTotalLikesBySlug = async ({ slug }: { slug: string }) => {
	return await db.blog.findUnique({
		where: { slug: slug },
		select: { likes: true }
	});
};
