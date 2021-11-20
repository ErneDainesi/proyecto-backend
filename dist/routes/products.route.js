"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validations_1 = require("../lib/validations");
var products_controller_1 = require("../controllers/products.controller");
var router = express_1.default.Router();
router.get('/', products_controller_1.getProductsPage);
router.get('/view', products_controller_1.getProductsView);
router.get('/:id', products_controller_1.getProduct);
router.post('/:userId', validations_1.checkIfIsAdmin, products_controller_1.saveProduct);
router.put('/:userId/:productId', validations_1.checkIfIsAdmin, products_controller_1.updateProduct);
router.delete('/:userId/:productId', validations_1.checkIfIsAdmin, products_controller_1.deleteProduct);
exports.default = router;
