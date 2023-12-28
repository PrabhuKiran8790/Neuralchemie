<script lang="ts">
	import { Blogcard, Masonry } from '$lib/components/site';
	import Search from '$lib/components/site/search.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-7xl md:mx-auto md:mb-20 md:mt-12">
	<div class="flex items-center justify-center">
		<div class="my-7">
			<h1 class="text-4xl font-bold tracking-widest">All Blogs</h1>
		</div>
	</div>

	<div class="flex items-center justify-center px-3">
		<Search {data} />
	</div>

	<div class="mt-7 gap-x-[5px]">
		<Masonry gridGap={'0.75rem'} items={data.posts} stretchFirst={false} reset>
			{#each data.posts as post}
				<Blogcard {post} shallow={true} keepImage={true} />
			{/each}
		</Masonry>
	</div>
</div>
