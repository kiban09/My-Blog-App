import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Pagination,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import BlogDialog from "../components/BlogDialog";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { supabase } from "../supabase/client";

interface Blog {
  id: number;
  title: string;
  content: string;
}

const blogsPerPage = 5;

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchBlogs = async (page: number) => {
  setLoading(true);

  const { data: userData } = await supabase.auth.getUser();
  const user_id = userData?.user?.id;

  if (!user_id) {
    setBlogs([]);
    setLoading(false);
    return;
  }

  const start = (page - 1) * blogsPerPage;
  const end = start + blogsPerPage - 1;

  const { data, count, error } = await supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .eq('author_id', user_id)
    .order('updated_at', { ascending: false })
    .range(start, end);

  if (error) {
    console.error('Error fetching blogs:', error.message);
  } else {
    setBlogs(data || []);
    setTotalPages(Math.ceil((count || 0) / blogsPerPage));
  }

  setLoading(false);
};


  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

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
                <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Grid size={{ xs: 8, sm: 9, md: 10, lg: 10.5 }}>
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
                    <Grid size={{ xs: 4, sm: 3, md: 2, lg: 1.5 }}>
                      <Box>
                        <IconButton
                          onClick={() => {
                          setEditMode(true);
                          setEditBlogId(blog.id);
                          setEditTitle(blog.title);
                          setEditContent(blog.content);
                          setOpen(true);
                        }}
>
                          <EditIcon />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
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
          fetchBlogs(currentPage);
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
