<script lang="ts">
	import { getIconFromName, type Author_ } from '$lib/config';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Tabs from '$lib/components/ui/tabs';

	import { Button } from '../ui/button';
	import { cn, formatDate } from '$lib/utils';
	import type { Post } from '$lib/types';
	import { Calendar } from 'phosphor-svelte';

	export let author: Author_;
	export let posts: Post[];
</script>

<div class="flex max-w-md flex-col rounded-xl border border-border p-2">
	<div class="h-24">
		<img
			src={author.cover}
			alt={`Cover Image - ${author.name}`}
			class="h-full w-full rounded-t-lg object-cover"
		/>
	</div>
	<div class="flex flex-col gap-1 px-3">
		<div class="relative -mt-12 flex flex-row justify-between">
			<Avatar.Root class="size-24 ring-2 ring-white dark:ring-black">
				<Avatar.Image src={`${author?.social.GitHub.url}.png`} alt={`@${author?.path}`} />
				<Avatar.Fallback>
					{`${author?.name.split(' ')[0].charAt(0)} ${author?.name.split(' ')[1].charAt(0)}`}
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="absolute bottom-3 right-0">
				<Button class="h-7 border-muted-foreground" variant="outline" href={author.website}
					>Visit Website</Button
				>
			</div>
		</div>
		<div class="-space-y-1">
			<h1 class="text-2xl font-bold">{author.name}</h1>
			<a href={`/author/${author.path}`} class="block text-sm text-muted-foreground"
				>@{author.path}</a
			>
		</div>

		<div>
			<p>{author.tagline}</p>
		</div>

		<div class="mt-3">
			<Tabs.Root value="socials" class="mb-3 w-full">
				<Tabs.List class="mb-5 w-full">
					<Tabs.Trigger value="posts" class="w-full">Recent Posts</Tabs.Trigger>
					<Tabs.Trigger value="socials" class="w-full">Socials</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="posts" class="rounded-lg border border-border p-2">
					<div class="flex flex-col gap-3">
						{#if posts && posts.length > 0}
							{#each posts as post (post.slug)}
								<a href={`/blog/${post.slug}`} class="block">
									<div class="flex items-center gap-2 text-xs text-muted-foreground">
										<Calendar class="h-3 w-3" />
										<h1>{formatDate(post.date)}</h1>
									</div>
									<h1 class="hover:underline">
										{post.title}
									</h1>
								</a>
							{/each}
						{:else}
							<h1>Haven't published yet</h1>
						{/if}
					</div>
				</Tabs.Content>
				<Tabs.Content value="socials">
					<div class="mx-auto flex w-[90%] flex-col gap-2">
						{#each Object.keys(author.social) as social}
							<Button
								href={author.social[social].url}
								variant="outline"
								class="grid grid-cols-2 gap-3"
							>
								<div class="flex items-center justify-end">
									<svelte:component
										this={getIconFromName(social)}
										class={cn(social === 'Twitter' ? 'size-4' : 'size-5')}
									/>
								</div>
								<div>
									<p>{social}</p>
								</div>
							</Button>
						{/each}
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</div>
</div>
