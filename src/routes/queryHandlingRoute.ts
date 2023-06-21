import express, {
    Request,
    response,
    RequestHandler,
    Response,
    NextFunction,
} from 'express';
import QueryHandlingService from '../services/queryHandlingService';

const router = express.Router();

router.get('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const queryHandling = await QueryHandlingService.getInstance().findAll();
        resp.status(200).json(queryHandling);
    } catch (err) {
        next(err);
    }
});

router.get(
    '/:QID',
    async (req: Request, resp: Response, next: NextFunction) => {
        try {
            const existingQueryHandling = await QueryHandlingService.getInstance().findById(
                req.params.QID
            );
            if (existingQueryHandling) {
                resp.status(200).json(existingQueryHandling);
            } else {
                resp.status(400).json({
                    message: `not found ${req.params.QID}`,
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
        const newQueryHandling = await QueryHandlingService.getInstance().save(payload);
        resp.status(200).json({ ...newQueryHandling.dataValues });
    } catch (err) {
        next(err);
    }
});

router.put('/:QID', async (req, res, next) => {
    try {
        const QID = req.params.QID;
        const data = await QueryHandlingService.getInstance().update(QID, {
            ...req.body,
        });

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

router.delete('/:QID', async (req, res, next) => {
    try {
        const QID = req.params.QID;
        await QueryHandlingService.getInstance().deleteByPrimaryKey(QID);

        res.status(200).json({
            message: `Query Handling Deleted: ${QID}`,
        });
    } catch (err) {
        next(err);
    }
});

export default router;