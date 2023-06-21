import { Model, Sequelize, DataTypes } from 'sequelize';
import { EmployeesAttributes } from '../attributes';

class Employees extends Model implements EmployeesAttributes {
    EmpID!: string;
    EFirstName!: string;
    ELastName!: string;
    Address!: string;
    Age!: number;
    D_Join!: Date;
    Dept!: string;
    Salary!: number;

    static initModel(sequelize: Sequelize): void {
        Employees.init(
            {
                EmpID: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    autoIncrement: false,
                },
                EFirstName: {
                    type: DataTypes.STRING,
                },
                ELastName: {
                    type: DataTypes.STRING,
                },
                Address: {
                    type: DataTypes.STRING,
                },
                Age: {
                    type: DataTypes.INTEGER,
                },
                D_Join: {
                    type: DataTypes.DATE,
                },
                Dept: {
                    type: DataTypes.STRING,
                },
                Salary: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                underscored: false,
                tableName: 'Employees',
                timestamps: false,
            }
        );
    }
}

export default Employees;
