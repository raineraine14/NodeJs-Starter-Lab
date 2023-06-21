"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class QueryHandling extends sequelize_1.Model {
    static initModel(sequelize) {
        QueryHandling.init({
            QID: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
            },
            Sub_Date: {
                type: sequelize_1.DataTypes.DATE,
            },
            Cust_ID: {
                type: sequelize_1.DataTypes.STRING,
                // references:{
                //     model:'CustomerTracking',
                //     key:'Cust_ID'
                // }
            },
            EmpID: {
                type: sequelize_1.DataTypes.STRING,
                // references:{
                //     model: Employees,
                //     key: 'EmpID'
                // }
            },
            Res_Date: {
                type: sequelize_1.DataTypes.DATE,
            },
            Status: {
                type: sequelize_1.DataTypes.STRING,
            },
            Feedback: {
                type: sequelize_1.DataTypes.NUMBER,
            },
            Query_Text: {
                type: sequelize_1.DataTypes.STRING,
            },
            Query_Response: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            sequelize,
            underscored: false,
            tableName: 'QueryHandling',
            timestamps: false,
        });
    }
}
exports.default = QueryHandling;
