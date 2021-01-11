import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const CommentForm = () => {
	const [comment, setComment] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		//addComment(comment)
		setComment('');
	};

	return (
		<div>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="comment">
					<Form.Label>Comments</Form.Label>
					<Form.Control
						as="textarea"
						rows="6"
						value="comment"
						onChange={(e) => setComment(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default CommentForm;
