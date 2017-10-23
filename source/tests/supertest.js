const app = require('../index');
const request = require('supertest');

describe('app', () => {
	it('response hello', (done) => {
		request(app)
			.get('/cards/')
			.expect(200,done)
	});
});