<script lang="ts">
	import { page } from '$app/stores';
	import X from '$lib/components/site/icons/X.svelte';
	import { Toc } from '$lib/components/site/table-of-contents';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { fly } from 'svelte/transition';
	import Linkedin from './icons/linkedin.svelte';
	import Liking from './liking.svelte';
	import { Share, ChatTeardropText, ArrowUp } from './icons';

	export let element: HTMLElement | null = null;
	export let showScrollToTop: boolean;
</script>

<div
	class="sticky bottom-10 z-20 ml-5 hidden w-full md:block"
	in:fly={{ y: 1000 }}
	out:fly={{ y: 1000 }}
>
	<div class="flex items-center justify-center space-x-4">
		<div
			class="flex items-center justify-evenly space-x-1 rounded-l-full rounded-r-full border border-primary/50 bg-muted px-7 py-1 shadow-sm"
		>
			<Liking />
			<!-- Comments -->
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger>
					<button
						on:click={() => {
							element?.scrollIntoView({
								behavior: 'smooth',
								block: 'end',
								inline: 'nearest'
							});
						}}
						class="flex h-10 w-10 items-center justify-center rounded-full p-1 hover:bg-gray-200 dark:hover:bg-zinc-900"
					>
						<ChatTeardropText class="h-5 w-5" />
					</button>
				</Tooltip.Trigger>
				<Tooltip.Content class="border border-primary">
					<p>Comments</p>
				</Tooltip.Content>
			</Tooltip.Root>
			<!-- Table of Contents -->
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger>
					<Toc />
				</Tooltip.Trigger>
				<Tooltip.Content class="border border-primary">
					<p>Table of Contents</p>
				</Tooltip.Content>
			</Tooltip.Root>
			<!-- Share -->
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger>
					<button
						class="flex h-10 w-10 items-center justify-center rounded-full p-1 hover:bg-gray-200 dark:hover:bg-zinc-900"
					>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Share class="h-5 w-5" />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Label>Share</DropdownMenu.Label>
									<DropdownMenu.Separator />
									<DropdownMenu.Item
										class="space-x-2"
										href={`http://www.twitter.com/share?url=${$page.url}`}
									>
										<X />
										<p>Twitter</p>
									</DropdownMenu.Item>
									<DropdownMenu.Item
										class="space-x-2"
										href={`https://www.linkedin.com/sharing/share-offsite/?url=${$page.url}`}
									>
										<Linkedin class="-ml-1" />
										<p>LinkedIn</p>
									</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</button>
				</Tooltip.Trigger>
				<Tooltip.Content class="border border-primary">
					<p>Share</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<div class="flex h-7 w-7 items-center justify-center">
			{#if showScrollToTop}
				<div transition:fly={{ x: -20, duration: 700 }}>
					<Tooltip.Root openDelay={0}>
						<Tooltip.Trigger>
							<button
								class="rounded-full border border-muted-foreground bg-muted p-1"
								on:click={() => {
									window.scrollTo({
										top: 0,
										behavior: 'smooth'
									});
								}}
							>
								<ArrowUp class="h-5 w-5" />
							</button>
						</Tooltip.Trigger>
						<Tooltip.Content class="border border-primary">
							<p>Scroll to top</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</div>
			{/if}
		</div>
	</div>
</div>
