const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//import Organization model
const Organization = require('../model/Organization');

// @desc    GET all organizations by project
// @route   GET /api/v1/projects/projectId/organizations
// @access  Private
exports.getOrganizations = asyncHandler(async (req, res, next) => {
	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {};

	const organizations = await Organization.find({
		project: req.params.projectId,
		...keyword,
	});

	if (!organizations) {
		res.status(401);
		throw new Error('No resources found');
	}

	res.status(200).json({ success: true, data: organizations });
});

// @desc    GET all organizations by stakeholderId
// @route   GET /api/v1/stakeholders/stakeholderId/organizations
// @access  Private
exports.getStakeholderOrganizations = asyncHandler(async (req, res, next) => {
	console.log('code entered here');
	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {};

	const organizations = await Organization.find({
		stakeholder: req.params.projectId,
		...keyword,
	});

	if (!organizations) {
		res.status(401);
		throw new Error('No resources found');
	}

	res.status(200).json({ success: true, data: organizations });
});

// @desc    GET an organization
// @route   GET /api/v1/organizations/:id
// @access  Public
exports.getOrganization = asyncHandler(async (req, res, next) => {
	const organization = await Organization.findById(req.params.id);
	res.status(200).json({ success: true, data: organization });
});

// @desc    Add an organization
// @route   POST /api/v1/projects/:projectId/organizations
// @access  Private
exports.addOrganization = asyncHandler(async (req, res, next) => {
	//get project and autthorized user
	req.body.project = req.params.projectId;
	req.body.user = req.user.id;

	console.log(req.body);

	// we use Joi... Hapi-joi
	// for input adapter
	/*
		let schemaV1 = Joi.Object.keys({
			name: Joi.String().min().max().required(),
			owner: Joi.String().min().max().required(),
			startDate: Joi.String().min().max().required()
		})

		let schemaV2 = Joi.Object.keys({
			firstName: Joi.String().min().max().required(),
			owner: Joi.String().min().max().required(),
			startDate: Joi.String().min().max().required(),
			location: Joi.String().min().max().optional()
		})

		let schema = undefined;
		if(req.body.apiVersion === "v1") schema = schemaV1;
		else schema = schemaV2;

		let result = await Joi.validate(req.body, schema);
		if(result.error) {
			res.status(400).send(result.error);
		}
	 */

	const organization = await Organization.create(req.body);
	res.status(200).json({ success: true, data: organization });
});

// @desc    Update an organization
// @route   PUT /api/v1/organizations/:id
// @access  Private
exports.updateOrganization = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;

	let organization = await Organization.findById(req.params.id);
	organization = await Organization.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: organization });
});

// @desc    Delete an organization
// @route   DELETE /api/v1/organizations/:id
// @access  Private
exports.deleteOrganization = asyncHandler(async (req, res, next) => {
	await Organization.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true });
});
