<script lang="ts">
	import { onMount } from 'svelte';
	import { Tree, type TableOfContents, type TableOfContentsItem } from '.';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { currentHeadingId } from '$lib/stores';
	import { BookOpenText } from '../icons';

	let filteredHeadingsList: TableOfContents;

	function getHeadingsWithHierarchy(divId: string) {
		const div = document.getElementById(divId);

		if (!div) {
			return { items: [] };
		}

		const headings: HTMLHeadingElement[] = Array.from(div.querySelectorAll('h2, h3'));
		const hierarchy: TableOfContents = { items: [] };
		let currentLevel: TableOfContentsItem | undefined = undefined;

		headings.forEach((heading: HTMLHeadingElement) => {
			const level = parseInt(heading.tagName.charAt(1));
			if (!heading.id) {
				let newId = heading.innerText
					.replaceAll(/[^a-zA-Z0-9 ]/g, '')
					.replaceAll(' ', '-')
					.toLowerCase();
				heading.id = `${newId}`;
			}

			const item: TableOfContentsItem = {
				title: heading.textContent || '',
				url: `#${heading.id}`,
				items: []
			};

			if (level === 2) {
				hierarchy.items.push(item);
				currentLevel = item;
			} else if (level === 3 && currentLevel?.items) {
				currentLevel.items.push(item);
			}
		});

		filteredHeadingsList = hierarchy;
	}

	// Lifecycle
	onMount(() => {
		getHeadingsWithHierarchy('mdsvex');

		const headings = document.querySelectorAll('h2, h3');

		function handleScroll() {
			// Get the current scroll position
			const scrollPosition = window.scrollY;

			// Loop through each heading and check its position
			headings.forEach((heading) => {
				const headingElement = heading as HTMLElement;

				const headingPosition = headingElement.offsetTop;

				// You can adjust the threshold as needed
				const threshold = 50;

				// Check if the heading is within the threshold of the current scroll position
				if (Math.abs(headingPosition - scrollPosition) < threshold) {
					// Remove the highlight class from all headings
					headings.forEach((h) => h.classList.remove('highlight'));

					// Add the highlight class to the current heading
					heading.classList.add('highlight');

					// Log the ID of the current heading
					$currentHeadingId = `#${heading.id}`;
				}
			});
		}
		window.addEventListener('scroll', handleScroll);
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="flex h-10 w-10 items-center justify-center rounded-full p-1 hover:bg-gray-200 dark:hover:bg-zinc-900"
	>
		<BookOpenText class="h-5 w-5" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="z-[100] min-w-[95%] border border-primary px-3 pb-2 md:min-w-[60%] lg:min-w-[30%]"
	>
		<DropdownMenu.Group class="w-full">
			<DropdownMenu.Label>On this page</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<div class="max-h-[300px] space-y-2 overflow-scroll md:max-h-[500px]">
				<Tree tree={filteredHeadingsList} />
			</div>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
