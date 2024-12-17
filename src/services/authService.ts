import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://164.92.192.18/api';


export const login = async (data: { email: string; password: string }) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, data);

        if (res.data.status === 'success') {
            return res.data; // Return the entire response for success
        } else {
            throw new Error(res.data.message || 'Login failed'); // Handle backend "error" status
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // Extract the 'message' field from backend response
            throw new Error(error.response?.data?.message || 'Login failed');
        }
        throw new Error('Something went wrong. Please try again.');
    }
};

export const registerUser = async (data: { email: string; password: string }) => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, data);

        if (res.data.status === 'success') {
            return res.data; // Return success response
        } else {
            throw new Error(res.data.message || 'Registration failed'); // Handle backend "error" status
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // Extract the 'message' field from backend response
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
        throw new Error('Something went wrong. Please try again.');
    }
};
