import {createTheme} from '@mui/material/styles'; 

// Light Theme   
const lightTheme = createTheme({
    palette:{
        primary:{
            main:'#A6C5F7',  // Light Blue as the primary color
            dark: '#2A6FB0',  // Dark Blue for hover or emphasis 
        },
        secondary:{
            main:'#F7CAC9',  // Pale Pink as the secondary color
            dark: '#B03A48',  // Dark Maroon for hover or emphasis   
        },
        background:{
            default:'#EBECED',  // Light Gray background  
        },
        text:{
            primary:'#2D3E50',  // Dark Navy for main text   
            secondary:'#4A4A4A',  // Dark Gray for secondary text
        },
    },
    typography:{
        fontFamily:'"Roboto","Helvetica","Arial","sans-serif"', // Base font family 
        h1:{
            fontSize:'2rem',  // Font size for <h1> headings
            fontWeight: 'bold',
            color: '#2D3E50',  // Dark Navy for headers
        },
        h2:{
            fontSize: '1.5rem',  // Font size for <h2> headings
            fontWeight: 'bold',
            color: '#4A4A4A',  // Dark Gray for subheadings
        },
        h3:{
            fontSize: '1.25rem',  // Font size for <h3> headings
            fontWeight: 'normal',
            color: '#4A4A4A',  // Dark Gray for subheadings
        }, 
        h4: {
            fontSize: '1rem',  // Font size for <h4> headings
            fontWeight: 'normal',
            color: '#4A4A4A',  // Dark Gray for smaller subheadings
          }, 
        h5: {
        fontSize: '1rem',  // Font size for <h5> headings
        fontWeight: 'normal',
        color: '#4caf50',   // light green   
        },  
        h6: {
            fontSize: '1rem',  // Font size for <h6> headings  
            fontWeight: 'normal',
            color: '#4caf50',  // light green 
          }, 
        body1:{
            fontSize:'1rem', // Regular paragraph text size
            fontWeight:'normal',
            color:'#2D3E50',  // Dark Navy for paragraphs
        },  
        body2:{
            fontSize:'0.875rem',  // Slightly smaller text for secondary paragraphs
            fontWeight:'normal',
            color: '#4A4A4A',  // Dark Gray for less important paragraph text 
        },
    },
    spacing:8, // 8px base unit for spacing
    breakpoints:{
        values:{ 
            xs:0,    // extra small (mobile)
            sm:600,  // small (tablet)
            md:960,  // medium (small desktop)
            lg:1280, // large (desktop)
            xl:1920, // extra large (wide screens) 
        },
    },
    components:{                                           // customize styles of specific mui components 
        MuiContainer:{                     
            styleOverrides:{                               // object that allows to modify default styles of mui container 
                root:{                                     // main class,applied styles will be added 
                    padding: theme => theme.spacing(2),    // padding - 16px
                    margin: theme => theme.spacing(3),     // margin - 24px  
                }, 
            },
        },
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius:8, // Rounded corners for all buttons
                    padding: '8px 16px',
                    textTransform:'none', // Prevents uppercase transformation
                    fontWeight: 'bold', 
                },
            },
        },
        MuiAppBar:{
            styleOverrides:{
                root:{
                    backgroundColor:'#2D3E50',  // Custom background color for appbar
                    boxShadow:'none',           // Remove default shadow
                    padding:'0 16px', 
                },
            }, 
        },
        MuiDrawer:{
            styleOverrides:{
                paper:{
                    backgroundColor:'#A6C5F7', // Light blue background for sidebar
                    color:'#FFFFFF', // Contrast text color    
                },
            },
        },
        MuiPopover:{
          styleOverrides:{
              paper:{
                  backgroundColor:'#A6C5F7', // Light blue background for sidebar
                  color:'#FFFFFF', // Contrast text color    
              },
          },
        }, 
        MuiBackdrop: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(255, 255, 255, 0.6)',  // Light translucent backdrop
            },
          },
        },
        MuiCard:{
            styleOverrides:{
                root:{
                    borderRadius:'10px',
                    boxShadow:'0 4px 8px rgba(0,0,0,0.1)',    // Subtle shadow 
                    transition: '0.3s', // Smooth hover effect
                    '&:hover':{
                        transform : 'scale(1.02)',   // Slight zoom on hover   
                    },
                },
            },
        }, 
        MuiDialog: {
          styleOverrides: {
            paper: {
              backgroundColor: '#FFFFFF', // Light background color for dialog
              borderRadius: '12px', // Softly rounded corners
              padding: '16px', // Consistent padding
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Light shadow for a subtle lift effect
              border: '1px solid #2C2C2C', // Dark gray border for a defined edge
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '& fieldset': {
                borderColor: '#CCCCCC',  // Light gray outline by default
              },
              '&:hover fieldset': {
                borderColor: '#1976D2',  // Blue outline on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976D2',  // Blue outline when focused
                borderWidth: '2px',      // Slightly thicker border when focused
              },
            },
          },
        },        
        MuiDataGrid: {
          styleOverrides: {
            root: {
              border: '2px solid #1976d2',
              borderRadius: '8px', // Rounded corners
              backgroundColor: '#ffffff', // Grid background
              '& .MuiDataGrid-row': {
                borderBottom: '1px solid #f0f0f0',
              },
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#f5f5f5',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#e3f2fd',
              },
              '& .MuiDataGrid-columnSeparator': {
                color:'#2D3E50'  
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#EBECED'      
              },
            },
          },
        },
        MuiTable: {
          styleOverrides: {
            root: {
              border: '2px solid #1976d2',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              '& .MuiTableCell-root': {
                borderBottom: '1px solid #f0f0f0',
              },
              '& .MuiTableRow-root:nth-of-type(odd)': {
                backgroundColor: '#f5f5f5',
              },
              '& .MuiTableRow-root:hover': {
            backgroundColor: '#e3f2fd',
          },
        },
      },
    },
    },    

});

export default (lightTheme);   