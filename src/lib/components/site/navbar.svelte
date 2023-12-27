<script>
	import { page } from '$app/stores';
	import { config } from '$lib/config';
	import { cn } from '$lib/utils';
	import { ThemeToggle, NN } from '.';
</script>

<nav
	class="fixed left-0 right-0 top-0 z-50 hidden h-14 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block md:h-[4.1rem]"
>
	<div class="mx-auto flex h-full max-w-[100rem] items-center justify-between p-4">
		<div class="flex items-center gap-4">
			<a href="/" class="flex items-center justify-center gap-4">
				<NN />
				<p class="text-lg font-semibold tracking-wider">{config.name}</p>
			</a>
		</div>
		<div class="hidden md:block">
			<div class="flex items-center justify-center space-x-4">
				<ul class="flex items-center">
					{#each config.routes as route}
						<li>
							<a
								href={route.path}
								class="group relative inline-block rounded-lg px-3 py-1 text-lg tracking-wider hover:bg-accent hover:text-accent-foreground"
							>
								<span
									class={cn(
										'absolute -bottom-1 left-1/2 h-[3px] w-4 -translate-x-1/2 transform rounded-full bg-black opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white',
										$page.url.pathname.startsWith(route.path) ? 'opacity-100' : ''
									)}
								/>
								{route.name}
							</a>
						</li>
					{/each}
				</ul>
				<ThemeToggle />
			</div>
		</div>
	</div>
</nav>
