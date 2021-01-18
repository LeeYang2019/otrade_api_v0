import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useStep } from 'react-hooks-helper';

//import activity
import AddActivityScreen from './AddActivityScreen';
import AddActivityScreenTwo from './AddActivityScreenTwo';
import AddActivityScreenThree from './AddActivityScreenThree';

const steps = [{ id: 'Step1' }, { id: 'Step2' }, { id: 'Step3' }];

const ActivityForm = ({ history, match }) => {
	const { url } = useRouteMatch();
	const { step, navigation } = useStep({ initialStep: 0, steps });
	const { id } = step;

	//define props to pass
	const props = { navigation, history, match, url };

	switch (id) {
		case 'Step1':
			return <AddActivityScreen {...props} />;
		case 'Step2':
			return <AddActivityScreenTwo {...props} />;
		case 'Step3':
			return <AddActivityScreenThree {...props} />;
		default:
			return null;
	}
};

export default ActivityForm;
