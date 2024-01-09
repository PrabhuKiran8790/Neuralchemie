<script lang="ts">
	import { page } from '$app/stores';
	import { config } from '$lib/config';
	import { MetaTags } from 'svelte-meta-tags';

	const og = {
		images: [
			{
				image: 'https://codedojo.vercel.app/OG.png',
				width: 800,
				height: 600,
				alt: config.name
			}
		],
		siteName: config.name,
		twitter: {
			handle: '@prabhukirantwt',
			cardType: 'summary_large_image',
			image: 'https://codedojo.vercel.app/OG.png',

			imageAlt: config.name
		}
	};

	let pageMeta = {};

	type Meta = {
		title: string;
		description: string;
		ogTitle?: string;
		ogDescription?: string;
	};

	function setPageMeta(meta: Meta) {
		pageMeta = {
			title: `${og.siteName} | ${meta.title}`,
			description: meta.description,
			openGraph: {
				url: $page.url,
				title: `${og.siteName} | ${meta.ogTitle || meta.title}`,
				description: meta.ogDescription || meta.description,
				images: og.images,
				siteName: og.siteName
			},
			twitter: {
				handle: '@prabhukirantwt',
				cardType: 'summary_large_image',
				title: `${og.siteName} | ${meta.ogTitle || meta.title}`,
				description: meta.ogDescription || meta.description,
				image: 'https://codedojo.vercel.app/OG.png',
				imageAlt: '${og.siteName}'
			}
		};
	}

	$: {
		if ($page.url.pathname == '/') {
			setPageMeta({
				title: 'Home',
				description: 'Craft your understanding of AI'
			});
		} else if ($page.url.pathname == '/blog') {
			setPageMeta({
				title: 'Blog',
				description: 'Blog'
			});
		} else if ($page.url.pathname == '/tags') {
			setPageMeta({
				title: 'Tags',
				description: 'Tags'
			});
		} else if ($page.url.pathname == '/authors') {
			setPageMeta({
				title: 'Authors',
				description: 'Authors'
			});
		}
	}
</script>

<MetaTags {...pageMeta} />
