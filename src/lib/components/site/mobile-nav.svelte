<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import { NN, ThemeToggle } from '.';
	import { config, getNameFromPath } from '$lib/config';
	import { navigating, page } from '$app/stores';
	import Liking from './liking.svelte';
	import { Toc } from './table-of-contents';
	import { Close, List } from './icons';

	let showScrollToTop = true;
	let prevScrollY = 0;
	let showDrawer = false;

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function handleScroll() {
		const scrollY = window.scrollY;
		showScrollToTop = scrollY < prevScrollY;
		prevScrollY = scrollY;
	}

	function toggleDrawer() {
		showDrawer = !showDrawer;
		if (showDrawer) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}

	$: {
		if ($navigating) {
			showDrawer = false;
			document.body.classList.remove('no-scroll');
		}
	}
</script>

{#if showScrollToTop}
	<div
		class={cn(
			'fixed bottom-0 z-[100] h-[4rem] w-full bg-gray-50 shadow-xl md:hidden dark:bg-zinc-900',
			!showDrawer && 'border-t'
		)}
		transition:fly={{ y: 200, duration: 500 }}
	>
		<div class="grid h-full grid-cols-3 items-center justify-between px-6">
			<div>
				<div class="flex items-center justify-start gap-2">
					<a href="/" class="flex items-center justify-center gap-2">
						<NN class="size-10" />
						{#if $page.url.pathname === '/'}
							<p class="text-base uppercase tracking-widest">{config.name}</p>
						{/if}
					</a>
					{#if getNameFromPath($page.url.pathname)}
						<div class="flex items-center justify-center gap-3">
							<div class="h-5 w-[1px] bg-primary"></div>
							<p class="-mb-1 text-xs tracking-wider">
								{getNameFromPath($page.url.pathname)}
							</p>
						</div>
					{/if}
				</div>
			</div>
			<div class="flex items-center justify-center">
				{#if $page.params.slug}
					<Liking />
					<Toc />
				{/if}
			</div>
			<div class="flex justify-end">
				<button on:click={toggleDrawer} class="flex items-center justify-center">
					{#if !showDrawer}
						<List class="size-6" />
					{:else}
						<Close class="size-6" />
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

{#if showDrawer}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed inset-0 z-[70] bg-background/50 backdrop-blur-sm md:hidden"
		on:click={toggleDrawer}
		transition:fade={{ duration: 150 }}
	/>
	<div
		class="fixed inset-x-0 bottom-14 z-[80] w-full gap-4 rounded-t-xl border-t bg-background p-6 shadow-2xl md:hidden dark:bg-zinc-900"
		in:fly={{ y: '100%', duration: 500, opacity: 1 }}
		out:fly={{ y: '100%', duration: 300, opacity: 1 }}
	>
		<div>
			<div class="flex flex-col items-center gap-5">
				{#each config.routes as route}
					<a
						href={route.path}
						class={cn(
							'group relative inline-block w-full rounded-lg px-3 py-1 text-lg tracking-wider hover:bg-accent hover:text-accent-foreground',
							$page.url.pathname.startsWith(route.path) && 'bg-accent text-accent-foreground'
						)}
					>
						{route.name}
					</a>
				{/each}
				<div class="flex w-full items-center justify-between space-x-2 px-3">
					<p class="text-lg font-normal tracking-wider">Theme</p>
					<ThemeToggle class="dark:bg-zinc-800" />
				</div>
			</div>
		</div>
	</div>
{/if}
