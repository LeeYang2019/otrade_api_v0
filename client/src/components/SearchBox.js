import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({
	history,
	searchWord,
	searchQueryPath,
	searchQueryEmpty,
}) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`${searchQueryPath}${keyword}`);
		} else {
			history.push(searchQueryEmpty);
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder={`Search ${searchWord}...`}
				className="mr-md-2 ml-md-5 w-50"
			></Form.Control>
			<Button type="submit" variant="outline-primary" className="pl-3 pr-3">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
