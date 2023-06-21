import express, {
    Request,
    response,
    RequestHandler,
    Response,
    NextFunction,
} from 'express';
import EmployeesService from '../services/employeesService';

const router = express.Router();

router.get('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const employees = await EmployeesService.getInstance().findAll();
        resp.status(200).json(employees);
    } catch (err) {
        next(err);
    }
});

router.get(
    '/:EmpID',
    async (req: Request, resp: Response, next: NextFunction) => {
        try {
            const existingEmployee =
                await EmployeesService.getInstance().findById(req.params.EmpID);
            if (existingEmployee) {
                resp.status(200).json(existingEmployee);
            } else {
                resp.status(400).json({
                    message: `not found ${req.params.EmpID}`,
                });
            }
        } catch (err) {
            next(err);
        }
    }
);

router.post('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const payload = { ...req.body };
        const newEmployee = await EmployeesService.getInstance().save(payload);
        resp.status(200).json({ ...newEmployee.dataValues });
    } catch (err) {
        next(err);
    }
});

router.put('/:EmpID', async (req, res, next) => {
    try {
        const EmpID = req.params.EmpID;
        const data = await EmployeesService.getInstance().update(EmpID, {
            ...req.body,
        });

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

router.delete('/:EmpID', async (req, res, next) => {
    try {
        const EmpID = req.params.EmpID;
        await EmployeesService.getInstance().deleteByPrimaryKey(EmpID);

        res.status(200).json({
            message: `department_successfully_deleted: ${EmpID}`,
        });
    } catch (err) {
        next(err);
    }
});

export default router;
