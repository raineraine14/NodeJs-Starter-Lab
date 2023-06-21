import { db } from '../database/models';
import Products from '../database/models/products';

class ProductService {
    private static instance: ProductService;

    static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    findAll = async () => {
        const products: Products[] = await Products.findAll();
        return products;
    };

    findById = async (ProdID: string) => {
        const existingProduct: Products | null = await Products.findByPk(
            ProdID
        );
        return existingProduct;
    };

    save = async (object: any) => {
        try {
            if (!object && object.keys(object).lenght == 0) {
                throw new Error('Must conatain atleast 1 property');
            }
            const product = await Products.create({ ...object });
            return product;
        } catch (err) {
            throw err;
        }
    };

    update = async (ProdID: string, object: any) => {
        if (!object && Object.keys(object).length == 0) {
            throw new Error(
                'Object to be updated must contain at least one property.'
            );
        }

        let existingProduct = await this.findById(ProdID);
        if (!existingProduct) {
            throw new Error('Product_not_found');
        }

        try {
            await Products.update(
                { ...object },
                {
                    where: { ProdID },
                }
            );

            existingProduct = await this.findById(ProdID);
            return existingProduct;
        } catch (err) {
            throw err;
        }
    };

    deleteByPrimaryKey = async (ProdID: string) => {
        let existingProduct = await this.findById(ProdID);
        if (!existingProduct) {
            throw new Error('Product_not_found');
        }

        try {
            await existingProduct.destroy();
        } catch (err) {
            throw err;
        }
    };
}

export default ProductService;
