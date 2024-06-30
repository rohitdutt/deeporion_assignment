import React, { useState, useEffect } from 'react';
import axios from "axios";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState({ location: '', order: 'asc' });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_EMPLOYEE_URL}/filterEmployees`, {
            params: {
                location: filter.location,
                order: filter.order
            }
        })
            .then(response => {
                setEmployees(response.data)
            })
            .catch(error => console.error('Error fetching employees:', error));
    }, [filter]);

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <h1>Employee List</h1>
            <div>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleFilterChange}
                />
                <select name="order" onChange={handleFilterChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <ul>
                <li>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Employee Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Department
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.departmentName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
    );
};

export default EmployeeList;
