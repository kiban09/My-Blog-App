import React, { useState } from 'react';
import DialogWrapper from './DialogWrapper';
import BlogForm from './BlogForm';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { addBlog } from '../features/blog/blogThunks';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateBlogDialog: React.FC<Props> = ({ open, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreate = async () => {
        if (!title || !content) return alert("Please fill in all fields.");

        try {
            await dispatch(addBlog({ title, content }));
            onClose();
            setTitle('');
            setContent('');
        } catch (err) {
            console.error('Failed to create blog:', err);
            alert("Something went wrong");
        }
    };

  return (
    <DialogWrapper
        open={open}
        onClose={onClose}
        title="Create New Blog"
        onSubmit={handleCreate}
        submitLabel="Create"
    >
    <BlogForm
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        onSubmit={handleCreate}
        loading={false}
    />
    </DialogWrapper>
  );
};

export default CreateBlogDialog;
