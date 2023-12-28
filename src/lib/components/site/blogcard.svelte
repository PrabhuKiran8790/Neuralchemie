<script lang="ts">
	import { tagToSlug } from '$lib/posts';
	import type { Post } from '$lib/types';
	import { cn, formatDate } from '$lib/utils';
	import { Calendar } from 'lucide-svelte';
	import { AuthorWrapper, Tag } from '.';

	export let post: Post;
	let className: string = 'md:max-w-md';
	export { className as class };
	export let keepImage: boolean = true;
	export let tagClass: string = '';
	export let shallow: boolean = false;
	let hover: boolean = false;
</script>

<a
	class={cn('no-highlight block rounded-xl border-2 pb-0 hover:border-primary', className)}
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	href={`/blog/${post.slug}`}
	data-sveltekit-preload-data
>
	{#if keepImage}
		{#if post.image}
			<div class="p-2">
				{#if typeof post.image === 'string'}
					<img src={post.image} alt={post.title} class="w-fit rounded-md" loading="lazy" />
				{:else if Array.isArray(post.image)}
					<img
						src={post.image[0]}
						alt={post.title}
						class="h-52 w-full rounded-md dark:hidden"
						loading="lazy"
					/>
					<img
						src={post.image[1]}
						alt={post.title}
						class="hidden h-52 w-full rounded-md dark:block"
						loading="lazy"
					/>
				{/if}
			</div>
		{/if}
	{/if}
	<div class="flex h-full flex-col justify-between gap-4 p-2.5 pt-0">
		<div class={cn('flex flex-col justify-between gap-2', keepImage ? '' : 'pt-2')}>
			<!-- <div class="flex items-center gap-2 text-xs">
				<Calendar class="size-3" />
				<h1>{formatDate(post.date)}</h1>
			</div> -->
			<h1 class={`text-lg font-semibold ${hover ? 'underline underline-offset-4' : ''}`}>
				{post.title}
			</h1>
			<div class="flex flex-wrap gap-2">
				{#each post.tags as tag}
					<Tag {tag} href={`/tags/${tagToSlug(tag)}`} class={tagClass} {shallow} />
				{/each}
			</div>
		</div>
		<div>
			<p class="text-muted-foreground">{post.description}</p>
		</div>
		<div>
			<AuthorWrapper {post} />
		</div>
	</div>
</a>
