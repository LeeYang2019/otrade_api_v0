import Dashboard from '../../components/Dashboard';
import ListOrganizations from '../organization/ListOrganizations';
import ListStakeholders from './../stakeholder/StakeholdersList';
import ActivitiesList from '../activity/ActivitiesList';
import EditProjectPhoto from '../project/EditProjectPhoto';
import ProjectDetailsScreen from '../project/ProjectDetailsScreen';

export const btnlinks = [
	{
		link: '/photo',
		class: 'btn btn-primary',
		icon: 'fas fa-edit',
		type: 'Photo',
	},
];

export const navbarlinks = [
	{
		link: '/stakeholders',
		type: 'Stakeholders',
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
	// {
	// 	path: '',
	// 	component: ({ match }) => <Dashboard match={match} />,
	// },
	{
		path: '',
		component: ({ match }) => <ProjectDetailsScreen match={match} />,
	},
	{
		path: '/activities',
		component: ({ match }) => <ActivitiesList match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <ListOrganizations match={match} />,
	},
	{
		path: '/stakeholders',
		component: ({ match }) => <ListStakeholders match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <EditProjectPhoto match={match} />,
	},
];
