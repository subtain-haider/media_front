'use client';

import { Box, Typography, Link, Chip, Button, Tooltip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { generatePublicLink } from '@/services/fileService';

type File = {
    _id: string;
    filename: string;
    originalName: string;
    url: string;
    size: number;
    tags: string[];
    publicViews: number;
};

type FileListProps = {
    files: File[];
    setFiles: (files: File[]) => void;
};

export default function FileList({ files = [], setFiles }: FileListProps) {
    const [copiedFileId, setCopiedFileId] = useState<string | null>(null);

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const reordered = Array.from(files);
        const [movedItem] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, movedItem);
        setFiles(reordered);
    };

    const handleGenerateLink = async (fileId: string) => {
        try {
            const response = await generatePublicLink(fileId);
            if (response.publicLink) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    // Clipboard API is available
                    await navigator.clipboard.writeText(response.publicLink);
                } else {
                    // Fallback for unsupported clipboard API
                    const tempTextarea = document.createElement('textarea');
                    tempTextarea.value = response.publicLink;
                    document.body.appendChild(tempTextarea);
                    tempTextarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempTextarea);
                }
                setCopiedFileId(fileId);
                setTimeout(() => setCopiedFileId(null), 2000); // Reset copied state
            }
        } catch (error) {
            console.error('Error generating public link:', error);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="files">
                {(provided) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
                    >
                        {files.length === 0 ? (
                            <Typography variant="body1" color="text.secondary" textAlign="center">
                                No files uploaded yet.
                            </Typography>
                        ) : (
                            files.map((file, index) => (
                                <Draggable key={file._id} draggableId={file._id} index={index}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                p: 2,
                                                border: '1px solid #ddd',
                                                borderRadius: 2,
                                                backgroundColor: '#fafafa',
                                            }}
                                        >
                                            {/* File Info */}
                                            <Box>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {file.originalName}
                                                </Typography>
                                                
                                                {/* Tags */}
                                                {file.tags?.length > 0 && (
                                                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                        {file.tags.map((tag, idx) => (
                                                            <Chip key={idx} label={tag} size="small" color="primary" />
                                                        ))}
                                                    </Box>
                                                )}
                                            </Box>

                                            {/* Actions */}
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {(file.size / 1024).toFixed(2)} KB
                                                </Typography>
                                                {/* Display public views */}
                                                <Typography variant="body2" color="text.secondary">
                                                    Views: {file.publicViews || 0} {/* Display the public view count */}
                                                </Typography>
                                                <Tooltip
                                                    title={copiedFileId === file._id ? 'Copied!' : 'Copy Public Link'}
                                                >
                                                    <Button
                                                        size="small"
                                                        onClick={() => handleGenerateLink(file._id)}
                                                        variant="outlined"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        {copiedFileId === file._id ? 'Copied!' : 'Copy Link'}
                                                    </Button>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    )}
                                </Draggable>
                            ))
                        )}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
}
