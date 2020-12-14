import React from 'react';

const EditUserProfileScreen = () => {
	return (
		<div>
			<Row>
				<Col md={3}>
					<h2>User Profile</h2>
					{/* {message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Updated</Message>}
				{loading && <Loader />} */}
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="confirmPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				</Col>
				<Col md={9}>
					<h2>My Orders</h2>
					{loadingOrders ? (
						<Loader />
					) : error ? (
						<Message variant="danger">{errorOrders}</Message>
					) : (
						<Table striped bordered hover responsive className="table-sm">
							<thead>
								<tr>
									<th>ID</th>
									<th>Date</th>
									<th>Total</th>
									<th>Paid</th>
									<th>Delivered</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>{order.totalPrice}</td>
										<td>
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												order.deliveredAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											<LinkContainer to={`/order/${order._id}`}>
												<Button className="btn-sm" variant="light">
													Details
												</Button>
											</LinkContainer>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default EditUserProfileScreen;
