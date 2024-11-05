import React, { useState, useEffect } from 'react';
import { Accordion,  AccordionSummary,  AccordionDetails,  Typography,  Box, Dialog,  DialogActions,  DialogContent,  DialogContentText,  DialogTitle, Snackbar, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAlert from '@mui/material/Alert';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CustomButton from '../elements_components/custom_button';

const offers = [
    {
        title: 'Chettinad Delights',
        description: "Special offer of 50% on Chettinad cuisine today!", 
        images: [
            { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCd6Jj0ZEhiiIw0cGEpVXfr4AAMPjq10lwUA&s", title: "Chettinad Crab Masala" },
            { src: "https://www.whiskaffair.com/wp-content/uploads/2015/08/Kuzhi-Paniyaram-2-3.jpg", title: "Chettinad Kuzhi Paniyaram" },
            { src: "https://i.ytimg.com/vi/kyTaeNjLQWs/maxresdefault.jpg", title: "Chettinad Vellai Paniyaram" },
            { src: "https://www.yummytummyaarthi.com/wp-content/uploads/2020/06/1-31.jpg", title: "Chettinad Kavuni Arisi" },
            { src: "https://images.boldsky.com/fit-in/600x338/ta/img/2024/03/mutton-uppukari-big-1711249189.jpg", title: "Chettinad Mutton Uppu Kari" },
            { src: "https://i.ytimg.com/vi/ClxcL2IQBVs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBxp2MQ1Tei6KH7PBPWvlpETSehHA", title: "Chettinad Brinjal Curry" },
        ]
    },
    {
        title: "North Indian Feast",
        description: "Discounts on North Indian dishes!",
        images: [
            { src: "https://img-cdn.thepublive.com/fit-in/1200x675/filters:format(webp)/newsnation/media/post_attachments/images/2024/02/17/dal-makhani-recipe-96.jpg", title: "Dal Makhani" },
            { src: "https://www.cookingandme.com/wp-content/uploads/2011/02/5457756163_5051a6c2b5.webp", title: "Aloo Paratha" },
            { src: "https://gimmerecipe.com/wp-content/uploads/elementor/thumbs/malai-kofta-curry-qs9zudbo79ywl7gq7fkxxil5xcs5bbfgqyl3282nq4.webp", title: "Malai Kofta" },
            { src: "https://boxedhalal.com/cdn/shop/articles/Keema-Kachori-03.jpg?v=1600273628&width=2048", title: "Kachori" },
            { src: "https://images.news18.com/ibnkhabar/uploads/2021/09/Shahi-Paneer.jpg", title: "Shahi Paneer" }, 
            { src: "https://foodess.com/wp-content/uploads/2023/02/Butter-Naan-3.jpg", title: "Butter Naan" },
        ],
    },
];

const QuiltedImageList = ({ images }) => {
    return (
        <ImageList
            sx={{ width: '100%', height: 'auto' }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {images.map((item, index) => (
                <ImageListItem key={index} cols={1} rows={1}>
                    <img
                        src={`${item.src}?w=121&h=121&fit=crop&auto=format`}
                        srcSet={`${item.src}?w=121&h=121&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

const OffersAccordion = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentOffer, setCurrentOffer] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isStaff, setIsStaff] = useState(false); 

    useEffect(() => {
      // Retrieve user role from sessionStorage or localStorage
      const user = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'staff') {
          setIsStaff(true);
      }
    }, []);

    const handleEditClick = (offer) => {
        setCurrentOffer(offer);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setCurrentOffer(null);
    };

    const handleSave = () => {
        // Save the edited details (you can add your saving logic here)
        setSnackbarOpen(true);
        handleDialogClose(); // Close the dialog after saving
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box>
            {offers.map((offer, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h5" fontWeight='bold'>{offer.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{offer.description}</Typography>
                        <QuiltedImageList images={offer.images} />
                        <CustomButton
                            onClick={() => handleEditClick(offer)} disabled={isStaff} 
                            sx={{marginTop:2, backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}
                        >
                            Edit
                        </CustomButton> 
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Dialog for editing offer details */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Edit Offer Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can edit the offer details here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Offer Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentOffer ? currentOffer.title : ''}
                        onChange={(e) => setCurrentOffer({ ...currentOffer, title: e.target.value })}
                    />
                    <TextField
                        margin="dense" 
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentOffer ? currentOffer.description : ''}
                        onChange={(e) => setCurrentOffer({ ...currentOffer, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <CustomButton onClick={handleDialogClose}  sx={{backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}>Cancel</CustomButton>
                    <CustomButton onClick={handleSave} sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}>Save</CustomButton>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >  
                <MuiAlert onClose={handleSnackbarClose} severity="success" variant="filled" >
                   Offer details saved successfully!
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default OffersAccordion;
