import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { supabase } from "../supabase/client";

interface Blog {
  id: number;
  title: string;
  content: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

const TrashPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrashedBlogs = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const user_id = userData?.user?.id;

    if (!user_id) return;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("author_id", user_id)
      .eq("is_deleted", true)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching trashed blogs:", error.message);
    } else {
      setBlogs(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTrashedBlogs();
  }, []);

  const handleRestore = async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmRestore = confirm("Are you sure you want to restore this blog?");
    if (!confirmRestore) return;

    const { error } = await supabase
      .from("blogs")
      .update({ is_deleted: false })
      .eq("id", id);

    if (!error) fetchTrashedBlogs();
  };

  const handlePermanentDelete = async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Permanently delete this blog? This action cannot be undone.")) {
        const { error } = await supabase.from("blogs").delete().eq("id", id);
        if (!error) fetchTrashedBlogs();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Trash
      </Typography>

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
                      <IconButton onClick={() => handleRestore(blog.id)}>
                        <RestoreFromTrashIcon color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handlePermanentDelete(blog.id)}
                      >
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </Box>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TrashPage;
