<script lang="ts">
	import { AuthorCard, Masonry } from '$lib/components/site';
	import { config } from '$lib/config';
	import { cn } from '$lib/utils';
	import type { PageData } from './$types';
	export let data: PageData;
	let authors = config.authors;

	// shuffle authors
	authors = authors.sort(() => Math.random() - 0.5);
</script>

<!-- <h1>Authors</h1>

{#each authors as author}
	<p><a href="authors">{author.name}</a></p>
{/each} -->

<div class="max-w-7xl md:mx-auto md:mb-20 md:mt-12">
	<div class="flex items-center justify-center">
		<div class="my-7">
			<h1 class="text-4xl font-bold tracking-widest">Authors</h1>
		</div>
	</div>
	<!-- <AuthorCard author={authors[0]} posts={data.author_posts[authors[0].aliases[0]]} /> -->
	<Masonry reset gridGap={'1rem'}>
		{#each authors as author, i}
			<div class={cn(i % 2 === 0 ? 'lg:mt-16' : '')}>
				<AuthorCard {author} posts={data.author_posts[author.aliases[0]]} />
			</div>
		{/each}
	</Masonry>
</div>
