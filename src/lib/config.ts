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

export const githubConfig = {
	username: 'PrabhuKiran8790',
	repo: 'prabhukirankonda-portfolio',
	branch: 'main'
};
