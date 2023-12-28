<script lang="ts">
	import { getAuthorDetailsFromAlias } from '$lib/config';
	import type { Post } from '$lib/types';
	import { cn } from '$lib/utils';
	import { Author } from '.';

	export let post: Post;
	export let hover: boolean = true;
</script>

{#if hover}
	{#if Array.isArray(post.author)}
		<div class="flex flex-wrap items-center gap-2">
			{#each post.author as author_}
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
	<div class="flex flex-wrap items-center gap-2">
		{#each post.author as author_}
			{@const author = getAuthorDetailsFromAlias(author_)}
			<Author {author} hover={false} />
		{/each}
	</div>
{/if}
