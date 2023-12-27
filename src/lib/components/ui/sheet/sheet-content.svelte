<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";
	import {
		SheetOverlay,
		SheetPortal,
		sheetTransitions,
		sheetVariants,
		type Side
	} from ".";
	import { X } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { fly } from "svelte/transition";

	type $$Props = SheetPrimitive.ContentProps & {
		side?: Side;
	};

	let className: $$Props["class"] = undefined;
	export let side: $$Props["side"] = "right";
	export { className as class };
	export let inTransition: $$Props["inTransition"] = fly;
	export let inTransitionConfig: $$Props["inTransitionConfig"] =
		sheetTransitions[side ? side : "right"]["in"];
	export let outTransition: $$Props["outTransition"] = fly;
	export let outTransitionConfig: $$Props["outTransitionConfig"] =
		sheetTransitions[side ? side : "right"]["out"];
</script>

<SheetPortal>
	<SheetOverlay />
	<SheetPrimitive.Content
		{inTransition}
		{inTransitionConfig}
		{outTransition}
		{outTransitionConfig}
		class={cn(sheetVariants({ side }), className)}
		{...$$restProps}
	>
		<slot />
	</SheetPrimitive.Content>
</SheetPortal>
