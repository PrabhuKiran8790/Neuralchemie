<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Planet } from 'phosphor-svelte';
	import { buttonVariants } from '../ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { Author_ } from '$lib/config';
	import { cn } from '$lib/utils';

	export let author: Author_ | null;
	export let hover: boolean = false;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

{#if hover}
	<HoverCard.Root openDelay={200} closeDelay={100}>
		<HoverCard.Trigger class="w-fit">
			<a class="flex items-center gap-2" href={`/author/${author?.path}`}>
				<Avatar.Root class={cn('size-7', className)}>
					<Avatar.Image src={`${author?.social.GitHub.url}.png`} alt={`@${author?.path}`} />
					<Avatar.Fallback>
						{`${author?.name.split(' ')[0].charAt(0)} ${author?.name.split(' ')[1].charAt(0)}`}
					</Avatar.Fallback>
				</Avatar.Root>
				<p>{author?.name}</p>
			</a>
		</HoverCard.Trigger>
		<HoverCard.Content class="flex w-[420px] flex-col gap-3">
			<div class="flex justify-between space-x-4">
				<Avatar.Root class="size-14">
					<Avatar.Image src={`${author?.social.GitHub.url}.png`} />
					<Avatar.Fallback>
						{`${author?.name.split(' ')[0].charAt(0)}${author?.name.split(' ')[1].charAt(0)}`}
					</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex-grow space-y-1">
					<div class="flex items-center justify-between">
						<div class="flex flex-col">
							<h1>{author?.name}</h1>
							<a href={`/author/${author?.path}`} class="text-xs text-muted-foreground"
								>@{author?.path}</a
							>
						</div>
						<div>
							<a
								href={author?.website}
								class={cn(
									buttonVariants({
										variant: 'outline'
									}),
									'flex size-8 items-center gap-1 p-0'
								)}
								target="_blank"
							>
								<Planet class="size-5" />
							</a>
						</div>
					</div>
					<p>{author?.tagline}</p>
				</div>
			</div>
			<div class="flex flex-wrap items-center gap-2">
				{#if author?.social}
					{#each Object.entries(author?.social) as [name, { url, icon }]}
						<a
							class={cn(
								buttonVariants({
									variant: 'outline'
								}),
								'mb-1 flex h-7 items-center gap-1 px-2 py-1'
							)}
							href={url}
							target="_blank"
						>
							<p>{name}</p>
							<svelte:component this={icon} class={cn('size-5', name === 'Twitter' && 'size-4')} />
						</a>
					{/each}
				{/if}
			</div>
		</HoverCard.Content>
	</HoverCard.Root>
{:else}
	<a class="flex w-fit items-center gap-2" href={`/author/${author?.path}`}>
		<Avatar.Root class={cn('size-7', className)}>
			<Avatar.Image src={`${author?.social.GitHub.url}.png`} alt={`@${author?.path}`} />
			<Avatar.Fallback>
				{`${author?.name.split(' ')[0].charAt(0)}${author?.name.split(' ')[1].charAt(0)}`}
			</Avatar.Fallback>
		</Avatar.Root>
		<p>{author?.name}</p>
	</a>
{/if}
