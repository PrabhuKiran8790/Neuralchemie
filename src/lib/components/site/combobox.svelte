<script lang="ts">
	import { tagToSlug } from '$lib/posts';
	import { Check, ChevronsUpDown, Tag } from 'lucide-svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Post } from '$lib/types';

	export let tags: string[] = [];
	export let currentTag: string;
	export let postsByTag: Record<
		string,
		{
			posts: Post[];
			count: number;
		}
	>;

	let tags_ = tags.map((tag) => ({
		slug: tagToSlug(tag),
		label: tag
	}));

	let open = false;
	let value = '';

	$: selectedValue = tags_.find((f) => f.slug === value)?.label ?? 'Select a tag';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="no-highlight w-[350px] justify-between md:w-[300px]"
		>
			<div class="flex items-center gap-1">
				<Tag class="mr-1 h-3 w-3" />
				<span class="rounded-md bg-zinc-200 px-2 dark:bg-zinc-700">{currentTag}</span>
			</div>
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[350px] p-0 md:w-[300px]">
		<Command.Root>
			<Command.Input placeholder="Search..." />
			<Command.Empty>No Tags found</Command.Empty>
			<Command.Group>
				{#each tags_ as tag}
					<Command.Item
						value={tag.slug}
						onSelect={(currentValue) => {
							value = currentValue;
							goto(`/tags/${currentValue}`);
							closeAndFocusTrigger(ids.trigger);
						}}
						class="no-highlight cursor-pointer"
					>
						<div class="flex w-full items-center justify-between">
							<div class="flex items-center">
								{tag.label}
							</div>
							<div>
								{postsByTag[tag.label].count}
							</div>
						</div>
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
