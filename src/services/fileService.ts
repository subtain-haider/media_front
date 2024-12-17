import axios from 'axios';
import { getToken } from '@/utils/tokenHelper';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

// Fetch all files
export const fetchFiles = async () => {
    const res = await axios.get(`${API_URL}/files/my-files`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data.data;
};

// Upload files
export const uploadFiles = async (formData: FormData) => {
    const res = await axios.post(`${API_URL}/files/upload`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};

export const generatePublicLink = async (fileId: string) => {
    const response = await axios.post(
        `${API_URL}/files/generate-link/${fileId}`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data.data;
};