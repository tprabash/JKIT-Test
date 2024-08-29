import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function DepartmentSelect({ selectedDepartmentId, setSelectedDepartmentId,  }) {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartmentCode, setSelectedDepartmentCode] = useState('');

    useEffect(() => {
        getDepartments();
    }, []);

    const getDepartments = () => {
        Axios.get('https://localhost:7032/api/Candidate/GetDepartent')
            .then(response => {
                console.log("Departments fetched:", response.data);
                setDepartments(response?.data || []);
            })
            .catch(error => {
                console.error('Axios Error', error);
            });
    };

    const handleDepartmentChange = (event) => {
        const selectedId = event.target.value;
        setSelectedDepartmentId(selectedId);

        const selectedDepartment = departments.find(department => department.id === selectedId);
        if (selectedDepartment) {
            setSelectedDepartmentCode(selectedDepartment.departmentCode);
            console.log("selectedDepartment.departmentCode", selectedDepartment.departmentCode);
        }
    };

    return (
        <FormControl fullWidth sx={{ marginTop: '8px' }}>
            <InputLabel id="departmentName-label">Department</InputLabel>
            <Select
                labelId="departmentName-label"
                id="department-select"
                label="Department"
                onChange={handleDepartmentChange}
                value={selectedDepartmentId || ''}
            >
                {departments.map((department) => (
                    <MenuItem key={department.id} value={department.id}>
                        {department.departmentName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
