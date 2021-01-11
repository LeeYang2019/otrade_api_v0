const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error');

//route files
const projects = require('./routes/projects');
const users = require('./routes/users');
const stakeholders = require('./routes/stakeholders');
const organizations = require('./routes/organization');
const activities = require('./routes/activities');
const commitments = require('./routes/commitments');
const comments = require('./routes/comments');

//load env vars
dotenv.config();

//connect to db
connectDB();

const app = express();

//Body parser
app.use(express.json());

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/projects', projects);
app.use('/api/v1/stakeholders', stakeholders);
app.use('/api/v1/organizations', organizations);
app.use('/api/v1/activities', activities);
app.use('/api/v1/commitments', commitments);
app.use('/api/v1/comments', comments);

app.use(notFound, errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Listening in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
