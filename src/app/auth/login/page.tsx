'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Box } from '@mui/material';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '@/components/FormInput';
import AuthLayout from '@/components/AuthLayout';
import { loginSchema } from '@/utils/validation';
import { login } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/tokenHelper';


export default function Login() {
    const router = useRouter();

    const { control, handleSubmit } = useForm({ resolver: yupResolver(loginSchema) });

    // Check for existing token and redirect to dashboard
    useEffect(() => {
        if (getToken()) {
            router.push('/'); // Redirect to the main dashboard
        }
    }, [router]);

    const onSubmit = async (data: any) => {
        try {
            const response = await login(data);

            if (response.status === 'success') {
                // Success toast
                toast.success(response.message, { position: 'top-right' });
                localStorage.setItem('token', response.data.token);
                router.push('/'); // Redirect to dashboard
            }
        } catch (err: any) {
            // Display error message in toast
            toast.error(err.message, { position: 'top-right' });
            console.error(err.message);
        }
    };

    return (
        <AuthLayout title="Sign In">
            {/* Toast Container */}
            <ToastContainer />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput name="email" control={control} label="Email" />
                <FormInput name="password" control={control} label="Password" type="password" />

                <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                    Sign In
                </Button>

                <Box sx={{ my: 2 }}>
                    <Divider>OR</Divider>
                </Box>

                <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    href="/auth/register"
                    sx={{ mb: 2 }}
                >
                    Sign Up
                </Button>
            </form>
        </AuthLayout>
    );
}
