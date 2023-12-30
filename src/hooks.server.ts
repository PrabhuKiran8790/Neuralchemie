import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '$lib/db.server';
import { GITHUB_SECRET, GITHUB_ID, AUTH_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'database',
		generateSessionToken: () => {
			return crypto.randomUUID();
		}
	},
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
	trustHost: true,
	secret: AUTH_SECRET
});
