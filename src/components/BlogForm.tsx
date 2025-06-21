import TextField from './TextField';

interface BlogFormProps {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({
  title,
  content,
  setTitle,
  setContent,
  onSubmit,
  loading = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        fullWidth
        multiline
        minRows={4}
        required
      />
    </form>
  );
};


export default BlogForm;
