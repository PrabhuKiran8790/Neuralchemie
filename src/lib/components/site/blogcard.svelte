<script lang="ts">
	import { tagToSlug } from '$lib/posts';
	import type { Post } from '$lib/types';
	import { cn, formatDate } from '$lib/utils';
	import { Heart } from 'phosphor-svelte';
	import { AuthorWrapper, Tag } from '.';

	export let post: Post;
	let className: string = 'md:max-w-md';
	export { className as class };
	export let keepImage: boolean = true;
	export let tagClass: string = '';
	export let shallow: boolean = false;
	export let likesCount: number = 0;
	export let n: number = 0;
	let hover: boolean = false;
</script>

<a
	class={cn(
		'no-highlight block rounded-xl border-2 pb-0 hover:border-primary',
		n === 1 ? 'md:max-w-md' : 'w-full',
		className
	)}
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
			<div class="flex items-center text-xs gap-4 -mb-2">
				<h1 class="italic text-muted-foreground">
					# {post.order}
				</h1>
				{#if likesCount > 0}
					<div class="flex items-center gap-1 text-xs">
						<Heart class="size-3 text-gray-400" weight="fill" />
						<h1>{likesCount}</h1>
					</div>
				{/if}
			</div>
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
