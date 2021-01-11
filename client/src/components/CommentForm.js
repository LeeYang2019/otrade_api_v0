import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { addComment } from '../actions/commentActions';
import { useDispatch, useSelector } from 'react-redux';

const CommentForm = ({ stakeholderId }) => {
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(comment);
		dispatch(addComment({ comment }, stakeholderId));
		setComment('');
	};

	return (
		<Container>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="comment">
					<Form.Label>Summary</Form.Label>
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
	);
};

export default CommentForm;
