import { filterProjects, clearProjectsFilter } from '../actions/projectActions';
import {
	filterProjectStakeholders,
	clearProjectStakeholdersFilter,
} from '../actions/stakeholderActions';
import {
	filterProjectOrganizations,
	filterStakeholderOrganizations,
	clearProjectOrganizationsFilter,
	clearStakeholderOrganizationsFilter,
} from '../actions/organizationAction';

import { useDispatch } from 'react-redux';

// const filterSearch = (keyword, searchWord) => {
// 	const dispatch = useDispatch();

// 	switch (searchWord) {
// 		case 'Projects':
// 			return dispatch(filterProjects(keyword));
// 		case 'Stakeholders':
// 			return dispatch(filterProjectStakeholders(keyword));
// 		case 'Organizations':
// 			return dispatch(filterProjectOrganizations(keyword));
// 		case 'Activities':
// 			return {};
// 		default:
// 	}
// };

// export const clearFilter = (searchWord) => {
// 	switch (searchWord) {
// 		case 'Projects':
// 			return dispatch(clearProjectsFilter());
// 		case 'Stakeholders':
// 			return dispatch(clearProjectStakeholdersFilter());
// 		case 'Organizations':
// 			return dispatch(clearProjectOrganizationsFilter());
// 		case 'Activities':
// 			return {};
// 		default:
// 	}
// };
