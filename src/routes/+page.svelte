<script lang="ts">
	import { Blogcard, Masonry, LatestPost } from '$lib/components/site';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="md:mt-12 md:mb-20">
	<LatestPost post={data.posts[0]} />

	<div class="flex items-center justify-center">
		<div class="my-7">
			<h1 class="text-4xl font-bold tracking-widest">Recent Blogs</h1>
		</div>
	</div>

	<div class="mt-7 max-w-7xl gap-x-[5px] md:mx-auto">
		<Masonry gridGap={'0.75rem'} items={data.posts} stretchFirst={false} reset>
			{#each data.posts as post}
				<Blogcard {post} shallow={true} keepImage={true} />
			{/each}
		</Masonry>
	</div>
</div>
