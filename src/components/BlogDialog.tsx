import React, { useState } from 'react';
import DialogWrapper from './DialogWrapper';
import BlogForm from './BlogForm';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { addBlog, updateBlog } from '../features/blog/blogThunks';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  isEditing?: boolean;
  blogId?: number;
  initialTitle?: string;
  initialContent?: string;
}

const BlogDialog: React.FC<Props> = ({ open, onClose, isEditing, blogId, initialTitle, initialContent }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState(initialTitle || '');
    const [content, setContent] = useState(initialContent || '');


    const handleCreate = async () => {
        if (!title || !content) return alert("Please fill in all fields.");

        try {
          if (isEditing && blogId !== undefined) {
            await dispatch(updateBlog({ id: blogId, title, content }));
          } else {
            await dispatch(addBlog({ title, content }));
          }

          onClose();
        } catch (err) {
          console.error('Failed to save blog:', err);
          alert("Something went wrong");
        }
    };

    useEffect(() => {
      setTitle(initialTitle || '');
      setContent(initialContent || '');
    }, [initialTitle, initialContent, open]);

  return (
    <DialogWrapper
        open={open}
        onClose={onClose}
        title="Create New Blog"
        onSubmit={handleCreate}
        submitLabel={isEditing ? "Update" : "Create"}
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

export default BlogDialog;
