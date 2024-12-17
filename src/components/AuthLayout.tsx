import { Box, Container, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {title}
                </Typography>
                {children}
            </Paper>
        </Container>
    );
}
