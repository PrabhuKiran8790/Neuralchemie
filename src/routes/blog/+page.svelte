<script lang="ts">
	import { Blogcard, Masonry } from '$lib/components/site';
	import Search from '$lib/components/site/search.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const likes = data.likes;
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
		<!-- items={data.posts} prop removed, let's see if this is what causing the issue -->
		<Masonry gridGap={'0.75rem'} stretchFirst={false} reset>
			{#each data.posts as post}
				<Blogcard
					{post}
					shallow={true}
					keepImage={true}
					n={data.posts.length}
					likesCount={likes.find((obj) => obj.slug === post.slug)?.likes}
				/>
			{/each}
		</Masonry>
		<!-- if masonry is not working as expected, use this -->
		<!-- <div class="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post}
				<div>
					<Blogcard
						{post}
						shallow={true}
						keepImage={true}
						n={data.posts.length}
						likesCount={likes.find((obj) => obj.slug === post.slug)?.likes}
					/>
				</div>
			{/each}
		</div> -->
	</div>
</div>
