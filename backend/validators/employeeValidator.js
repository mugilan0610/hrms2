const Joi = require('joi');

const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(), // Marking as optional to not break frontend
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).optional(), // optional since it's only required on create
  role: Joi.string().valid('Admin', 'Manager', 'HR', 'Developer', 'Designer', 'Analyst', 'Intern', 'Employee').optional(),
  organisationId: Joi.number().optional()
}).unknown(true); // Allow other properties like teamId

module.exports = { employeeSchema };
