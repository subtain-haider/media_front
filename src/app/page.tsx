'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, logout } from '@/utils/tokenHelper';
import { Box, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchFiles, uploadFiles } from '@/services/fileService';
import FileList from '@/components/FileList';
import UploadDialog from '@/components/UploadDialog';

export default function Dashboard() {
  const router = useRouter();
  const [files, setFiles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!getToken()) router.push('/auth/login');
    fetchFilesData();
  }, [router]);

  const fetchFilesData = async () => {
    try {
      const data = await fetchFiles();
      setFiles(data);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  const handleUpload = async (uploadedFiles: File[], tags: string) => {
    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append('files', file));
    formData.append('tags', tags);

    try {
      await uploadFiles(formData);
      toast.success('Files uploaded successfully!');
      setIsModalOpen(false);
      fetchFilesData();
    } catch (err) {
      toast.error('Error uploading files');
      console.error(err);
    }
  };

  return (
      <Box sx={{ p: 4 }}>
        <ToastContainer />
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Typography variant="h4">Dashboard</Typography>
          <Button
              variant="outlined"
              color="error"
              onClick={() => {
                logout();
                router.push('/auth/login');
              }}
          >
            Logout
          </Button>
        </Box>

        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
          Upload New Files
        </Button>

        <Typography variant="h6" mt={4}>
          Uploaded Files
        </Typography>
        <FileList files={files} setFiles={setFiles} />

        <UploadDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} onUpload={handleUpload} />
      </Box>
  );
}
