import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';

import { Button } from "@/components/ui/button"


const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null);
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchEmployees');
        try {
            const data = await GetAllEmployees(search, page, limit);
            console.log(data);
            setEmployeesData(data);
        } catch (err) {
            alert('Error', err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearch = (e) => {
        fetchEmployees(e.target.value);
    };

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Employee Management App</h1>
            <div className="w-full flex justify-center">
                <div className="w-4/5 border bg-gray-100 p-6 rounded shadow">
                    <div className="flex justify-between mb-4">
                        <Button variant="default" onClick={() => setShowModal(true)}>Add</Button>;
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Employees..."
                            className="form-control w-1/2 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <EmployeeTable
                        employees={employeesData.employees}
                        pagination={employeesData.pagination}
                        fetchEmployees={fetchEmployees}
                        handleUpdateEmployee={handleUpdateEmployee}
                    />

                    <AddEmployee
                        fetchEmployees={fetchEmployees}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        employeeObj={employeeObj}
                    />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default EmployeeManagementApp;
