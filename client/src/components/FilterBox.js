import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
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
import {
	filterProjectActivities,
	clearProjectActivitiesFilter,
	filterStakeholderActivities,
	clearStakeholderActivitiesFilter,
} from '../actions/activityActions';

const FilterBox = ({ searchWord }) => {
	// define state
	const [keyword, setKeyword] = useState('');

	// dispatch
	const dispatch = useDispatch();

	// return filter method corresponding to
	// project, stakeholder, organizations, or activities
	const filterSearch = (keyword, searchWord) => {
		switch (searchWord) {
			case 'Projects':
				return dispatch(filterProjects(keyword));
			case 'Stakeholders':
				return dispatch(filterProjectStakeholders(keyword));
			case 'Organizations':
				return dispatch(filterProjectOrganizations(keyword));
			case 'StakeholderOrganizations':
				return dispatch(filterStakeholderOrganizations(keyword));
			case 'Activities':
				return dispatch(filterProjectActivities(keyword));
			case 'StakeholderActivities':
				return dispatch(filterStakeholderActivities(keyword));
			default:
		}
	};

	// return clear filter method corresponding to
	// project, stakeholder, organizations, or activities
	const clearFilter = (searchWord) => {
		switch (searchWord) {
			case 'Projects':
				return dispatch(clearProjectsFilter());
			case 'Stakeholders':
				return dispatch(clearProjectStakeholdersFilter());
			case 'Organizations':
				return dispatch(clearProjectOrganizationsFilter());
			case 'StakeholderOrganizations':
				return dispatch(clearStakeholderOrganizationsFilter());
			case 'Activities':
				return dispatch(clearProjectActivitiesFilter());
			case 'StakeholderActivities':
				return dispatch(clearStakeholderActivitiesFilter());
			default:
		}
	};

	//onChange eventlistener
	const onChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value);

		//if length is not 0, filter
		if (keyword.length !== 0) {
			//call filterSearch method
			filterSearch(keyword, searchWord);
		} else {
			//call clear filter
			clearFilter(searchWord);
		}
	};

	return (
		<Form className="filter-form">
			<Form.Control
				type="text"
				onChange={onChange}
				placeholder={`Filter ${searchWord}...`}
			></Form.Control>
		</Form>
	);
};

export default FilterBox;
