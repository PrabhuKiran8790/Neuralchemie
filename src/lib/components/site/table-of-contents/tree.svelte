<script lang="ts">
	import { cn } from '$lib/utils';
	import type { TableOfContents } from '.';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { currentHeadingId } from '$lib/stores';
	// import { ArrowElbowDownRight } from 'phosphor-svelte';

	export let tree: TableOfContents = {
		items: []
	};
	export let level = 1;
</script>

<ul class={cn('m-0 list-none', { 'w-full pl-4': level !== 1 })}>
	{#if tree.items && tree.items.length}
		{#each tree.items as item, i (i)}
			<li class={cn('pt-[4px]')}>
				<DropdownMenu.Item
					class={cn(
						'cursor-pointer px-2 py-1 data-[highlighted]:bg-primary/10',
						item.url === $currentHeadingId
							? 'border-l-[2.5px] border-primary bg-primary/10 text-primary'
							: 'text-muted-foreground'
					)}
					href={item.url}
				>
					{#if level > 1}
						<!-- <ArrowElbowDownRight class={cn('-ml-1', 'mr-2', 'h-4 w-4 hover:text-foreground')} /> -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 256 256"
							class={cn('-ml-1', 'mr-2', 'h-4 w-4 hover:text-foreground')}
							><rect width="256" height="256" fill="none" /><polyline
								points="160 128 208 176 160 224"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="16"
							/><polyline
								points="64 32 64 176 208 176"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="16"
							/></svg
						>
					{/if}
					{item.title}
				</DropdownMenu.Item>
				{#if item.items && item.items.length}
					<div class="flex items-center">
						<svelte:self tree={item} level={level + 1} />
					</div>
				{/if}
			</li>
		{/each}
	{/if}
</ul>
