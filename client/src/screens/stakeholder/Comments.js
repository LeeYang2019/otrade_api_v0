import React, { useEffect } from 'react';
import { Table, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listComments } from '../../actions/commentActions';
import CommentForm from '../../components/CommentForm';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Comments = ({ stakeholderId }) => {
	const dispatch = useDispatch();

	//get comments
	const commentList = useSelector((state) => state.commentList);
	const { loading, error, comments } = commentList;

	useEffect(() => {
		dispatch(listComments(stakeholderId));
	}, [stakeholderId, listComments]);

	//dispatch, stakeholderId, commentList

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
						{comments &&
							comments.map((entry) => (
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
