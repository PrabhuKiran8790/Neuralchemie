<script lang="ts">
	import { Tag } from '$lib/components/site';
	import type { PageData } from './$types';

	export let data: PageData;

	const { tags, postsByTag } = data;
</script>

<div class="mt-4 flex flex-col gap-10 p-4 md:mt-8">
	<div class="flex flex-col items-start justify-center gap-8 md:items-center">
		<h1 class="text-4xl font-bold tracking-widest">Tags</h1>
		<div />
	</div>

	<div class="max-w-7xl md:mx-auto md:px-20">
		<div class="flex flex-wrap gap-5">
			{#each tags as tag}
				<Tag {tag} count={postsByTag[tag].count} href={`/tags/${postsByTag[tag].slug}`} />
			{/each}
		</div>
	</div>
</div>
