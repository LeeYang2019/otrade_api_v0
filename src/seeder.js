const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// load environment variables
dotenv.config();

// load models
const Project = require('./model/Project');
const User = require('./model/User');
const Organization = require('./model/Organization');
const Stakeholder = require('./model/Stakeholder');

// connect to db
connectDB();

// read json files
const users = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const activities = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/activities.json`, 'utf-8')
);

const projects = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/projects.json`, 'utf-8')
);

const organizations = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/organizations.json`, 'utf-8')
);

// import data into db
const importData = async () => {
	try {
		await Project.create(projects);
		await User.create(users);
		await Organization.create(organizations);
		console.log('Data imported...'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(error.message);
	}
};

// delete date from db
const deleteData = async () => {
	try {
		await Project.deleteMany();
		await User.deleteMany();
		await Organization.deleteMany();
		//await Stakeholder.deleteMany();
		console.log('Data deleted...'.red.inverse);
		process.exit();
	} catch (error) {
		console.error(error.message);
	}
};

// check for args
if (process.argv[2] === '-i') {
	//import data
	importData();
} else if (process.argv[2] === '-d') {
	//delete data
	deleteData();
}
