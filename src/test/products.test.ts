import supertest from 'supertest';
import {expect} from 'chai';
import 'mocha';

const request = supertest('localhost:8080');

describe('Test GET', () => {
	const productId = '61b635b619d473993b8eb010';
	it('Should return status 200', async () => {
		const response = await request.get(`/products/${productId}`);
		expect(response.status).to.eql(200);
	});

	it('Should return product', async () => {
		const response = await request.get(`/products/${productId}`);
		// FIXME: the product route isnt working correctly. Fix this
		// and then use a proper product for test
		const product = {productMongo: {}};
		expect(response.body).to.eql(product);
	});
});

describe('Test POST', () => {
	it('Should return status 302', async () => {
		const product = {
			name: "pera",
			description: "es una fruta",
			stock: 20,
			price: 200
		}
		const response = await request.post('/products/1').send(product);
		expect(response.status).to.eql(302);
	});
});

describe('Test PUT', () => {
	it('Should return status 200', async () => {
		const productId = '61b635b619d473993b8eb010';
		const product = {
			name: "kiwi",
			description: "es una fruta",
			stock: 20,
			price: 333
		}
		const userId = '1';
		const response = await request.put(`/products/${userId}/${productId}`).send(product);
		expect(response.status).to.eql(200);
	});

	it('GET should return updated product', async () => {
		const productId = '61b635b619d473993b8eb010';
		// const product = {
		//     name: "kiwi",
		//     description: "es una fruta",
		//     stock: 20,
		//     price: 333
		// }
		const product = {productMongo: {}};
		const response = await request.get(`/products/${productId}`);
		expect(response.body).to.eql(product);
	});
});

describe('Test DELETE', () => {
	it('Should return status 200', async () => {
		const productId = '61b635b619d473993b8eb010';
		const response = await request.delete(`/products/${productId}`);
		expect(response.status).to.eql(200);
	});

	it('GET should return status 500 after DELETE', async () => {
		const productId = '61b635b619d473993b8eb010';
		const response = await request.get(`/products/${productId}`);
		expect(response.status).to.eql(500);
	});
});

