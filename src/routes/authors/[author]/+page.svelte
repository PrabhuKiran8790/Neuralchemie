<script lang="ts">
	import { authorPathToAlias, getAuthorDetailsFromAlias } from '$lib/config';
	import { AuthorCard, Blogcard, Masonry } from '$lib/components/site';

	import type { PageData } from './$types';

	export let data: PageData;

	$: authorPath = data.path;
	$: authorDetails = getAuthorDetailsFromAlias(authorPathToAlias(authorPath) as string)!;
</script>

<div class="md:mb-20 md:mt-12">
	<div class="flex items-center justify-center">
		<div class="my-7">
			<h1 class="text-center text-4xl font-bold tracking-widest">{authorDetails?.name}</h1>
		</div>
	</div>
	<div
		class="mx-auto flex max-w-7xl flex-col-reverse items-center justify-center md:flex-row md:items-start"
	>
		<AuthorCard
			author={authorDetails}
			posts={data.posts}
			class="mt-4 w-[96%] md:w-[24rem]"
			showTabs={false}
		/>
		<div class="flex-1">
			<Masonry gridGap={'1rem'} items={data.posts} stretchFirst={false} reset>
				{#each data.posts as post}
					<Blogcard
						{post}
						shallow={true}
						keepImage={false}
						likesCount={data.likes.find((obj) => obj.slug === post.slug)?.likes}
					/>
				{/each}
			</Masonry>
		</div>
	</div>
</div>
