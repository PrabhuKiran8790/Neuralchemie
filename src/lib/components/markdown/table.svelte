<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLTableAttributes } from 'svelte/elements';

	type $$Props = HTMLTableAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<<<<<<< HEAD
<div class="my-5 max-h-96 w-full overflow-auto overflow-y-scroll">
	<table
		class={cn('w-full caption-bottom rounded-lg border border-border text-sm', className)}
		{...$$restProps}
	>
=======
<div class="w-full overflow-auto my-5 max-h-96 overflow-y-scroll">
	<table class={cn('w-full caption-bottom text-sm border border-border rounded-lg', className)} {...$$restProps}>
>>>>>>> 61ae1e8c75108042a3a06e5605283b5edfad5a9e
		<slot />
	</table>
</div>
