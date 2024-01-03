import { At, GithubLogo, LinkedinLogo } from 'phosphor-svelte';
import { X } from './components/site/icons';
import type { ComponentType, SvelteComponent } from 'svelte';

const routes = ['Blog', 'Tags', 'Authors'];

const icons: Record<string, ComponentType<SvelteComponent>> = {
	GitHub: GithubLogo,
	Twitter: X,
	Linkedin: LinkedinLogo,
	Mail: At
};

interface SocialIcons {
	[key: string]: {
		url: string;
		icon?: ComponentType<SvelteComponent>;
	};
}
interface Config {
	name: string;
	routes: {
		name: string;
		path: string;
	}[];
	authors: Author_[];
}
export interface Author_ {
	name: string;
	path: string;
	website: string;
	aliases: string[];
	bio: string;
	tagline: string;
	social: SocialIcons;
	cover?: string;
}

export const config: Config = {
	name: 'Name',
	routes: [
		...routes.map((route) => ({
			name: route,
			path: `/${route.toLowerCase()}`
		})),
		{
			name: 'GitHub',
			path: 'https://www.github.com/PrabhuKiran8790'
		}
	],
	authors: [
		{
			name: 'Prabhu Kiran Konda',
			path: 'prabhukirankonda',
			website: 'https://prabhukirankonda.vercel.app',
			aliases: ['Prabhu'],
			bio: `
			An aspiring software developer from India. I specialize in Python, Machine Learning, and full stack development. I’m currently seeking software developer roles to further my career. In my free time, I enjoy writing technical blogs and sharing my journey with others. If you'd like to get in touch, feel free to reach out to me.`,
			tagline: 'I love training Machines.',
			social: {
				GitHub: {
					url: 'https://github.com/PrabhuKiran8790'
				},
				Twitter: {
					url: 'https://twitter.com/prabhukirankonda'
				},
				Linkedin: {
					url: 'https://www.linkedin.com/in/prabhukirankonda'
				},
				Mail: {
					url: 'mailto:prabhukiran426@gmail.com'
				}
			},
			cover:
				'https://images.pexels.com/photos/247671/pexels-photo-247671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
		},
		{
			name: 'Shayaan Hussain',
			path: 'shayaan-hussain',
			website: 'https://shayaanhussain.vercel.app',
			aliases: ['Shayaan'],
			bio: `
			As a highly motivated and dedicated programmer with exceptional programming skills, I have a strong passion for developing innovative software solutions. I possess a track record in coding efficient solutions and debugging complex software issues and am eager to learn new technologies to continually elevate my knowledge and skills. I am excited to contribute my fresh perspectives and creativity by taking on a challenging role and making valuable impact in developing groundbreaking solutions.
			`,
			tagline: "I've got 99 problems but coding ain't one.",
			social: {
				GitHub: {
					url: 'https://github.com/Shayaan-Hussain'
				},
				Twitter: {
					url: 'https://twitter.com/shayaanhussain'
				},
				Linkedin: {
					url: 'https://www.linkedin.com/in/shayaan-hussain'
				},
				Mail: {
					url: 'mailto:shayaan.hussain2001@gmail.com'
				}
			},
			cover:
				'https://images.pexels.com/photos/2397652/pexels-photo-2397652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
		},
		{
			name: 'Mohammed Raamizuddin',
			path: 'mohammed-raamizuddin',
			website: 'https://raamizuddin.vercel.app',
			aliases: ['Raamiz'],
			bio: `
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit debitis ex dolorum, dolor, quae odio quis id amet iste assumenda nihil ipsa vitae consectetur odit voluptates eligendi. Nulla, nobis officia?
			`,
			tagline: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
			social: {
				GitHub: {
					url: 'https://gitub.com/iiamraamiz'
				},
				Twitter: {
					url: 'https://twitter.com/iiamraamiz'
				},
				Linkedin: {
					url: 'https://www.linkedin.com/in/mohammed-raamizuddin'
				},
				Mail: {
					url: 'mailto:raamiz2510@gmail.com'
				}
			},
			cover:
				'https://images.pexels.com/photos/1312488/pexels-photo-1312488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
		}
	]
};

export function getNameFromPath(path: string) {
	const matchingRoute = config.routes.find((route) => route.path === path);
	return matchingRoute ? matchingRoute.name : null;
}

export function getAuthorDetailsFromAlias(alias: string) {
	const matchingAuthor = config.authors.find((author) => author.aliases.includes(alias));
	if (matchingAuthor) {
		Object.keys(matchingAuthor.social).forEach((key) => {
			matchingAuthor.social[key].icon = icons[key];
		});
	}
	return matchingAuthor || null;
}

export function getIconFromName(name: string) {
	return icons[name];
}

export const githubConfig = {
	username: 'PrabhuKiran8790',
	repo: 'codedojo',
	branch: 'main'
};
