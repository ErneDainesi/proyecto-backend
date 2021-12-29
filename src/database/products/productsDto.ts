import {IProduct} from "./products.schema";

export class ProductsDto {
	static updateProduct(product: IProduct, newProduct: any) {
		return newProduct;
	}
}
