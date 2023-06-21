import express, { Express } from 'express';
import cors from 'cors';
import * as routes from './routes';
import simpleMiddleware from './middleware/simplemiddleware';
import logger from './logging/logger';
import morganMiddleWare from './middleware/morganMiddleWare';

class server {
    private app: Express;

    constructor(app: Express) {
        if (!app) {
            throw new Error('Express instance is undefined.');
        }
        this.app = app;
        this.app.set('trust proxy', true);

        //middlewares
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        //this.app.use(simpleMiddleware);
        this.app.use(morganMiddleWare.config);
    }

    errorHandler() {
        this.app.use(this.errorHandler);
        return this;
    }

    routes() {
        this.app.use('/__gtg', routes.gtgRouter);
        this.app.use('/employees', routes.employeesRoute);
        this.app.use('/products', routes.productRoutes);
        this.app.use('/queryHandling', routes.queryHandlingRoute)
        return this;
    }

    start(port: string) {
        this.app.listen(port, () => {
            logger.info(`[server]: Server is running at port ${port}`);
        });
    }
}

const createServer = (app: Express) => new server(app);

export default createServer;
