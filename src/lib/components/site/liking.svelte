<script lang="ts">
	import { beforeNavigate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	import axios from 'axios';
	import { Heart } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Github, Loader2 } from 'lucide-svelte';
	import { signIn } from '@auth/sveltekit/client';

	let liked: boolean = false;
	let loading = false;
	let signingIn = false;
	let isNavigating = false;

	let openModal = false;

	beforeNavigate(() => {
		isNavigating = true;
	});

	$: {
		if ($page.data.likedPosts && $page.data.likedPosts.includes($page.params.slug)) {
			liked = true;
		}
	}

	async function addLike() {
		if (!$page.data.session) {
			openModal = true;
		} else {
			loading = true;
			liked = !liked;

			// // based on liked, add the slug to the likedPosts array or remove it
			// // jsut for optimistic UI
			// if (liked) {
			// 	$page.data.likedPosts.push($page.params.slug);
			// } else {
			// 	$page.data.likedPosts = $page.data.likedPosts.filter(
			// 		(slug: string) => slug !== $page.params.slug
			// 	);
			// }

			const response = await axios.post('/api/account', {
				liked: liked,
				slug: $page.params.slug
			});

			if (response.status === 200) {
				invalidateAll();
				loading = false;
			}
		}
	}

	let url = $page.url as unknown as string;
</script>

<div class="flex items-center justify-center gap-1">
	{#if $page.data.likes.find((obj) => obj.slug === $page.params.slug)?.likes}
		<p class="-mr-2 text-xs text-muted-foreground">
			{$page.data.likes.find((obj) => obj.slug === $page.params.slug)?.likes}
		</p>
	{/if}
	<Tooltip.Root openDelay={0}>
		<Tooltip.Trigger>
			<button
				on:click={addLike}
				disabled={loading}
				class="flex h-10 w-10 items-center justify-center gap-2 rounded-full p-1"
			>
				{#if !loading}
					<Heart class={cn('h-5 w-5', liked && 'text-red-500')} weight={liked ? 'fill' : 'bold'} />
				{:else}
					<Loader2 class="h-4 w-4 animate-spin" />
				{/if}
			</button>
		</Tooltip.Trigger>
		<Tooltip.Content class="border border-primary">
			<p>Like</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>

<Dialog.Root
	open={openModal}
	onOpenChange={() => {
		openModal = !openModal;
	}}
>
	<Dialog.Content class="max-w-xs">
		<Dialog.Header>
			<Dialog.Title class="text-center">Sign in to like this Post</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<div class="flex items-center justify-center">
				<Button
					class="flex h-8 items-center justify-center gap-2 px-2"
					on:click={() => {
						signingIn = true;
						signIn('github', { callbackUrl: url });
					}}
					disabled={signingIn || isNavigating}
				>
					<Github class="h-5 w-5" />
					{#if signingIn && isNavigating}
						<Loader2 class="h-4 w-4 animate-spin" />
					{:else}
						Sign in with GitHub
					{/if}
				</Button>
			</div>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
