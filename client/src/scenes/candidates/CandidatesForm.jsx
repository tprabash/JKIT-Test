import { Grid, TextField, Button } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomDatePicker from './DatePicker';
import DepartmentSelect from './Select';

const CandidatesForm = ({ createCandidate, updateCandidate, data, isEdit }) => {

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        age: Yup.number().integer('Age must be an integer').min(0, 'Age cannot be negative').required('Age is required'),
        salary: Yup.number().min(0, 'Salary cannot be negative').required('Salary is required'),
        departmentId: Yup.string().required('Department is required'),
        departmentCode: Yup.string().required('Department Code is required'),
        dob: Yup.date().nullable().required('Date of Birth is required'),
    });

    const initialValues = useMemo(() => ({
        id: data?.id || '',
        firstName: data?.firstName || '',
        lastName: data?.lastName || '',
        email: data?.email || '',
        dob: data?.dob || null,
        age: data?.age || '',
        salary: data?.salary || '',
        departmentId: data?.departmentId || '',
        departmentCode: data?.departmentCode || '',
    }), [data]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (isEdit) {
                await updateCandidate(values);
            } else {
                await createCandidate(values);
            }
            resetForm();
        } catch (error) {
            console.error("Submission error: ", error);
        } 
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ setFieldValue, values }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={1} sm={1}>
                            <Field name="id">
                                {({ field }) => (
                                    <TextField
                                        type="number"
                                        id="id"
                                        label="ID"
                                        variant="outlined"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputProps={{ readOnly: true }}
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Field name="firstName">
                                {({ field }) => (
                                    <TextField
                                        type="text"
                                        id="firstName"
                                        label="First Name"
                                        variant="outlined"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputLabelProps={{ shrink: !!field.value }}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="firstName" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Field name="lastName">
                                {({ field }) => (
                                    <TextField
                                        type="text"
                                        id="lastName"
                                        label="Last Name"
                                        variant="outlined"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputLabelProps={{ shrink: !!field.value }}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <Field name="email">
                                {({ field }) => (
                                    <TextField
                                        type="text"
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputLabelProps={{ shrink: !!field.value }}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={2} sm={2} sx={{ marginTop: '-8px' }}>
                            <CustomDatePicker
                                dob={values.dob}
                                setDob={date => setFieldValue('dob', date)}
                                setAge={age => setFieldValue('age', age)}
                            />
                            <ErrorMessage name="dob" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Field name="age">
                                {({ field }) => (
                                    <TextField
                                        type="number"
                                        id="age"
                                        label="Age"
                                        variant="outlined"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputLabelProps={{ shrink: !!field.value }}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="age" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Field name="salary">
                                {({ field }) => (
                                    <TextField
                                        type="number"
                                        id="salary"
                                        label="Salary"
                                        variant="outlined"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputLabelProps={{ shrink: !!field.value }}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="salary" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <DepartmentSelect
                                value={values.departmentId}
                                onChange={id => setFieldValue('departmentId', id)}
                                setDepartmentCode={code => setFieldValue('departmentCode', code)}
                            />
                            <ErrorMessage name="departmentId" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Field name="departmentCode">
                                {({ field }) => (
                                    <TextField
                                        type="text"
                                        id="departmentCode"
                                        label="Department Code"
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputLabelProps={{ shrink: !!field.value }}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="departmentCode" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                type="submit"
                                sx={{
                                    margin: 'auto',
                                    marginBottom: '20px',
                                    backgroundColor: '#00c6e6',
                                    color: '#ffffff',
                                    marginLeft: '15px',
                                    marginTop: '10px',
                                    '&:hover': {
                                        opacity: '0.7',
                                        backgroundColor: '#00c6e6',
                                    },
                                }}
                            >
                                {isEdit ? 'Update' : 'Submit'}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default CandidatesForm;
