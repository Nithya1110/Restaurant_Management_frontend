import React, { useState,useEffect, useMemo } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Switch,FormControlLabel,Typography,} from '@mui/material';

export default function AddItemDialog ({open,onClose,categories,initialData,isStaff,onAddItem}) {   

    // Memoize the initial form state to avoid re-creation on every render 
    const initialFormState = useMemo (()=>({
        name: '',
        description: '', 
        image_url: '', 
        price: '',    
        category: '',  // Default to 'Today's Special' for staff
        available: false,
    }),[]); // useMemo ensures that the initialFormState object is only created once (on the first render) and persists across re-renders.
    
    // If initialData is provided, use it to pre-fill the form, otherwise use initialFormState
    const [formData,setFormData] = useState(initialData||initialFormState); // Used to keep track of dynamic data that can change over time.
    const [errors, setErrors] = useState({}); // State to track validation errors
    
    // When the dialog opens, set the form data based on the initialData (for edit) or reset it
    useEffect (()=>{
        if(open) {   
            const updatedFormData = initialData 
              ? {...initialData,category:initialData.category?.id||''}   
              : initialFormState;
            setFormData(updatedFormData);   
            setErrors({}); // Reset errors on open   
        }      
    },[open,initialData,initialFormState]);  // If you reference a variable or function from outside the useEffect, you need to include it in the dependency array. 
    // The dependency array [open] ensures that the useEffect is called whenever open changes.

    //When the user interacts with these fields, it updates the form’s state using the handleChange function.
    // Function to handle changes 
    const handleChange = (e) => { 
        const {name,type} = e.target;   
        const value = type === 'checkbox' ? e.target.checked : e.target.value; // correct value is captured based on the type of input field.
        setFormData({ ...formData, [name]: value }); // Update state properly.
    };   // Whenever the user interacts with an input element, the event (e) carries data about the input field that triggered it.
        // From e.target, we extract - name: The name attribute of the input,type: The type of the input element.
        // The [name]: value syntax dynamically updates the correct field.   
        
    // Validation function
    const validateForm = () => {
        const newErrors = {}; 
        if(!formData.name) newErrors.name =  'Name is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.image_url || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(formData.image_url))
            newErrors.image_url = 'Invalid image URL';
        if (!formData.price || !/^(?:\d*\.\d{2}|\d+)$/.test(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Price must be a positive number with two decimal places (e.g., 3.00, 4.82)';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };    

    // Function to handle form submission. 
    const handleSubmit = (e) => {
        e.preventDefault();  // calls e.preventDefault() to prevent the default form submission behavior.
        if (!validateForm()) return; // Stop if validation fails
        console.log('Submitting:', formData);  // Check the form data before sending
        if (formData.id){
            onAddItem(formData.id,formData);
        } else{
            onAddItem(formData) ;
        }     //  calls the onAddItem function (passed as a prop) with the current formData and id, triggering the parent component to handle the addition/update .
        onClose(); // Close the dialog after submitting 
    };     

    return (
        <Dialog open={open} onClose={onClose}>   
            <DialogTitle sx={{backgroundColor:'primary.dark',color:'white',textAlign:'center'}}> 
                <Typography variant='h3' color='white' fontWeight='bold'>{initialData?'Edit Item':'Add New Item'}</Typography> 
            </DialogTitle>
            <DialogContent sx={{backgroundColor:'background.default',padding:3}}>
                <form onSubmit={handleSubmit}> 
                    {/* Form fields go here */} 
                    {/* dropdown menu where the user can pick a category for the menu item */}
                    {/* Category Selection - restricted to "Today's Special" for staff */}
                    <FormControl fullWidth margin='normal'required error={!!errors.category}>
                    {!formData.category && (<InputLabel shrink={false}>Category</InputLabel>)}     
                        <Select name='category'value={formData.category}onChange={handleChange} 
                          sx={{ textAlign: 'left',
                          '&.MuiInputLabel-root':{
                             transition:'all 0.3s ease-in-out', 
                          }   
                          }}>
                            {isStaff ? (
                                categories.map((category) => (category.id === 1 ?
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                : ''
                                )) 
                            ) : (
                                categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))
                            )} 
                        </Select> 
                        {errors.category && <Typography color='error'>{errors.category}</Typography>}
                    </FormControl>  
                    {/* Text fields */}
                    <TextField
                     name='name'
                     label='Name'
                     value={formData.name}
                     onChange={handleChange}
                     fullWidth
                     margin='normal'
                     required
                     error={!!errors.name}
                     helperText={errors.name}
                    />
                    <TextField
                     name='description'
                     label='Description'
                     value={formData.description}
                     onChange={handleChange}
                     fullWidth
                     margin='normal'
                     multiline
                     rows={4}
                     required 
                     error={!!errors.description}
                     helperText={errors.description}
                    />
                    <TextField
                     name='image_url'
                     label='Image URL'
                     value={formData.image_url}
                     onChange={handleChange}
                     fullWidth
                     margin='normal'
                     multiline
                     rows={2} 
                     required
                     error={!!errors.image_url}
                     helperText={errors.image_url}
                    />
                    <TextField
                     name='price'
                     label='Price'
                     value={formData.price}
                     onChange={handleChange}
                     fullWidth
                     margin='normal'
                     required
                     error={!!errors.price}
                     helperText={errors.price}
                    />
                    {/* Availability toggle */}
                    <FormControlLabel
                     control={
                        <Switch
                         checked={formData.available}
                         onChange={handleChange}
                         name='available'
                        />
                     }
                     label={formData.available ? 'Available' : 'Out of stock'} 
                     sx={{ marginTop: 2 }}
                    />
                    <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                    <Button onClick={onClose} size='small'sx={{backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}>Cancel</Button>
                    <Button  type='submit'size='small'sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}>{initialData?'Update':'Submit'}</Button>  
                    </DialogActions>
                </form>
            </DialogContent> 
        </Dialog>   
    );
}