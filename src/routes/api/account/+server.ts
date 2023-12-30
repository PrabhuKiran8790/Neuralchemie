import { db } from '$lib/db.server.js';
import { json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const slug = url.searchParams.get('slug');

	console.log(await locals.getSession());
	const likes = await db.blog.findUnique({
		where: { slug: slug as string },
		select: { likes: true }
	});

	return json(likes, { status: 200 });
}
