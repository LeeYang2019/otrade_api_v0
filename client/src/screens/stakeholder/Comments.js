import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listComments } from '../../actions/commentActions';
import CommentForm from '../../components/CommentForm';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Comments = ({ match }) => {
	const stakeholderId = match.params.id;

	const dispatch = useDispatch();

	const [stakeholderComments, setStakeholderComments] = useState([]);

	//get comments
	const commentList = useSelector((state) => state.commentList);
	const { loading, error, comments } = commentList;

	const commentUpdate = useSelector((state) => state.commentUpdate);
	const { success } = commentUpdate;

	console.log(comments);
	console.log(success);

	useEffect(() => {
		if (success) {
			dispatch(listComments(stakeholderId));
		} else {
			dispatch(listComments(stakeholderId));
			setStakeholderComments(comments);
		}
	}, []);

	//dispatch, comments, stakeholderId, success

	return loading ? (
		<Loader />
	) : error ? (
		<Message>{error}</Message>
	) : (
		<Container className="my-5 px-4">
			<Row>
				<CommentForm stakeholderId={stakeholderId} />
			</Row>
			<Row className="mt-5">
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
											<Col>
												{/* <p>
														<strong>Status: </strong>
														{user.status === 'active' ? (
															<strong>
																<em className="text-success">{user.status}</em>
															</strong>
														) : (
															<strong>
																<em className="text-danger">{user.status}</em>
															</strong>
														)}
													</p> */}
											</Col>
										</Row>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default Comments;
