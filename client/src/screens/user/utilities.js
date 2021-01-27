import EditUser from '../user/EditUser';
import EditUserPhoto from '../user/EditUserPhoto';
import UserProjects from '../project/UserProjects';
import Dashboard from '../../components/Dashboard';

export const btnlinks = [
	{
		link: '/profile-photo',
		class: 'btn btn-primary mr-3',
		icon: 'fas fa-edit',
		type: 'Photo',
	},
	{
		link: '/profile',
		class: 'btn btn-primary',
		icon: 'fas fa-edit',
		type: 'Profile',
	},
];

export const navbarlinks = [
	{
		link: '/projects',
		type: 'Projects',
	},
];

export const routes = [
	// {
	// 	path: '',
	// 	component: ({ match }) => <Dashboard match={match} />,
	// },
	{
		path: '',
		component: ({ match }) => <UserProjects match={match} />,
	},
	{
		path: '/projects',
		component: ({ match }) => <UserProjects match={match} />,
	},
	{
		path: '/profile',
		component: ({ match }) => <EditUser match={match} />,
	},
	{
		path: '/profile-photo',
		component: ({ match }) => <EditUserPhoto match={match} />,
	},
];
