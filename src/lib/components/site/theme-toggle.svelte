<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Sun, MoonStars } from 'phosphor-svelte';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	import { toggleMode, mode } from 'mode-watcher';
</script>

<Button
	on:click={toggleMode}
	role="switch"
	aria-label="Light Switch"
	aria-checked={$mode === 'light'}
	title="Toggle {$mode === 'dark' ? 'Dark' : 'Light'} Mode"
	variant="outline"
	size="icon"
	class="relative size-9 border-none"
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
