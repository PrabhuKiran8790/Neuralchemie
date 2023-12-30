<script lang="ts">
	import { Blogcard, ComboBox, Masonry } from '$lib/components/site';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mt-4 space-y-7 p-1 md:container md:mt-8 md:p-4">
	<div class="flex flex-col items-center justify-center gap-5">
		<div>
			<h1 class="text-4xl font-bold tracking-widest">
				{data.currentTag}
			</h1>
		</div>
		<div
			class="-mt-3 h-[0.3px] w-[50%] bg-gradient-to-r from-gray-400 via-primary to-gray-400 md:hidden"
		/>
		<div class="no-highlight md:hidden">
			<ComboBox tags={data.tags} currentTag={data.currentTag} postsByTag={data.postsByTag} />
		</div>
	</div>
	<div class="flex justify-start gap-4">
		<div class="mt-3 hidden md:block">
			<ComboBox tags={data.tags} currentTag={data.currentTag} postsByTag={data.postsByTag} />
		</div>
		<div class="w-full">
			<Masonry
				gridGap={'0.75rem'}
				items={data.postsByTag[data.currentTag].posts}
				stretchFirst={false}
				reset
			>
				{#each data.postsByTag[data.currentTag].posts as post}
					<Blogcard
						{post}
						class="max-w-lg"
						keepImage={false}
						tagClass="dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
						likesCount={data.likes.find((obj) => obj.slug === post.slug)?.likes}
					/>
				{/each}
			</Masonry>
		</div>
	</div>
</div>
