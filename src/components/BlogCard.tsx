import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from './Button';

interface BlogCardProps {
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, content, onEdit, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEdit}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
