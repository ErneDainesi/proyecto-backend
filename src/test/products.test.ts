import supertest from 'supertest';
import {expect} from 'chai';
import 'mocha';

const request = supertest('localhost:8080');
const productId = "61b640ed264e18ed4f312178";

describe('Test GET', () => {
    const product = {
        _id: "61b640ed264e18ed4f312178",
        name: "pera",
        description: "es una fruta",
        stock: 20,
        price: 200
    };
	it('Should return status 200', async () => {
		const response = await request.get(`/products/${productId}`);
		expect(response.status).to.eql(200);
	});

	it('Should return product', async () => {
		const response = await request.get(`/products/${productId}`);
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
		};
		const response = await request.post('/products/1').send(product);
		expect(response.status).to.eql(302);
	});
});

describe('Test PUT', () => {
	const product = {
        _id: productId,
        name: "pera",
        description: "es una fruta",
        stock: 20,
        price: 333
    };

	it('Should return status 200', async () => {
		const userId = '1';
		const response = await request.put(`/products/${userId}/${productId}`).send(product);
		expect(response.status).to.eql(200);
	});

	it('GET should return updated product', async () => {
		const response = await request.get(`/products/${productId}`);
		expect(response.body).to.eql(product);
	});
});

describe('Test DELETE', () => {
	it('Should return status 200', async () => {
        const userId = 1;
		const response = await request.delete(`/products/${userId}/${productId}`);
		expect(response.status).to.eql(200);
	});

	it('GET should return status 500 after DELETE', async () => {
		const response = await request.get(`/products/${productId}`);
		expect(response.status).to.eql(404);
	});
});

