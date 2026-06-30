const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yaml'));

const swaggerServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(swaggerDocument);

module.exports = {
  swaggerServe,
  swaggerSetup,
};
