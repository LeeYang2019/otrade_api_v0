import React, { memo, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
	listStakeholders,
	deleteStakeholder,
} from '../../actions/stakeholderActions';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';
import Stakeholder from '../../components/Stakeholder';

const StakeholdersList = memo(({ match, keyword = '' }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	console.log(url);

	//get stakeholders
	const dispatch = useDispatch();
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { loading, error, filtered, stakeholders } = stakeholderList;

	const stakeholderDelete = useSelector((state) => state.stakeholderDelete);
	const { success } = stakeholderDelete;

	//use state
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			dispatch(listStakeholders(projectId, keyword));
			setMessage('Stakeholder was successfully deleted.');
		} else {
			dispatch(listStakeholders(projectId, keyword));
		}
	}, [dispatch, keyword, projectId, success, message]);

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteStakeholder(id));
		}
	};

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{message && <Message>{message}</Message>}
					{!filtered && stakeholders && stakeholders.length === 0 ? (
						<Empty
							itemLink={'/addStakeholder'}
							url={url}
							type={'Register Stakeholder'}
							group={'stakeholders'}
						/>
					) : (
						<Row className="align-items-center">
							<Col md={8} className="d-flex justify-content-end ml-2 mr-3">
								<FilterBox searchWord={'Stakeholders'} />
							</Col>
							<Col>
								<Link
									to={`${url}/addStakeholder`}
									className="btn btn-primary ml-2 mb-3"
								>
									<i className="fas fa-plus"></i> Register
								</Link>
							</Col>
						</Row>
					)}
					<TableHelper>
						{filtered
							? filtered.map((person) => (
									<tr key={person._id}>
										<td>
											<Stakeholder
												entity={person}
												deleteHandler={deleteHandler}
											/>
										</td>
									</tr>
							  ))
							: stakeholders &&
							  stakeholders.map((person) => (
									<tr key={person._id}>
										<td>
											<Stakeholder
												entity={person}
												deleteHandler={deleteHandler}
											/>
										</td>
									</tr>
							  ))}
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
});

export default StakeholdersList;
