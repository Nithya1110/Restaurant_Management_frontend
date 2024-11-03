import { PieChart } from '@mui/x-charts/PieChart';  
import { Typography } from '@mui/material';

const data = [
    { id: 0, value: 25, label: 'Desserts' },           
    { id: 1, value: 30, label: 'South Indian Cuisine' }, 
    { id: 2, value: 15, label: 'North Indian Cuisine' }, 
    { id: 3, value: 20, label: 'Non-Veg' },             
    { id: 4, value: 10, label: 'Drinks' },             
];

const palette = ['olive', 'orange','slateblue','lightcoral','grey'];


  export default function CategoryPieChart()  {
    const pieParams = {
        width: 600,
        height: 300,
      };

    return(
        <>
        <Typography variant="h3" fontWeight="bold" align="center" color='secondary.dark' gutterBottom>
            Categories Sold Stats 
        </Typography>
        <PieChart
        colors={palette}
        series={[
            {
              data: data,
            },
          ]}
          {...pieParams}  
          slotProps={{
            legend:'right'
          }} 
        />
        </>
    );
  }