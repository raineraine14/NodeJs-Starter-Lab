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
const express_1 = __importDefault(require("express"));
const queryHandlingService_1 = __importDefault(require("../services/queryHandlingService"));
const router = express_1.default.Router();
router.get('/', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryHandling = yield queryHandlingService_1.default.getInstance().findAll();
        resp.status(200).json(queryHandling);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:QID', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingQueryHandling = yield queryHandlingService_1.default.getInstance().findById(req.params.QID);
        if (existingQueryHandling) {
            resp.status(200).json(existingQueryHandling);
        }
        else {
            resp.status(400).json({
                message: `not found ${req.params.QID}`,
            });
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post('/', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign({}, req.body);
        const newQueryHandling = yield queryHandlingService_1.default.getInstance().save(payload);
        resp.status(200).json(Object.assign({}, newQueryHandling.dataValues));
    }
    catch (err) {
        next(err);
    }
}));
router.put('/:QID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const QID = req.params.QID;
        const data = yield queryHandlingService_1.default.getInstance().update(QID, Object.assign({}, req.body));
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/:QID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const QID = req.params.QID;
        yield queryHandlingService_1.default.getInstance().deleteByPrimaryKey(QID);
        res.status(200).json({
            message: `Query Handling Deleted: ${QID}`,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
