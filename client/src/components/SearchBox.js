import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history, searchWord }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder={`Search ${searchWord}...`}
				className="mr-md-2 ml-md-5"
			></Form.Control>
			<Button type="submit" variant="outline-primary" className="pl-1 pr-1">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
