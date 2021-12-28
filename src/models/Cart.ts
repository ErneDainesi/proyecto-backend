export class Cart {
	private id: number;
	private timeStamp: number;
	private products: object[];

	constructor(id: number, timeStamp: number, products: object[] = []) {
		this.id = id;
		this.timeStamp = timeStamp;
		this.products = products;
	}

	public cartId() {
		return this.id;
	}

	public cartTimeStamp() {
		return this.timeStamp;
	}

	public cartProducts() {
		return this.products;
	}

	public addToCart(product: object) {
		this.products.push(product);
	}

	public removeFromCart(productId: number) {
		return this.products.splice(productId - 1, 1)[0]
	}

	public getProduct(productId: number) {
		return this.products[productId - 1];
	}
}
