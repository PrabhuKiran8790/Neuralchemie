// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			likes: {
				slug: string;
				likes: number;
			}[];
		}

		interface PageState {
			tagsData: {
				likes: {
					likes: number;
					slug: string;
				}[];
				session?: Session | null | undefined;
				likedPosts?: string[] | undefined;
				currentTag: string;
				tags: string[];
				postsByTag: Record<
					string,
					{
						posts: Post[];
						count: number;
						slug: string;
					}
				>;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
