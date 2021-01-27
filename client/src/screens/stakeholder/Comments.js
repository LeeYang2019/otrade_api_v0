import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, listComments } from '../../actions/commentActions';
import { COMMENT_ADD_RESET } from '../../constants/commentConstants';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import BorderContainer from '../../components/BorderContainer';

const Comments = ({ match }) => {
	const stakeholderId = match.params.id;
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();
	const commentAdd = useSelector((state) => state.commentAdd);
	const { success } = commentAdd;

	const commentList = useSelector((state) => state.commentList);
	const { loading, error, comments } = commentList;

	useEffect(() => {
		//if success re-render list
		if (success) {
			dispatch(listComments(stakeholderId));
			dispatch({ type: COMMENT_ADD_RESET });
		} else {
			dispatch(listComments(stakeholderId));
		}
	}, [dispatch, stakeholderId, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(addComment({ comment }, stakeholderId));
		setComment('');
	};

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Container className="mb-3">
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="comment">
								<Form.Control
									as="textarea"
									rows="4"
									value={comment}
									placeholder="create a post"
									onChange={(e) => setComment(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Button type="submit" variant="primary">
								Submit
							</Button>
						</Form>
					</Container>

					{comments &&
						comments.map((entry) => (
							<div className="comment-container">
								<div className="comment-header">
									<div>
										<img
											src={entry.user.image}
											alt="user"
											className="comment-image mr-2"
										/>
									</div>
									<div>
										<strong>
											{entry.user.firstName} {entry.user.lastName}
										</strong>
										<br />
										<em>{entry.createdAt.substring(0, 10)}</em>
									</div>
								</div>
								<div className="comment">
									<strong>{entry.comment}</strong>
								</div>
							</div>
						))}
				</>
			)}
		</BorderContainer>
	);
};

export default Comments;
