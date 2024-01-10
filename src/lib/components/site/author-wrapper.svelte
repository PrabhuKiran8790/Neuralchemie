<script lang="ts">
	import { getAuthorDetailsFromAlias } from '$lib/config';
	import type { Post } from '$lib/types';
	import { cn } from '$lib/utils';
	import { Author } from '.';

	export let post: Post;
	export let hover: boolean = true;
	let className: string | undefined = undefined;
	export { className as class };

	let authors: string[];

	// shuffle authors if post.author is an array
	if (Array.isArray(post.author)) {
		authors = post.author.sort(() => Math.random() - 0.5);
	}
</script>

{#if hover}
	{#if Array.isArray(post.author)}
		<div class={cn('flex flex-wrap items-center justify-center gap-4', className)}>
			{#each authors as author_}
				{@const author = getAuthorDetailsFromAlias(author_)}
				<Author {author} {hover} />
			{/each}
		</div>
	{:else}
		{@const author = getAuthorDetailsFromAlias(post.author)}
		<Author {author} {hover} />
	{/if}
{:else if typeof post.author === 'string'}
	{@const author = getAuthorDetailsFromAlias(post.author)}
	<Author {author} />
{:else if Array.isArray(post.author)}
	<div class="flex flex-wrap items-center justify-center gap-2">
		{#each authors as author_}
			{@const author = getAuthorDetailsFromAlias(author_)}
			<Author {author} hover={false} />
		{/each}
	</div>
{/if}
