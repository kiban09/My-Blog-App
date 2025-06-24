import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Pagination,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import BlogDialog from "../components/BlogDialog";
import IconButtonWithTooltip from "../components/IconButtonWithTooltip";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { softDeleteBlogThunk, fetchBlogsThunk } from '../features/blog/blogThunks';

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const blogs = useAppSelector((state) => state.blog.blogs);
  const loading = useAppSelector((state) => state.blog.loading);
  const totalPages = useAppSelector((state) => state.blog.totalPages);

  const dispatch = useDispatch<AppDispatch>();

  const handleSoftDelete = async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("This blog will be moved to the trash")) {
      await dispatch(softDeleteBlogThunk(id));
      dispatch(fetchBlogsThunk(currentPage));
    }
  };

  useEffect(() => {
    dispatch(fetchBlogsThunk(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight="bold">
            My Blog App
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create New Blog
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container direction="column" spacing={2}>
            {blogs.map((blog) => (
              <Grid key={blog.id} size={{ xs: 12, sm: 12 }}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 2, backgroundColor: '#1E1E1E' }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Grid size={{ xs: 9.5, sm: 9, md: 10, lg: 10.5 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {blog.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ wordWrap: "break-word" }}
                        >
                          {blog.content}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 2.5, sm: 3, md: 2, lg: 1.5 }}>
                      <Box>
                        <IconButtonWithTooltip
                          onClick={() => {
                          setEditMode(true);
                          setEditBlogId(blog.id);
                          setEditTitle(blog.title);
                          setEditContent(blog.content);
                          setOpen(true);}}
                          icon={<EditIcon />}
                          tooltip = "Edit"
                        />
                        <IconButtonWithTooltip 
                          onClick={() => handleSoftDelete(blog.id)}
                          icon = {<DeleteIcon />}
                          tooltip = "Move to Trash"
                        />
                      </Box>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>

      <BlogDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditMode(false);
          setEditBlogId(null);
          setEditTitle('');
          setEditContent('');
          dispatch(fetchBlogsThunk(currentPage));
        }}
        isEditing={editMode}
        blogId={editBlogId || undefined}
        initialTitle={editTitle}
        initialContent={editContent}
      />
    </>
  );
};

export default Home;
