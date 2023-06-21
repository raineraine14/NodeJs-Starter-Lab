import { Model, Sequelize, DataTypes } from 'sequelize';
import { QueryHandlingAttributes } from '../attributes';
import Employees from './employees';

class QueryHandling extends Model implements QueryHandlingAttributes{
    QID!: string
    Sub_Date!: Date
    Cust_ID!: string
    EmpID!: string
    Res_Date!: Date
    Status!: string
    Feedback!: number
    Query_Text!: string
    Query_Response!: string

    static initModel(sequelize: Sequelize):void{
        QueryHandling.init({
            QID:{
                type: DataTypes.STRING,
                primaryKey: true,
            },
            Sub_Date:{
                type: DataTypes.DATE,
            },
            Cust_ID:{
                type: DataTypes.STRING,
                // references:{
                //     model:'CustomerTracking',
                //     key:'Cust_ID'
                // }
            },
            EmpID:{
                type: DataTypes.STRING,
                // references:{
                //     model: Employees,
                //     key: 'EmpID'
                // }
            },
            Res_Date:{
                type: DataTypes.DATE,
            },
            Status:{
                type: DataTypes.STRING,
            },
            Feedback:{
                type: DataTypes.NUMBER,
            },
            Query_Text:{
                type: DataTypes.STRING,
            },
            Query_Response:{
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            underscored: false,
            tableName: 'QueryHandling',
            timestamps: false,
        });
    }
}
export default QueryHandling;