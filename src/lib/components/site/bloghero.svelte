<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { Calendar, Tag as TagIcon } from 'lucide-svelte';
	import type { PageData } from '../../../routes/blog/[slug]/$types';
	import { tagToSlug } from '$lib/posts';
	import { AuthorWrapper, Tag } from '.';
	import { page } from '$app/stores';

	export let data: PageData;
	$: ({ meta } = data);
</script>

<div class="flex flex-col items-center justify-center space-y-4">
	{#if meta.image}
		{#if typeof meta.image === 'string'}
			<img
				src={meta.image}
				alt={meta.title}
				loading="lazy"
				class="h-auto max-h-[550px] w-full md:w-[80%] md:rounded-lg"
			/>
		{:else if Array.isArray(meta.image)}
			<img
				src={meta.image[0]}
				alt={meta.title}
				loading="lazy"
				class="h-auto max-h-[550px] w-full md:w-[80%] md:rounded-lg dark:hidden"
			/>
			<img
				src={meta.image[1]}
				alt={meta.title}
				loading="lazy"
				class="hidden h-auto max-h-[550px] w-full md:w-[80%] md:rounded-lg dark:block"
			/>
		{/if}
	{/if}
	<div>
		<h1 class="px-4 text-center text-2xl font-bold md:text-4xl">
			{meta.title}
		</h1>
	</div>
	<div class="flex items-center gap-2">
		<TagIcon class="h-4 w-4" />
		{#each meta.tags as tag}
			<Tag
				class="dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
				{tag}
				href={`/tags/${tagToSlug(tag)}`}
				shallow={true}
			/>
		{/each}
	</div>
	<div class="flex items-center space-x-2 text-muted-foreground">
		<Calendar class="h-3 w-3 md:h-4 md:w-4" />
		<p class="text-xs font-semibold md:text-sm">{formatDate(meta.date, 'long')}</p>
	</div>
	<div>
		<AuthorWrapper post={data.meta} />
	</div>
</div>
