import React,{ useState, useEffect }  from 'react';
import {Grid2,Container, Typography, Box,Dialog, DialogTitle, DialogActions,Snackbar } from '@mui/material'; 
import MuiAlert from '@mui/material/Alert';
import { getMenuItem,getCategories, createMenuItem, updateMenuItem, deleteMenuItem } from '../services/api';  // Axios API call 
import MenuCard from '../menu_components/menucard';   // Component to display individual menu items 
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon 
import AddItemDialog from '../menu_components/additem_dialog';
import CustomButton from '../elements_components/custom_button';


export default function MenuManagement() {   
  const [menuItems,setMenuItems] = useState([]);  // State to store fetched menu items
  const [categories,setCategories] = useState([]);  // State to store categories  
  const [dialogOpen,setDialogOpen] = useState(false) ; // State to control dialog visibility 
  const [selectedItem,setSelectedItem] = useState(null); // State to track item to edit 
  const [confirmOpen,setConfirmOpen] = useState(false); // State to track delete dialog visibility 
  const [isStaff, setIsStaff] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility

  useEffect(() => {
    // Retrieve user role from sessionStorage or localStorage
    const user = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'staff') {
        setIsStaff(true);
    }
  }, []);
  
  // Fetch menu items on component mount   
  useEffect(()=>{  
    getMenuItem()
      .then((response)=>setMenuItems(response.data))    // Store the fetched data in state 
      .catch((error)=>console.error('Error fetching menu items :',error));   // Handle any errors  
  },[]);

  // Fetch categories on component mount
  useEffect(()=>{
    getCategories()
      .then((response)=>setCategories(response.data))   // Store the fetched data in state 
      .catch((error)=>console.error('Error fetching the categories :',error));  // Handle any errors  
  },[]);  

  // Function to group menu items by category
  const getItemsByCategory = (categoryID) => menuItems.filter((item)=>item.category.id === categoryID); 
  // arrow function that takes a categoryId as a parameter. 
  // The function will return a list of menu items that belong to the given categoryId.
  //The .filter() method creates a new array containing only the items that meet the condition inside the callback function.

  // Function to open the dialog
  const handleOpenDialog = (item = null) => {
    setSelectedItem(item); // Save the selected item (or null if adding a new one)
    setDialogOpen(true); // Open the dialog 
  };
  // Function to close the dialog
  const handleCloseDialog = () => { 
    setSelectedItem(null);  // Clear selected item
    setDialogOpen(false); // Close the dialog  
  }; 
  // Function to handle item addition - async function that takes formData as an argument 
  const handleAddItem = async (formData) => {
    try {
      await createMenuItem(formData);  // Send formData to the backend - This call is awaited, meaning the function will pause until the promise is resolved.
      setMenuItems([...menuItems,formData]); // Update the menu items in the state - The spread operator (...menuItems) creates a new array containing all previous items and appends newItem to it.
      setOpenSnackbar(true);
      handleCloseDialog(); // Close the dialog
    } catch (error) {
      console.error('Error adding item :',error);  // Handle any errors  
    } 
  };
  
   // Function to handle item updating - async function that takes formData and id as an argument 
  const handleUpdateItem = async(id,formData) => {
    try {
      await updateMenuItem(id,formData);  // Send formData to the backend based on the correct id 
      setMenuItems(menuItems.map((item)=>(item.id === id ? {...formData,id} : item))); // Update the menu items in the state based on item id 
      handleCloseDialog();  // Close the dialog
    } catch (error) {
      console.error('Error updating item :',error);  // Handle any errors  
    }
  };

  // Function to open the confirmation dialog
  const handleOpenConfirm = (item) => {
    setSelectedItem(item);
    setConfirmOpen(true); 
  };
  // Function to close the confirmation dialog
  const handleCloseConfirm = () => {
    setSelectedItem(null);
    setConfirmOpen(false); 
  };
  
  // Function to handle item deletion - async function 
  const handleDeleteItem = async() => {  
    try {
      await deleteMenuItem(selectedItem.id);   // Delete item from backend
      setMenuItems(menuItems.filter((item)=>(item.id !== selectedItem.id)));   // filter the items that does'nt match the id and updates the state
      handleCloseConfirm();  // Close the dialog 
    } catch (error) {
      console.error('Error deleting item:', error);  // Handle any errors  
    }
  }; 

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

    return(  
      <>
        <Box sx={{marginTop:'16px'}}> 
          <Container style={{minWidth:'700px'}}  >     
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px',marginRight:'24px'}}>  
              <Typography variant='h1'sx={{flexGrow:2,padding:2}}>Restaurant Menu</Typography> 
              <CustomButton
                variant='contained' 
                startIcon={<AddIcon/>}
                sx={{backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}
                onClick={()=>handleOpenDialog()}      // Open dialog for adding new item 
              >Add Item</CustomButton> 
            </Box>
            <Box sx={{marginBottom:'16px'}}>
            {categories.map((category)=>(
              <div key={category.id} style={{marginBottom:'32px'}}>  {/* Display the category heading */}
                <Typography variant='h2' sx={{marginBottom:'16px',fontWeight:'bold'}}>{category.name}</Typography>
                <Grid2 
                container                 // Grid2 container to hold menu items 
                spacing={2} 
                justifyContent='space-evenly' // Spread items evenly across the row and Ensure consistent card height
                >      
                  {/* Display the menu items for this category */}  {/* (category.id) ensures only the menu items that belong to the current category are displayed under that heading. */}
                  {getItemsByCategory(category.id).map((item)=>(           
                  <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id} sx={{marginBottom:'16px'}}>   {/* Grid item for each menu card */}
                    <MenuCard item={item} onEdit={()=>handleOpenDialog(item)} onDelete={()=>handleOpenConfirm(item)} isStaff={isStaff}/>      {/* Pass each menu item as a prop to MenuCard */} {/* Open dialog for editing */}  {/* Pass delete handler */} {/* Pass user role */}
                  </Grid2>     
                  ))}
                </Grid2>    
              </div>   
            ))}  
            </Box>  
          </Container> 
          </Box> 
          {/* Add Item Dialog */}
          <AddItemDialog
            open = {dialogOpen} 
            onClose = {handleCloseDialog} 
            categories = {categories} // Pass categories for the dropdown
            initialData = {selectedItem}  // Pass the selected item data  
            isStaff = {isStaff}  // pass the user role 
            onAddItem = {selectedItem ? handleUpdateItem : handleAddItem} // Pass the function to handle item addition or editing 
          />

            {/* Centralized confirmation dialog for delete*/}   
            <Dialog open={confirmOpen} onClose={handleCloseConfirm}>   
                <DialogTitle>Are you sure, you want to delete {selectedItem?.name} ? This action cannot be undone.</DialogTitle>  
                <DialogActions>
                    <CustomButton onClick={handleCloseConfirm} size='small'sx={{backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}>Cancel</CustomButton>
                    <CustomButton onClick={handleDeleteItem} size='small'sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}>Confirm</CustomButton>    
                </DialogActions>
                <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}  
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <MuiAlert onClose={handleSnackbarClose} severity="error" variant="filled" >
                        Item deleted.
                    </MuiAlert> 
                </Snackbar> 
            </Dialog>   
        </>  
    ); 
}