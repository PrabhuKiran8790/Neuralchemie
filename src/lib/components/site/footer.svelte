<script>
	import { config } from '$lib/config';
	import { NN } from '.';
	import { Svelte } from './icons';

	let currentYear = new Date().getFullYear();
</script>

<div class="container">
	<div class="flex flex-col-reverse items-center p-2 md:flex-row md:justify-between">
		<div class="flex items-center justify-center gap-2">
			<NN class="size-8" />
			<p class="tracking-widest"><span class="uppercase tracking-widest">{config.name}</span> | © {currentYear}</p>
		</div>
		<div class="flex items-center gap-2">
			<h1>Made with</h1>
			<Svelte class="inline-block h-7 w-7" />
			<a href="/authors/prabhukirankonda">By Prabhu Kiran Konda</a>
		</div>
	</div>
</div>
