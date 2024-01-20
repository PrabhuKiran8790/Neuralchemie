<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { theme } from '$lib/stores';

	import { toggleMode, mode } from 'mode-watcher';
	import { cn } from '$lib/utils';
	let className: string | undefined | null = undefined;
	export { className as class };

	$: {
		$theme = $mode;
	}
</script>

<Button
	on:click={toggleMode}
	role="switch"
	aria-label="Light Switch"
	aria-checked={$mode === 'light'}
	title="Toggle {$mode === 'dark' ? 'Dark' : 'Light'} Mode"
	variant="outline"
	size="icon"
	class={cn('relative size-9 border-none', className)}
>
	{#if $mode === 'light'}
		<div
			class="absolute inline-flex items-center justify-center"
			transition:scale={{
				delay: 50,
				duration: 300,
				start: 0.7,
				easing: cubicOut
			}}
		>
			<!-- <MoonStars class="size-[22px]" aria-label="Moon" /> -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="size-[22px]"
				><rect width="256" height="256" fill="none" /><line
					x1="208"
					y1="120"
					x2="208"
					y2="72"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="232"
					y1="96"
					x2="184"
					y2="96"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="160"
					y1="32"
					x2="160"
					y2="64"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="176"
					y1="48"
					x2="144"
					y2="48"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><path
					d="M210.69,158.18A96.78,96.78,0,0,1,192,160,96.08,96.08,0,0,1,97.82,45.31,88,88,0,1,0,210.69,158.18Z"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/></svg
			>
		</div>
	{:else}
		<div
			class="absolute inline-flex items-center justify-center"
			transition:scale={{
				delay: 50,
				duration: 300,
				start: 0.7,
				easing: cubicOut
			}}
		>
			<!-- <Sun class="size-[22px]" aria-label="Sun" /> -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="size-[22px]"
				><rect width="256" height="256" fill="none" /><line
					x1="128"
					y1="40"
					x2="128"
					y2="16"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><circle
					cx="128"
					cy="128"
					r="56"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="64"
					y1="64"
					x2="48"
					y2="48"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="64"
					y1="192"
					x2="48"
					y2="208"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="192"
					y1="64"
					x2="208"
					y2="48"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="192"
					y1="192"
					x2="208"
					y2="208"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="40"
					y1="128"
					x2="16"
					y2="128"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="128"
					y1="216"
					x2="128"
					y2="240"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><line
					x1="216"
					y1="128"
					x2="240"
					y2="128"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/></svg
			>
		</div>
	{/if}
</Button>
