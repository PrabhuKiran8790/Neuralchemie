<script lang="ts">
	import { Command as CommandIcon, MagnifyingGlass as Search } from 'phosphor-svelte';

	import * as Command from '$lib/components/ui/command';

	import { goto } from '$app/navigation';
	import { cn, formatDate } from '$lib/utils';
	import { onMount } from 'svelte';
	import type { PageData } from '../../../routes/blog/$types';
	import { Badge } from '../ui/badge';
	import { Button } from '../ui/button';

	export let data: PageData;
	let searchOpen = false;
	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				searchOpen = !searchOpen;
			}
		}
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	function runCommand(cmd: () => void) {
		searchOpen = false;
		cmd();
	}
</script>

<Button
	variant="outline"
	class={cn(
		'relative w-full cursor-text justify-start text-sm text-muted-foreground sm:pr-12 md:w-96'
	)}
	on:click={() => (searchOpen = true)}
	{...$$restProps}
>
	<span class="inline-flex items-center">
		<Search class="mr-2 h-4 w-4" />
		Search blogs</span
	>
	<kbd
		class="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
	>
		<span class="text-xs">
			<div class="flex items-center">
				<CommandIcon class="size-3.5" />
				<h1>/ctrl K</h1>
			</div>
		</span>
	</kbd>
</Button>

<Command.Dialog
	open={searchOpen}
	onOpenChange={() => {
		searchOpen = !searchOpen;
	}}
>
	<Command.Input placeholder="Type to search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="All blogs">
			{#each data.posts as post}
				<Command.Item
					onSelect={() => {
						runCommand(() => {
							post.slug && goto(`/blog/${post.slug}`);
						});
					}}
					class="cursor-pointer"
				>
					<div class="flex w-full flex-col gap-1">
						<div class="flex w-full items-center justify-between">
							<div class="w-full">
								<div class="flex w-full items-center justify-between">
									<h1 class="text-xs text-muted-foreground">{formatDate(post.date)}</h1>
								</div>
								<h1>{post.title}</h1>
							</div>
						</div>
						<div class="flex flex-wrap items-center gap-2">
							{#each post.tags as tags}
								<Badge class="rounded-md bg-gray-300 dark:bg-zinc-600" variant="outline"
									>{tags}</Badge
								>
							{/each}
						</div>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
