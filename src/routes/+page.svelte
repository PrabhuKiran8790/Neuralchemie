<script lang="ts">
	import { Blogcard, Masonry, LatestPost } from '$lib/components/site';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	export let data: PageData;
	const likes = data.likes;
</script>

<div class="md:mb-20 md:mt-12">
	<LatestPost post={data.posts[0]} />

	<div class="flex flex-col items-center justify-center gap-3">
		<div class="mt-5">
			<h1 class="text-4xl font-bold tracking-widest">Recent Blogs</h1>
		</div>
		<Button href="/blog">All Blogs</Button>
	</div>

	<div class="mt-7 max-w-7xl gap-x-[5px] md:mx-auto">
		<Masonry gridGap={'0.75rem'} stretchFirst={false} reset>
			{#each data.posts as post}
				<Blogcard
					{post}
					shallow={true}
					keepImage={true}
					likesCount={likes.find((obj) => obj.slug === post.slug)?.likes}
				/>
			{/each}
		</Masonry>
	</div>
</div>
