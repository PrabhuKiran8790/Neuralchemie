import type { ComponentType, SvelteComponent } from 'svelte';

export interface BasePost {
	title: string;
	slug: string;
	description: string;
	date: string;
	tags: string[];
	image: string | string[];
	draft: boolean;
	author: string | string[];
}

export interface Post extends BasePost {}

export type LangIconsType = {
	[key: string]: {
		name?: string;
		filename?: string;
		className?: string;
		customIcon?: ComponentType<SvelteComponent>;
	};
};
