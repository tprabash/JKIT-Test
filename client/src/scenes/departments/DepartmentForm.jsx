import { Grid, TextField, Button } from '@mui/material';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const DepartmentForm = ({ createDepartment, updateDepartment, data, isEdit }) => {
    // Validation schema with Yup
    const validationSchema = Yup.object({
        departmentName: Yup.string().required('Department Name is required'),
        departmentCode: Yup.string().required('Department Code is required'),
    });

    // Formik initial values
    const initialValues = {
        id: data ? data.id : 0,
        departmentName: data ? data.departmentName : '',
        departmentCode: data ? data.departmentCode : '',
    };

    // Formik submit handler
    const handleSubmit = (values, { resetForm }) => {
        if (isEdit) {
            updateDepartment(values);
        } else {
            createDepartment(values);
        }

        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >
            {({ setFieldValue }) => (
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
                        <Grid item xs={2} sm={2}>
                            <Field name="departmentName">
                                {({ field, form }) => (
                                    <TextField
                                        type="text"
                                        id="departmentName"
                                        label="Department Name"
                                        variant="outlined"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputLabelProps={{ shrink: !!field.value }}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="departmentName" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <Field name="departmentCode">
                                {({ field, form }) => (
                                    <TextField
                                        type="text"
                                        id="departmentCode"
                                        label="Department Code"
                                        variant="outlined"
                                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.09)' }}
                                        InputLabelProps={{ shrink: !!field.value }}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="departmentCode" component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                type="submit"
                                sx={{
                                    marginTop: '10px',
                                    backgroundColor: '#00c6e6',
                                    color: '#ffffff',
                                    marginLeft: '15px',
                                    '&:hover': {
                                        opacity: '0.7',
                                        backgroundColor: '#00c6e6',
                                    },
                                }}
                            >
                                {isEdit ? 'Update' : 'Add'}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default DepartmentForm;
