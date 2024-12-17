'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Box } from '@mui/material';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '@/components/FormInput';
import AuthLayout from '@/components/AuthLayout';
import { registerSchema } from '@/utils/validation';
import { registerUser } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const { control, handleSubmit } = useForm({ resolver: yupResolver(registerSchema) });

    const onSubmit = async (data: any) => {
        try {
            const response = await registerUser(data);

            if (response && response.status === 'success') {
                // Success toast
                toast.success(response.message || 'Registration successful!', { position: 'top-right' });
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            } else {
                throw new Error('Registration failed'); // Handle unexpected response
            }
        } catch (err: any) {
            // Display error message in toast
            toast.error(err.message || 'An error occurred during registration.', {
                position: 'top-right',
            });
            console.error(err.message);
        }
    };

    return (
        <AuthLayout title="Sign Up">
            {/* Toast Container */}
            <ToastContainer />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput name="username" control={control} label="Username" />
                <FormInput name="email" control={control} label="Email" />
                <FormInput name="password" control={control} label="Password" type="password" />
                <FormInput name="confirmPassword" control={control} label="Confirm Password" type="password" />

                <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                    Sign Up
                </Button>

                <Box sx={{ my: 2 }}>
                    <Divider>OR</Divider>
                </Box>

                <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    href="/auth/login"
                    sx={{ mb: 2 }}
                >
                    Sign In
                </Button>
            </form>
        </AuthLayout>
    );
}
