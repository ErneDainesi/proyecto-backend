"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var Cart = /** @class */ (function () {
    function Cart(id, timeStamp, products) {
        if (products === void 0) { products = []; }
        this.id = id;
        this.timeStamp = timeStamp;
        this.products = products;
    }
    Cart.prototype.cartId = function () {
        return this.id;
    };
    Cart.prototype.cartTimeStamp = function () {
        return this.timeStamp;
    };
    Cart.prototype.cartProducts = function () {
        return this.products;
    };
    Cart.prototype.addToCart = function (product) {
        this.products.push(product);
    };
    Cart.prototype.removeFromCart = function (productId) {
        return this.products.splice(productId - 1, 1)[0];
    };
    Cart.prototype.getProduct = function (productId) {
        return this.products[productId - 1];
    };
    return Cart;
}());
exports.Cart = Cart;
