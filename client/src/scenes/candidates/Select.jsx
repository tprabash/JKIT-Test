import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function DepartmentSelect({ value, onChange, setDepartmentCode }) {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments();
    }, []);

    useEffect(() => {
        if (departments.length > 0 && value) {
            const selectedDepartment = departments.find(department => department.id === value);
            if (selectedDepartment) {
                setDepartmentCode(selectedDepartment.departmentCode);
            }
        }
    }, [value, departments]);

    const getDepartments = () => {
        Axios.get('https://localhost:7032/api/Candidate/GetDepartent')
            .then(response => {
                setDepartments(response.data || []);
            })
            .catch(error => {
                console.error('Axios Error', error);
            });
    };

    const handleDepartmentChange = (event) => {
        const selectedId = event.target.value;
        onChange(selectedId);

        const selectedDepartment = departments.find(department => department.id === selectedId);
        if (selectedDepartment) {
            setDepartmentCode(selectedDepartment.departmentCode);
            console.log(selectedDepartment.id);
        } else {
            setDepartmentCode('');
        }
    };

    return (
        <FormControl fullWidth sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}>
            <InputLabel id="departmentName-label">Department</InputLabel>
            <Select
                labelId="departmentName-label"
                id="department-select"
                label="Department"
                onChange={handleDepartmentChange}
                value={value || ''}
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
