<script>
	import { Navbar, Footer, MobileNav, MetaTags } from '$lib/components/site';
	import { preparePageTransition } from '$lib/page-transitions';
	import '../app.pcss';

	preparePageTransition();
</script>

<MetaTags />
<Navbar />
<div class="flex min-h-screen flex-col md:pt-10">
	<div class="mb-20 flex-1 md:mb-0">
		<slot />
	</div>
	<footer class="border-t">
		<Footer />
	</footer>
</div>
<MobileNav />
