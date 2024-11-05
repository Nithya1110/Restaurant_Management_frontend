import React, { useState } from 'react';
import { Card,CardContent,CardActions,Typography,FormControlLabel,Switch} from '@mui/material';
import { updateMenuItem } from '../../services/api';
import CustomButton from '../elements/custom_button';

export default function MenuCard ({item,onEdit,onDelete,isStaff}){  
    
    const [available,setAvailable] = useState(item.available);    // Local state to track availability changes 

    // Handler function to toggle availability 
    const handleToggle = async(e) => {   
        const newAvailability = e.target.checked;
        setAvailable(newAvailability);    // Update local state 
        // updated data 
        const updatedData = {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category.id, // Ensure category is sent as an ID
            available: newAvailability,   
        };
        console.log('Sending data:', updatedData); // Log data before sending
        try {
            await updateMenuItem(item.id,updatedData);  // update the backend 
            console.log('Availability updated successfully');  
        } catch (error) {
            console.error('Error updating availability:', error);
            setAvailable(item.available); // Revert state if the update fails
        }
    };

    return (
        <Card sx={{ width: 300, margin: 'auto',height:420}}> 
            <img
              src={item.image_url}  
              alt={item.name}   
              style={{width:'100%',height:'185px',objectFit:'cover',borderRadius:'12px 12px 0 0'}} 
            />  
            <CardContent> 
                <Typography variant='h4'fontWeight={'bold'}>{item.name}</Typography> 
                <Typography variant='body2'>{item.description}</Typography>
                <Typography variant='h6'>₹{item.price}</Typography>  
                {/* Read-only switch to display availability */} 
                <FormControlLabel   
                   control={    
                    <Switch 
                      checked = {available}          
                      onChange={handleToggle}      // Call handler on change
                    />        
                   }      
                   label = {item.available ? 'Available':'Out of stock'}   
                />    
            </CardContent>
            <CardActions>
                <CustomButton 
                size='small'
                sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}
                onClick={onEdit}     
                disabled={isStaff && item.category.id !== 1 } 
                >    {/* Trigger edit dialog */}  
                   Edit
                </CustomButton>    
                <CustomButton 
                size='small'
                sx={{backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}
                onClick={onDelete}  
                disabled={isStaff && item.category.id !== 1} 
                >    {/*Open confirmation dialog*/}   
                    Delete
                </CustomButton>      
            </CardActions>   
        </Card>
    );
}