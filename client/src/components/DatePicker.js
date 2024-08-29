import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

export default function CustomDatePicker({ dob, setDob }) { 

    const handleDateChange = (newValue) => {
        setDob(newValue);
        console.log('Selected Date:', newValue ? newValue.format('YYYY-MM-DD') : 'No date selected');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <MUIDatePicker
                    label="Date Of Birth"
                    value={dob ? dayjs(dob) : null}
                    onChange={handleDateChange}
                    // onChange={(newValue) => setDob(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
