import { Model, Sequelize, DataTypes } from 'sequelize';
import { ProductAttributes } from '../attributes';

class Products extends Model implements ProductAttributes {
    ProdID!: string;
    ProdName!: string;
    Base_Cost!: number;

    static initModel(sequelize: Sequelize): void {
        Products.init(
            {
                ProdID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    autoIncrement: false,
                },
                ProdName: {
                    type: DataTypes.STRING,
                },
                Base_Cost: {
                    type: DataTypes.NUMBER,
                },
            },
            {
                sequelize,
                underscored: false,
                tableName: 'Product',
                timestamps: false,
            }
        );
    }
}

export default Products;
