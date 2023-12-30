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
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
