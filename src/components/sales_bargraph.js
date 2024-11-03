import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

const itemsSoldData = [50, 70, 65, 90, 85, 100, 110, 120, 115, 105];  // Items sold from Jan to Oct
const profitData = [10, 15, 12, 20, 18, 25, 30, 32, 28, 26];  // Profit percentage
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];  // X-axis labels

export default function SalesBarChart() {
    return(
        <>
        <Typography variant="h3" fontWeight="bold" align="center" color='secondary.dark' gutterBottom>
              Sales Stats for the Year 
        </Typography>
        <BarChart
          width={600}
          height={400}
          series={[
            {data:itemsSoldData,label:'Items sold',id: 'itemsSoldId',color: '#D8BFD8'},
            { data: profitData, label: 'Profit (%)', id: 'profitId',color: '#FF5722' },
          ]}
          xAxis={[{ data: months, scaleType: 'band' }]}  // Months on the X-axis
        />
        </>
    );
}