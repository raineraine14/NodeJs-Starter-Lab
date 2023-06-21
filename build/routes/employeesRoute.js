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
const employeesService_1 = __importDefault(require("../services/employeesService"));
const router = express_1.default.Router();
router.get('/', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employeesService_1.default.getInstance().findAll();
        resp.status(200).json(employees);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:EmpID', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingEmployee = yield employeesService_1.default.getInstance().findById(req.params.EmpID);
        if (existingEmployee) {
            resp.status(200).json(existingEmployee);
        }
        else {
            resp.status(400).json({
                message: `not found ${req.params.EmpID}`,
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
        const newEmployee = yield employeesService_1.default.getInstance().save(payload);
        resp.status(200).json(Object.assign({}, newEmployee.dataValues));
    }
    catch (err) {
        next(err);
    }
}));
router.put('/:EmpID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const EmpID = req.params.EmpID;
        const data = yield employeesService_1.default.getInstance().update(EmpID, Object.assign({}, req.body));
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/:EmpID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const EmpID = req.params.EmpID;
        yield employeesService_1.default.getInstance().deleteByPrimaryKey(EmpID);
        res.status(200).json({
            message: `department_successfully_deleted: ${EmpID}`,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
