import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DepartmentManagement = () => {
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // New state for message type
    const [isManager, setIsManager] = useState(localStorage.getItem('role') === 'manager');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isManager) {
            navigate('/login');
        } else {
            fetchDepartments();
        }
    }, [isManager, navigate]);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_DEPARTMENTS_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Role': localStorage.getItem('role'),
                },
            });
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const createDepartment = async () => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_DEPARTMENTS_URL,
                { name: newDepartment },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Role': localStorage.getItem('role'),
                    },
                }
            );
            if (response.status === 201) {
                setNewDepartment('');
                await fetchDepartments();
                setMessage('Added successfully');
                setMessageType('success'); // Add message type for styling
            } else {
                setMessage('Error: ' + response.data.message);
                setMessageType('error'); // Add message type for styling
            }
        } catch (error) {
            setMessage('Something went wrong, try again');
            setMessageType('error'); // Add message type for styling
        } finally {
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const updateDepartment = async (id, name) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_DEPARTMENTS_URL}/${id}`,
                { name },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Role': localStorage.getItem('role'),
                    },
                }
            );
            fetchDepartments();
        } catch (error) {
            console.error('Error updating department:', error);
        }
    };

    const deleteDepartment = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_DEPARTMENTS_URL}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Role': localStorage.getItem('role'),
                },
            });
            fetchDepartments();
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    return (
        <div>
            <h1>Department Management</h1>
            <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                placeholder="New Department"
            />
            <button onClick={createDepartment}>Create Department</button>
            {message && (
                <p className={messageType === 'success' ? 'text-green-600' : 'text-red-600'}>
                    {message}
                </p>
            )}
            <ul>
                {departments.map(dept => (
                    <li key={dept._id}>
                        <input
                            type="text"
                            value={dept.name}
                            onChange={(e) => updateDepartment(dept._id, e.target.value)}
                        />
                        <button onClick={() => deleteDepartment(dept._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentManagement;
