import { json, type RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';
import { db } from '$lib/db.server';

export const GET: RequestHandler = async ({ url }) => {
	const posts = await getPosts();

	if (url.searchParams.get('latest') === 'true') {
		return json(posts[0]);
	}

	return json(posts);
};

export const POST = async ({ request, locals }) => {
	const body = await request.json();
	const session = await locals.getSession();
	const email = session?.user?.email;

	if (!email) {
		return json({ status: 401, error: 'Unauthorized' });
	}

	const { slug, liked } = body;

	console.log(body, session);

	try {
		if (liked) {
			await db.blog.upsert({
				where: { slug: slug },
				update: {
					likes: { increment: 1 },
					likedBy: {
						connect: { email: email }
					}
				},
				create: {
					slug: slug,
					likes: 1,
					likedBy: {
						connect: { email: email }
					}
				}
			});
		} else {
			await db.blog.update({
				where: { slug: slug },
				data: {
					likes: { decrement: 1 },
					likedBy: {
						disconnect: { email: email }
					}
				}
			});
		}

		return json({ status: 200 });
	} catch (error) {
		console.log(error);
		return json({ status: 500, error: error, message: 'Something went wrong' });
	}
};
