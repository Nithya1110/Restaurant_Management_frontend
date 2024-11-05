import {Card, CardContent, CardMedia, Typography, SpeedDial, SpeedDialAction} from '@mui/material';
  import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
  import SaveIcon from '@mui/icons-material/Save';
  import PrintIcon from '@mui/icons-material/Print';
  import ShareIcon from '@mui/icons-material/Share';
  import MoreVert from '@mui/icons-material/MoreVert';
  
  const OverviewCard = ({ title, today, weekly, monthly, imageUrl }) => {
    return (
      <Card 
        sx={{ 
          position: 'relative', 
          minHeight: '350px', 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between', 
          overflow: 'hidden'  // Prevents content from expanding card height
        }}
      >
        {/* Image Section */}
        <CardMedia
          component="img"
          height="150"  // Fixed height for the image
          image={imageUrl}
          alt={title}
          sx={{ objectFit: 'cover' }}  // Adjust image fitting
        />
  
        {/* Content Section */}
        <CardContent sx={{ flexGrow: 1, overflowY: 'auto', padding: '32px' }}>
          <Typography variant="h6" fontWeight='bold' gutterBottom>{title}</Typography>
          <Typography variant="body1">Today: {today}</Typography>
          <Typography variant="body1">Weekly: {weekly}</Typography>
          <Typography variant="body1">Monthly: {monthly}</Typography>
        </CardContent>
  
        {/* Speed Dial for Quick Actions */}
        <SpeedDial
          ariaLabel="Speed Dial"
          sx={{ 
            position: 'absolute', 
            bottom: 16, 
            right: 16, 
            zIndex: 1  // Ensure SpeedDial stays above content
          }}
          icon={<MoreVert />}
        >
          <SpeedDialAction icon={<FileCopyIcon />} tooltipTitle="Copy" />
          <SpeedDialAction icon={<SaveIcon />} tooltipTitle="Save" />
          <SpeedDialAction icon={<PrintIcon />} tooltipTitle="Print" />
          <SpeedDialAction icon={<ShareIcon />} tooltipTitle="Share" />
        </SpeedDial>
      </Card>
    );
  };
  
export default OverviewCard; 