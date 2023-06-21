import express, {
    Request,
    response,
    RequestHandler,
    Response,
    NextFunction,
} from 'express';
import ProductService from '../services/productService';

const router = express.Router();

router.get('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const products = await ProductService.getInstance().findAll();
        resp.status(200).json(products);
    } catch (err) {
        next(err);
    }
});

router.get(
    '/:ProdID',
    async (req: Request, resp: Response, next: NextFunction) => {
        try {
            const existingProduct = await ProductService.getInstance().findById(
                req.params.ProdID
            );
            if (existingProduct) {
                resp.status(200).json(existingProduct);
            } else {
                resp.status(400).json({
                    message: `not found ${req.params.ProdID}`,
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
        const newProduct = await ProductService.getInstance().save(payload);
        resp.status(200).json({ ...newProduct.dataValues });
    } catch (err) {
        next(err);
    }
});

router.put('/:ProdID', async (req, res, next) => {
    try {
        const ProdID = req.params.ProdID;
        const data = await ProductService.getInstance().update(ProdID, {
            ...req.body,
        });

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

router.delete('/:ProdID', async (req, res, next) => {
    try {
        const ProdID = req.params.ProdID;
        await ProductService.getInstance().deleteByPrimaryKey(ProdID);

        res.status(200).json({
            message: `department_successfully_deleted: ${ProdID}`,
        });
    } catch (err) {
        next(err);
    }
});

export default router;
