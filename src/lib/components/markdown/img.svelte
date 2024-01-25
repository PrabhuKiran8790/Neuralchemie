<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { cn, localToGithubURL } from '$lib/utils';
	import { dev } from '$app/environment';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let src: HTMLImgAttributes['src'] = undefined;
	export let alt: HTMLImgAttributes['alt'] = undefined;

	if (!dev && src?.startsWith('/posts')) {
		// only convert if starts with /posts because assets in static folder will be processed by vite
		src = localToGithubURL({ src });
	}
</script>

{#if src && (src.startsWith('--dark') || src.startsWith('--light'))}
	<div class="flex flex-col items-center justify-center">
		<img
			{src}
			{alt}
			class={cn(
				'mt-4 rounded-md',
				src?.startsWith('--dark') ? 'hidden dark:block' : 'block dark:hidden',
				className
			)}
			{...$$restProps}
			loading="lazy"
		/>
		<p class="text-center text-sm text-muted-foreground">{alt ? alt : ''}</p>
	</div>
{:else}
	<div class="flex flex-col items-center justify-center">
		<img {src} {alt} class={cn('mt-4 rounded-md', className)} {...$$restProps} loading="lazy" />
		<p class="text-center text-sm text-muted-foreground">{alt ? alt : ''}</p>
	</div>
{/if}
