import { Box, Typography, Rating, Avatar, Paper } from '@mui/material';

const feedbacks = [
    {
      name: 'John Doe',
      comment: 'Great food and excellent service!',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Jane Smith',
      comment: 'Loved the ambiance and menu selection.',
      rating: 4,
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
    },
    {
      name: 'Michael Johnson',
      comment: 'The food was amazing but service was slow.',
      rating: 3,
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
    {
        name: 'Emily Williams',
        comment: 'Fantastic experience! Will come back again.',
        rating: 5,
        avatarUrl: 'https://i.pravatar.cc/150?img=4',
    },
    {
        name: 'Chris Brown',
        comment: 'Decent food but the place was a bit noisy.',
        rating: 3,
        avatarUrl: 'https://i.pravatar.cc/150?img=6',
    },
    {
        name: 'Sophia Martinez',
        comment: 'Amazing desserts and friendly staff!',
        rating: 4,
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
];

export default function CustomerFeedback () {
    return (
        <Box>
           {feedbacks.map((feedback,index)=>(
            <Paper key={index} sx={{ padding: 2, marginBottom: 2, display: 'flex', gap: 2 }}>
               <Avatar alt={feedback.name} src={feedback.avatarUrl} />
               <Box sx={{ flex: 1 }}>
                 <Typography variant="h6">{feedback.name}</Typography>
                 <Typography variant="body2" color="text.secondary">
                   {feedback.comment}
                 </Typography>
                 <Rating value={feedback.rating} readOnly />
               </Box> 
             </Paper>
           ))}   
        </Box>    
      );
}  