import { Box,Container,Typography,Grid2, Paper, } from '@mui/material';
import OverviewCard from '../components/overview_card';
import OrdersTable from '../components/orders_table';
import OffersAccordion from '../components/offers_accordian';
import TopSellingTabs from '../components/top_selling_tabs';
import SalesBarChart from '../components/sales_bargraph';
import CategoryPieChart from '../components/category_piechart';
import CustomerFeedback from '../components/customer_feedback';

export default function Dashboard() {  
    
    return(
      <Box sx={{marginTop:'16px'}}>
        <Container>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',marginRight:'24px'}}>
            <Typography variant='h1'sx={{flexGrow:2,padding:2}}>Restaurant Dashboard</Typography> 
          </Box>
          <Grid2 container spacing={2} justifyContent='space-evenly'>
            {/* Row 1: Overview Cards */}
            <Grid2 item xs={12}>
              <Grid2 container spacing={2} justifyContent='space-evenly'> 
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 3,height: '400px',width: '350px' }}>
                    <OverviewCard title="Total Orders" today={20} weekly={140} monthly={600} imageUrl='https://5.imimg.com/data5/PY/GY/HA/SELLER-15689514/hotel-writing-pad-500x500.png' />
                  </Paper>
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 3,height: '400px',width: '350px' }}>
                    <OverviewCard title="Total Items Sold" today={50} weekly={350} monthly={1500} imageUrl='https://media.istockphoto.com/id/92268246/photo/sold-sign.jpg?s=612x612&w=0&k=20&c=oczWs4gO_fR8WWTbKHTIySd0VFsg2CoPSfeAJoxr1iw='/>
                  </Paper>
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 3,height: '400px',width: '350px' }}>
                    <OverviewCard title="Revenue" today="₹5000" weekly="₹35000" monthly="₹150000" imageUrl='https://bsmedia.business-standard.com/_media/bs/img/article/2024-08/05/full/1722825687-5759.jpg?im=FeatureCrop,size=(826,465)' />
                  </Paper> 
                </Grid2>
              </Grid2>
            </Grid2>
            {/* Row 2: Orders Table and Image List */} 
            <Grid2 item xs={12}>
              <Grid2 container spacing={2} sx={{display: 'flex',flexDirection: 'column',justifyContent: 'center',}}>
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 2, height: '100%',overflow: 'auto' }}>
                    <OrdersTable />  
                  </Paper>
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 2}}>
                    <OffersAccordion />
                  </Paper>
                </Grid2>
              </Grid2>
            </Grid2>
            {/* Row 3: Tabs for Top Selling Items and Bar Graph */} 
            <Grid2 item xs={12}>
              <Grid2 container spacing={2} justifyContent='space-evenly'>
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 2 }}><TopSellingTabs /></Paper>
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 2 }}><SalesBarChart /></Paper>   
                </Grid2>
              </Grid2>
            </Grid2>  
            {/* Row 4: Pie Chart and Customer Feedback */}
            <Grid2 item xs={12}>
              <Grid2 container spacing={2} justifyContent='space-evenly'sx={{marginBottom:'16px'}}>
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 2 }}><CategoryPieChart /></Paper>
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                  <Paper sx={{ padding: 2,height: '300px', overflow: 'auto' }}>
                    <CustomerFeedback />
                  </Paper>   
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Container>
      </Box>    
    ); 
} 