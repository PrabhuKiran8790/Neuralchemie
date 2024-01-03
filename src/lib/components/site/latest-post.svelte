<script lang="ts">
	import { tagToSlug } from '$lib/posts';
	import type { Post } from '$lib/types';
	import { cn, formatDate } from '$lib/utils';
	import { AuthorWrapper, Tag } from '.';
	import { badgeVariants } from '../ui/badge';
	import { Button } from '../ui/button';
	import Balancer from 'svelte-wrap-balancer';

	export let post: Post;
</script>

<div class="p-4">
	<div class="md:container">
		<div class="flex justify-between md:flex-row">
			<div class="flex flex-col gap-4 md:w-[50%]">
				<div class="flex items-center">
					<h1 class="mr-4 text-xl font-bold tracking-widest">Latest</h1>
					<div class="flex-grow">
						<hr class="border-gray-300 dark:border-gray-700" />
					</div>
				</div>
				<Balancer>
					<div class="flex flex-col gap-4">
						<!-- <p class="-my-2 text-sm tracking-widest">{formatDate(post.date)}</p> -->
						<a href={post.slug}>
							<h1 class="text-2xl font-bold leading-[1.1] tracking-wider md:text-[40px]">
								{post.title}
							</h1>
						</a>
						<p class="text-muted-foreground">{post.description}</p>
						<AuthorWrapper {post} />
						<div class="flex flex-wrap gap-2">
							{#each post.tags as tag}
								<Tag
									{tag}
									href={`/tags/${tagToSlug(tag)}`}
									class={cn(
										badgeVariants({
											variant: 'secondary'
										}),
										'rounded-md border'
									)}
									shallow
								/>
							{/each}
						</div>
						<div>
							<Button href={`/blog/${post.slug}`} class="mt-4">Read more</Button>
						</div>
					</div>
				</Balancer>
			</div>
			<div class="hidden w-[50%] md:block">
				{#if post.image}
					<div class="p-2">
						{#if typeof post.image === 'string'}
							<img src={post.image} alt={post.title} class="w-fit rounded-md" loading="lazy" />
						{:else if Array.isArray(post.image)}
							<img
								src={post.image[0]}
								alt={post.title}
								class="w-fit rounded-md dark:hidden"
								loading="lazy"
							/>
							<img
								src={post.image[1]}
								alt={post.title}
								class="hidden w-fit rounded-md dark:block"
								loading="lazy"
							/>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
