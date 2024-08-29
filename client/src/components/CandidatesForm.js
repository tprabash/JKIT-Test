import { Grid, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import CustomDatePicker from './DatePicker';
import DepartmentSelect from './Select';

const CandidatesForm = ({ createCandidate,updateCandidate, selectedDepartmentId, setSelectedDepartmentId, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState(null);
    const [salary, setSalary] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    useEffect(() => {
        if (data && data.id !== 0) {
            setId(data.id);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setDob(data.dob);
            setAge(data.age || '');
            setSalary(data.salary || '');
            setDepartmentCode(data.departmentCode || '');
            setDepartmentId(data.departmentId || '');
        } else {
            // Reset form when creating a new entry
            setId(0);
            setFirstName('');
            setLastName('');
            setEmail('');
            setDob(null);
            setAge('');
            setSalary('');
            setDepartmentCode('');
            setDepartmentId('');
        }
    }, [data]);

    const handleSubmit = () => {
        const numericAge = parseInt(age, 10) || 0;
        const numericSalary = parseInt(salary, 10) || 0;

        createCandidate({ firstName, lastName, email, dob, age: numericAge, salary: numericSalary });
    };

    const handleUpdate = () => {
        const numericAge = parseInt(age, 10) || 0;
        const numericSalary = parseInt(salary, 10) || 0;

        updateCandidate({ id, firstName, lastName, email, dob, age: numericAge, salary: numericSalary });
    };

    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: '#ffffff',
                marginBottom: '30px',
            }}
        >
            <Grid item xs={12}>
                <Typography
                    component={'h1'}
                    sx={{ color: '#000000', textAlign: 'center', fontWeight: 'bold' }}
                >
                    Candidate User Form
                </Typography>
            </Grid>
            <Grid item xs={1} sm={1}>
                <TextField
                    type="number"
                    id="id"
                    name="id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    label="ID"
                    variant="outlined"
                    sx={{ marginTop: '8px' }}
                />
            </Grid>
            <Grid item xs={1} sm={1}>
                <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    label="First Name"
                    variant="outlined"
                    sx={{ marginTop: '8px' }}
                />
            </Grid>
            <Grid item xs={1} sm={1}>
                <TextField
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    label="Last name"
                    variant="outlined"
                    sx={{ marginTop: '8px' }}
                />
            </Grid>
            <Grid item xs={1} sm={1}>
                <TextField
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    label="Email"
                    variant="outlined"
                    sx={{ marginTop: '8px' }}
                />
            </Grid>
            <Grid item xs={2} sm={2}>
                <CustomDatePicker
                    dob={dob}
                    setDob={setDob}
                />
            </Grid>
            <Grid item xs={1} sm={1}>
                <TextField
                    type="number"
                    id="age"
                    name="age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    label="Age"
                    variant="outlined"
                    sx={{ marginTop: '8px' }}
                />
            </Grid>
            <Grid item xs={1} sm={1}>
                <TextField
                    type="number"
                    id="salary"
                    name="salary"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                    label="Salary"
                    variant="outlined"
                    sx={{ marginTop: '8px' }}
                />
            </Grid>
            <Grid item xs={1} sm={1}>
                <DepartmentSelect
                    selectedDepartmentId={selectedDepartmentId}
                    setSelectedDepartmentId={setSelectedDepartmentId}
                    setDepartmentCode={setDepartmentCode}
                />
            </Grid>
            <Grid item xs={2} sm={2}>
                <TextField
                    type="text"
                    id="departmentCode"
                    name="departmentCode"
                    value={departmentCode || ''}
                    onChange={e => setDepartmentCode(e.target.value)}
                    label="Department Code"
                    variant="outlined"
                    sx={{ marginTop: '8px', display: 'none' }}
                />
            </Grid>
            <Button
                sx={{
                    margin: 'auto',
                    marginBottom: '20px',
                    backgroundColor: '#00c6e6',
                    color: '#000000',
                    marginLeft: '15px',
                    marginTop: '30px',
                    '&:hover': {
                        opacity: '0.7',
                        backgroundColor: '#00c6e6',
                    },
                }}
                // onClick={isEdit ? handleUpdate : handleSubmit}.
                onClick={handleUpdate}
            >
                {isEdit ? 'Update' : 'Add'}
            </Button>
        </Grid>
    );
};

export default CandidatesForm;
