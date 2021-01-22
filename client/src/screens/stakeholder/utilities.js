import Comments from '../stakeholder/Comments';
import EditStakeholderScreen from './EditStakeholderScreen';
import EditStakeholderPhoto from './EditStakeholderPhoto';
import ListStakeholderOrganizations from '../organization/ListStakeholderOrganizations';
import ListStakeholderActivities from '../activity/ListStakeholderActivities';
import Dashboard from '../../components/Dashboard';

export const btnlinks = [
	{
		link: '/photo',
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
		link: '/comments',
		type: 'Notes',
	},
	{
		link: '/organizations',
		type: 'Organizations',
	},
	{
		link: '/activities',
		type: 'Activities',
	},
];

export const routes = [
	{
		path: '',
		component: ({ match }) => <Dashboard match={match} />,
	},
	{
		path: '/profile',
		component: ({ match }) => <EditStakeholderScreen match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <EditStakeholderPhoto match={match} />,
	},
	{
		path: '/comments',
		component: ({ match }) => <Comments match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <ListStakeholderOrganizations match={match} />,
	},
	{
		path: '/activities',
		component: ({ match }) => <ListStakeholderActivities match={match} />,
	},
];
