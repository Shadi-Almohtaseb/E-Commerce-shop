import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const CustomTextField = ({ name, label }) => {
    const { control } = useFormContext();
    const isError = false;
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                error={isError}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label={label}
                        required
                    />
                )}
            />
        </Grid>
    )
}

export default CustomTextField
