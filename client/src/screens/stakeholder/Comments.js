import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listComments } from '../../actions/commentActions';
import CommentForm from '../../components/CommentForm';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import BorderContainer from '../../components/BorderContainer';

const Comments = ({ match }) => {
	const stakeholderId = match.params.id;
	const [stakeholderComments, setStakeholderComments] = useState([]);

	const dispatch = useDispatch();
	const commentList = useSelector((state) => state.commentList);
	const { loading, error, comments } = commentList;

	const commentUpdate = useSelector((state) => state.commentUpdate);
	const { success } = commentUpdate;

	useEffect(() => {
		if (success) {
			dispatch(listComments(stakeholderId));
		} else {
			dispatch(listComments(stakeholderId));
			setStakeholderComments(comments);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<BorderContainer title={'Comments'}>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Row>
						<CommentForm stakeholderId={stakeholderId} />
					</Row>
					<Table responsive className="table-sm mt-3 ml-3 mr-3">
						<tbody>
							{stakeholderComments &&
								stakeholderComments.map((entry) => (
									<tr key={entry._id}>
										<td>
											<Row>
												<Col md={9}>
													<p>
														<strong>{entry.comment}</strong>
													</p>
												</Col>
											</Row>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</>
			)}
		</BorderContainer>
	);
};

export default Comments;
