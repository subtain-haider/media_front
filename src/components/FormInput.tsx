import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    type?: string;
}

export default function FormInput({ name, control, label, type = 'text' }: FormInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                    margin="normal"
                />
            )}
        />
    );
}
