import React,{ useEffect, useState }  from 'react';
import { Box, Container,Typography,useMediaQuery,useTheme, Alert,Chip } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // Import DataGrid
import { getOrders } from '../services/api'; // Axios API call 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';  // Import DatePicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import dayjs from 'dayjs'; // For date manipulation 
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';


// Custom renderer for status column
const renderStatus = (params) => {
  const {value} = params;
  const getStatusStyles = (status) => {
    switch (status) {
      case 'pending' :
        return { color: 'warning.main', icon: <AutorenewIcon /> }; // Yellow
      case 'out for delivery':
        return { color: 'info.main', icon: <InfoIcon /> }; // Blue
      case 'delivered':
        return { color: 'success.main', icon: <DoneIcon /> }; // Green
      case 'canceled':
        return { color: 'error.main', icon: <ReportProblemIcon /> }; // Red
      default:
        return { color: 'grey.500', icon: null }; // Default gray  
    }
  };   
  const { color, icon } = getStatusStyles(value);
  return (
    <Chip
      label={value}
      icon={icon}
      variant="outlined"
      sx={{
        width: '100%',
        fontWeight: 'bold',
        borderColor: color,
        color: color,
        '& .MuiChip-icon': {
          marginLeft: '4px', // Adjust icon spacing
          color: color, // Icon color matching border and text
        },
      }} 
    />  
  );
};


export default function Orders() { 
    const [orders,setOrders] = useState([]);   // State to hold order data 
    const [paginationModel, setPaginationModel] = useState({pageSize: 10,page: 0,}); // state for handling pagination
    const [selectedDate, setSelectedDate] = useState(dayjs());  // State for selected date, set initial date to today’s date
    const [filteredOrders, setFilteredOrders] = useState([]);  // State for filtered orders 
    const [cleared,setCleared] = useState(false);  // State to track if field was cleared  

    const theme = useTheme(); 
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs','sm'));  // Detect small screens
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md','lg'));  // Detect medium screens

    
    // Fetch orders on component mount   
    useEffect (()=>{
      getOrders()
        .then((response)=>setOrders(response.data))   // Store the fetched data in state 
        .catch((error)=>console.error('Error fetching the orders :',error))  // Handle any errors 
    },[]);

    // Filter orders by selected date
    useEffect(()=>{
      if (selectedDate) {
        const filtered = orders.filter(
          (order) => dayjs(order.order_date).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD')
        );
        setFilteredOrders(filtered);
      } else {
        setFilteredOrders([]); // Show no data if date is cleared
      }
    }, [selectedDate, orders]);

    // Reset cleared state after 1.5 seconds
    useEffect(()=>{
      if(cleared){
        const timeout = setTimeout(()=>setCleared(false),1500);
        return () => clearTimeout(timeout); 
      }
    },[cleared]);  

    // DataGrid columns
    const columns = [
      { field: 'id', headerName: 'Order ID',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isSmallScreen ? 80 : 120  },    
      { field: 'customer_name', headerName: 'Customer Name',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isSmallScreen ? 140 : 180 },
      { field: 'customer_phone', headerName: 'Phone No.',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell',  width: isSmallScreen ? 100 : 140 },
      { field: 'customer_email', headerName: 'Email ID',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isSmallScreen ? 120 : 160  },
      { field: 'customer_address', headerName: 'Address',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isSmallScreen ? 160 : 200 },
      { field: 'order_date', headerName: 'Order Date',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isSmallScreen ? 140 : 160 },
      { field: 'items_ordered',headerName: 'Items Ordered',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell',width: isSmallScreen ? 160 : 200},   
      { field: 'order_price', headerName: 'Order Price (₹)',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isSmallScreen ? 100 : 140 },
      { field: 'payment_mode', headerName: 'Payment Mode',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isSmallScreen ? 140 : 160},
      { field: 'delivery_method', headerName: 'Delivery Method',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isMediumScreen ? 180 : 140 },
      { field: 'staff_id', headerName: 'Delivery Person ID',headerClassName: 'super-app-theme--header',cellClassName: 'super-app-theme--cell', width: isMediumScreen ? 140 : 100 },
      { field: 'status',
         headerName: 'Status',
         headerClassName: 'super-app-theme--header',
         cellClassName: 'super-app-theme--cell',
         width: isMediumScreen ? 140 : 100,
         renderCell: renderStatus },   
    ];

    return( 
      <Box sx={{marginTop:'16px'}}> 
        <Container>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',marginRight:'24px'}}>
            <Typography variant='h1'sx={{flexGrow:2,padding:2}}>Restaurant Orders</Typography> 
            {/* Date Picker for viewing orders based on dates */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{display:'flex',justifyContent:'center',mt:3}}>
              <DatePicker
                label='View order history' 
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue || null)}
                disableFuture // Disable future dates 
                // Customizing the input field appearance
                slotProps={{
                  field: {
                    clearable: true,    // Enable field clearing
                    onClear: () => {
                      setSelectedDate(null); // Clear the date value to empty
                      setCleared(true); // Handle clear event 
                    }
                  },   
                }}  
              />  
              </Box> 
            </LocalizationProvider>    
          </Box>
          <Box
            sx={{ 
                height: isSmallScreen ? '400px' : '600px',  // Adjust height based on screen size
                width: isSmallScreen ? '100%' : '80%',      // Control width dynamically
                maxWidth: '1000px',   // Prevent grid from expanding too much
                overflow: 'auto',     // Add scrolling if necessary
                margin: 'auto',       // Center the grid horizontally
                position: 'relative', // Needed for the overlay
            }}
          >
          {/* Overlay message when no orders are available */}    
          {filteredOrders.length===0 && (    
            <Alert
              severity='info'
              sx={{
                position:'absolute',
                top:'50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,  
              }}
            >
                No order history found for the selected date.
            </Alert>
          )}  
          {/* DataGrid for displaying order data */}
          <DataGrid
            rows={filteredOrders}  // Use filtered orders here
            columns={columns} // Column configuration
            pagination // Enable pagination
            paginationModel={paginationModel}
            onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
            pageSizeOptions={[5,10,25,50,100]}  
            paginationMode="client" // Enable client-side pagination 
            slots={{
              toolbar: GridToolbar,    // Add GridToolbar for filtering, exporting, etc.
            }}     
            sx={{
              marginBottom:'16px',
              // Styling the DataGrid
              '& .super-app-theme--header': {
                backgroundColor: 'secondary.main',
                color:'text.primary',
                fontSize:'16px',
                fontWeight:'bold',
              }, 
              '& .super-app-theme--cell': {
                textAlign: 'center', // Center-align cell content
                justifyContent: 'center',
              }, 
              '& .MuiDataGrid-toolbarContainer': {
                backgroundColor: '#e0e0e0', // Toolbar background color
                borderBottom: '2px solid #1976d2', // Toolbar border  
              },
            }}
          />
          </Box>
        </Container> 
      </Box>        
    ); 
}