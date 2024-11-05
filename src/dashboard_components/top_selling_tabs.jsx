import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Card, CardContent } from '@mui/material';

const items = [
    { name: 'Finger Fish', description: 'Crispy, deep-fried fish fillets, served with tangy dipping sauces, known for its flaky texture and delightful crunch.', price: 300, image_url: 'https://i.postimg.cc/cJ3nsKm2/How-to-make-fish-finger.jpg' },
    { name: 'Onion Rava Dosa', description: 'A crispy, thin crepe made from a fermented batter of semolina (rava) and rice flour, topped with chopped onions.', price: 150, image_url: 'https://www.maggi.in/sites/default/files/styles/home_stage_944_531/public/srh_recipes/425104d631c6cbb36023a80f63a52bf8.jpg?h=06f6671c&itok=5kAlq5YO' },
    { name: 'Rasmalai', description: 'A delectable North Indian dessert made from soft spongy cottage cheese balls soaked in a rich, creamy milk syrup.', price: 220, image_url: 'https://i.ytimg.com/vi/NVA6tceBry0/maxresdefault.jpg' },
];

export default function TopSellingTabs () {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
      };
    return(
        <Box sx={{ width: '100%', marginTop: 2 }}> 
            {/* Heading for the Top Selling Items */}
            <Typography variant="h3" fontWeight="bold" align="center" color='secondary.dark' gutterBottom>
              Top Selling Items
            </Typography>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary" 
              textColor="primary"
              centered
              sx={{ marginBottom: 2 }}
            >
                {items.map((item, index) => (
                 <Tab key={index} label={item.name} />
                ))}   
            </Tabs>
            {items.map((item, index) => (
              <Box
                key={index}
                role="tabpanel"
                hidden={selectedTab !== index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                 {selectedTab === index && (
                    <Card sx={{ width: 300, margin: 'auto', height: 350 }}>
                      <img
                      src={item.image_url}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: 185,
                        objectFit: 'cover',
                        borderRadius: '12px 12px 0 0',
                      }}
                      />
                      <CardContent>
                        <Typography variant="h5" fontWeight="bold">
                           {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                           {item.description}
                        </Typography>
                        <Typography variant="h6">₹{item.price}</Typography>
                      </CardContent>
                    </Card>
                 )}
              </Box>
            ))}
        </Box>
    );
}