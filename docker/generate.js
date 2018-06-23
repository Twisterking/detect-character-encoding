#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const dockerfileTemplate = require('dockerfile-template');

/* eslint-disable key-spacing */
const environments = [
	{os: 'ubuntu', osVersion: '18.04', nodeVersion: '10'},
	{os: 'ubuntu', osVersion: '18.04', nodeVersion:  '8'},
	{os: 'ubuntu', osVersion: '18.04', nodeVersion:  '6'},
	{os: 'ubuntu', osVersion: '16.04', nodeVersion: '10'},
	{os: 'ubuntu', osVersion: '16.04', nodeVersion:  '8'},
	{os: 'ubuntu', osVersion: '16.04', nodeVersion:  '6'},
	{os: 'ubuntu', osVersion: '14.04', nodeVersion: '10'},
	{os: 'ubuntu', osVersion: '14.04', nodeVersion:  '8'},
	{os: 'ubuntu', osVersion: '14.04', nodeVersion:  '6'}
];
/* eslint-enable key-spacing */

(async() => {
	const templates = {
		ubuntu: await fs.readFile(`${__dirname}/templates/ubuntu/Dockerfile`, 'utf8')
	};

	const promises = environments.map(environment => {
		const{os, osVersion, nodeVersion} = environment;
		const variables = {TAG: osVersion, NODE_VERSION: nodeVersion};

		const dockerfile = dockerfileTemplate.process(templates[os], variables);
		const dockerfilePath = `${__dirname}/${os}-${osVersion}/node-v${nodeVersion}/Dockerfile`;

		return fs.outputFile(dockerfilePath, dockerfile);
	});

	return Promise.all(promises);
})();
