"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const people = [
    { id: 1, name: 'Clark Kent', age: 35 },
    { id: 2, name: 'Peter Parker', age: 21 },
    { id: 3, name: 'Juan Cruz', age: 28 },
];
// /persons
router.get('/', (req, resp) => {
    resp.status(200).json(people);
});
// /persons/100
router.get('/:id', (req, resp) => {
    const personId = parseInt(req.params.id);
    const person = people.find((p) => p.id === personId);
    if (person) {
        resp.status(200).json(person);
    }
    else {
        resp.status(404).json({ message: `person not found ${personId}` });
    }
});
// /persons
router.post('/', (req, resp) => {
    // request body
    const payload = Object.assign({}, req.body);
    resp.status(201).json(Object.assign(Object.assign({}, payload), { status: 'created' }));
});
exports.default = router;
