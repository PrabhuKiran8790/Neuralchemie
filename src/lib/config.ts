const routes = ['Blog', 'Tags', 'Authors'];

export const config = {
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
	]
};

export function getNameFromPath(path: string) {
	const matchingRoute = config.routes.find((route) => route.path === path);
	return matchingRoute ? matchingRoute.name : null;
}

export const githubConfig = {
	username: 'PrabhuKiran8790',
	repo: 'prabhukirankonda-portfolio',
	branch: 'main'
};
