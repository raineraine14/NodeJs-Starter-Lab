import express, { Request, Response } from 'express';

const router = express.Router();

const people = [
    { id: 1, name: 'Clark Kent', age: 35 },
    { id: 2, name: 'Peter Parker', age: 21 },
    { id: 3, name: 'Juan Cruz', age: 28 },
];

// /persons
router.get('/', (req: Request, resp: Response) => {
    resp.status(200).json(people);
});

// /persons/100
router.get('/:id', (req: Request, resp: Response) => {
    const personId = parseInt(req.params.id);
    const person = people.find((p) => p.id === personId);
    if (person) {
        resp.status(200).json(person);
    } else {
        resp.status(404).json({ message: `person not found ${personId}` });
    }
});

// /persons
router.post('/', (req: Request, resp: Response) => {
    // request body
    const payload = { ...req.body };
    resp.status(201).json({ ...payload, status: 'created' });
});

export default router;
