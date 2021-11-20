"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cart_controller_1 = require("../controllers/cart.controller");
var router = express_1.default.Router();
router.get('/', cart_controller_1.creatNewCart);
router.get('/:idCart/:idProduct', cart_controller_1.getProduct);
router.post('/:idCart/:idProduct', cart_controller_1.saveProduct);
router.delete('/:idCart/:idProduct', cart_controller_1.deleteProduct);
exports.default = router;
