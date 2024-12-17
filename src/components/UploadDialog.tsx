'use client';

import { useDropzone } from 'react-dropzone';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type UploadDialogProps = {
    open: boolean;
    onClose: () => void;
    onUpload: (files: File[], tags: string) => void;
};

export default function UploadDialog({ open, onClose, onUpload }: UploadDialogProps) {
    const [tags, setTags] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [], 'video/*': [], 'application/pdf': [] },
        onDrop: (acceptedFiles) => {
            // Append new files without replacing the current ones
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        },
    });

    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogContent>
                {/* Drag and Drop Zone */}
                <Box
                    {...getRootProps()}
                    sx={{
                        p: 3,
                        border: '2px dashed #ccc',
                        borderRadius: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: '#fafafa',
                        ':hover': { backgroundColor: '#f0f0f0' },
                    }}
                >
                    <input {...getInputProps()} />
                    <Typography>Drag & drop files here, or click to select files</Typography>
                </Box>

                {/* Selected Files List */}
                {files.length > 0 && (
                    <List sx={{ mt: 2, maxHeight: 200, overflowY: 'auto' }}>
                        {files.map((file, index) => (
                            <ListItem key={index} divider>
                                <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}

                {/* Tags Input */}
                <TextField
                    fullWidth
                    placeholder="Add tags comma seperated"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    sx={{ mt: 2 }}
                />
            </DialogContent>

            {/* Actions */}
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (files.length === 0) {
                            return alert('Please select at least one file to upload.');
                        }
                        onUpload(files, tags);
                        setFiles([]);
                        setTags('');
                    }}
                >
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
}
