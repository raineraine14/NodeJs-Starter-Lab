"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../database/models/products"));
class ProductService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const products = yield products_1.default.findAll();
            return products;
        });
        this.findById = (ProdID) => __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield products_1.default.findByPk(ProdID);
            return existingProduct;
        });
        this.save = (object) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!object && object.keys(object).lenght == 0) {
                    throw new Error('Must conatain atleast 1 property');
                }
                const product = yield products_1.default.create(Object.assign({}, object));
                return product;
            }
            catch (err) {
                throw err;
            }
        });
        this.update = (ProdID, object) => __awaiter(this, void 0, void 0, function* () {
            if (!object && Object.keys(object).length == 0) {
                throw new Error('Object to be updated must contain at least one property.');
            }
            let existingProduct = yield this.findById(ProdID);
            if (!existingProduct) {
                throw new Error('Product_not_found');
            }
            try {
                yield products_1.default.update(Object.assign({}, object), {
                    where: { ProdID },
                });
                existingProduct = yield this.findById(ProdID);
                return existingProduct;
            }
            catch (err) {
                throw err;
            }
        });
        this.deleteByPrimaryKey = (ProdID) => __awaiter(this, void 0, void 0, function* () {
            let existingProduct = yield this.findById(ProdID);
            if (!existingProduct) {
                throw new Error('Product_not_found');
            }
            try {
                yield existingProduct.destroy();
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getInstance() {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }
}
exports.default = ProductService;
