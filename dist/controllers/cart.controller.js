"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.saveProduct = exports.getProduct = exports.creatNewCart = void 0;
var Cart_1 = require("../lib/Cart");
var utilities_1 = require("../lib/utilities");
var carts = [];
var FILE_NAME = "./carts.json";
var creatNewCart = function (req, res) {
    var cart = new Cart_1.Cart(carts.length + 1, Date.now());
    carts.push(cart);
    res.send('<h1>Cart</h1>');
};
exports.creatNewCart = creatNewCart;
var getProduct = function (req, res) {
    var idProduct = req.params.idProduct ? +req.params.idProduct : false;
    var idCart = +req.params.idCart;
    var selectedCart = carts[idCart - 1];
    if (idProduct) {
        res.send(selectedCart.getProduct(idProduct));
    }
    else {
        res.send(selectedCart.cartProducts());
    }
};
exports.getProduct = getProduct;
var saveProduct = function (req, res) {
    var product = __assign(__assign({}, req.body), { id: +req.params.idProduct, timeStamp: Date.now() });
    var cart = carts[+req.params.idCart - 1];
    cart.addToCart(product);
    (0, utilities_1.overwriteFile)(FILE_NAME, carts);
    res.json(product);
};
exports.saveProduct = saveProduct;
var deleteProduct = function (req, res) {
    var productId = +req.params.idProduct;
    var cart = carts[+req.params.idCart - 1];
    var deletedProduct = cart.removeFromCart(productId);
    (0, utilities_1.overwriteFile)(FILE_NAME, carts);
    res.send(deletedProduct);
};
exports.deleteProduct = deleteProduct;
