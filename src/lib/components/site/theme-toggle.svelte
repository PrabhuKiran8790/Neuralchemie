<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Sun, MoonStars } from 'phosphor-svelte';
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
			<MoonStars class="size-[22px]" aria-label="Moon" />
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
			<Sun class="size-[22px]" aria-label="Sun" />
		</div>
	{/if}
</Button>
