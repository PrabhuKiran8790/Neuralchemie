<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLTableAttributes } from 'svelte/elements';

	type $$Props = HTMLTableAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class="my-5 max-h-96 w-full overflow-auto overflow-y-scroll">
	<table
		class={cn('w-full caption-bottom rounded-lg border border-border text-sm', className)}
		{...$$restProps}
	>
		<slot />
	</table>
</div>
