<script lang="ts">
	export let href: string;
	export let rel: string | undefined = undefined;

	$: internal = href.startsWith('/') || href.startsWith('#');

	$: rel = !internal ? 'noopener noreferrer' : undefined;
	$: target = !internal ? '_blank' : undefined;
</script>

<a
	class="inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
	{href}
	{target}
>
	<slot />
	{#if !internal}
		<svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><polyline
				points="216 104 215.99 40.01 152 40"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><line
				x1="136"
				y1="120"
				x2="216"
				y2="40"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><path
				d="M184,136v72a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h72"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/></svg
		>
	{/if}
</a>
