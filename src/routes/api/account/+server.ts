import { db } from '$lib/db.server.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const slug = url.searchParams.get('slug');

	const likes = await db.blog.findUnique({
		where: { slug: slug as string },
		select: { likes: true }
	});

	return json(likes, { status: 200 });
}

export const POST = async ({ request, locals }) => {
	const body = await request.json();
	const session = await locals.getSession();

	if (!session || !session.user) {
		return json({ status: 401, error: 'Unauthorized' });
	}

	const email = session?.user?.email;

	const { slug, liked } = body;

	console.log(body);

	try {
		if (liked) {
			console.log('liked');
			await db.blog.upsert({
				where: { slug: slug },
				update: {
					likes: { increment: 1 },
					likedBy: {
						connect: { email: email as string }
					}
				},
				create: {
					slug: slug,
					likes: 1,
					likedBy: {
						connect: { email: email as string }
					}
				}
			});
			console.log('done liking');
		} else {
			console.log('disliked');
			await db.blog.update({
				where: { slug: slug },
				data: {
					likes: { decrement: 1 },
					likedBy: {
						disconnect: { email: email as string }
					}
				}
			});
			console.log('done disliking');
		}

		return json({ status: 200 });
	} catch (error) {
		return json({ status: 500, error: error, message: 'Something went wrong' });
	}
};
