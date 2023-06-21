import { db } from '../database/models';
import Employees from '../database/models/employees';

class EmployeesService {
    private static instance: EmployeesService;

    static getInstance(): EmployeesService {
        if (!EmployeesService.instance) {
            EmployeesService.instance = new EmployeesService();
        }
        return EmployeesService.instance;
    }

    findAll = async () => {
        const employees: Employees[] = await Employees.findAll();
        return employees;
    };

    findById = async (EmpID: string) => {
        const existingEmployee: Employees | null = await Employees.findByPk(
            EmpID
        );
        return existingEmployee;
    };

    save = async (object: any) => {
        try {
            if (!object && object.keys(object).lenght == 0) {
                throw new Error('Must conatain atleast 1 property');
            }
            const employee = await Employees.create({ ...object });
            return employee;
        } catch (err) {
            throw err;
        }
    };

    update = async (EmpID: string, object: any) => {
        if (!object && Object.keys(object).length == 0) {
            throw new Error(
                'Object to be updated must contain at least one property.'
            );
        }

        let existingEmployee = await this.findById(EmpID);
        if (!existingEmployee) {
            throw new Error('department_not_found');
        }

        try {
            await Employees.update(
                { ...object },
                {
                    where: { EmpID },
                }
            );

            existingEmployee = await this.findById(EmpID);
            return existingEmployee;
        } catch (err) {
            throw err;
        }
    };

    deleteByPrimaryKey = async (id: string) => {
        let existingEmployee = await this.findById(id);
        if (!existingEmployee) {
            throw new Error('department_not_found');
        }

        try {
            await existingEmployee.destroy();
        } catch (err) {
            throw err;
        }
    };
}

export default EmployeesService;
