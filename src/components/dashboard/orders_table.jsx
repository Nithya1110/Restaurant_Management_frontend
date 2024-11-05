import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const orders = [
    { id: 50, items: "Chettinad Crab Masala (3)", price: 2400.00, status: "Canceled" },
    { id: 49, items: "Dal Makhani (2), Chicken Biryani (2), Aloo Paratha (3)", price: 1270.00, status: "Pending" },
    { id: 48, items: "Chicken Biryani (1), Chole Bhature (2), Motichoor Ladoo (1)", price: 695.00, status: "Out for Delivery" },
    { id: 47, items: "Rasmalai (2), Milagu Vadai (2)", price: 480.00, status: "Pending" },
    { id: 46, items: "Rasmalai (2), Pongal (1), Pongal (1)", price: 590.00, status: "Out for Delivery" },
    { id: 45, items: "Chettinad Crab Masala (2)", price: 1600.00, status: "Pending" },
  ];   

const OrdersTable = () => {
    return(
        <TableContainer component={Paper} sx={{ maxHeight: '300px' }}>
            <Table stickyHeader>
                {/* Table Head */}
                <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="subtitle1" fontWeight="bold">Order ID</Typography></TableCell>
                      <TableCell><Typography variant="subtitle1" fontWeight="bold">Items Ordered</Typography></TableCell>
                      <TableCell><Typography variant="subtitle1" fontWeight="bold">Price</Typography></TableCell>
                      <TableCell><Typography variant="subtitle1" fontWeight="bold">Status</Typography></TableCell>
                    </TableRow>
                </TableHead>
                {/* Table Body */}
                <TableBody>
                   {orders.map((order) => (
                    <TableRow key={order.id}>   
                     <TableCell>{order.id}</TableCell>
                     <TableCell>{order.items}</TableCell>
                     <TableCell>{order.price.toFixed(2)}</TableCell>
                     <TableCell>{order.status}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};  

export default OrdersTable;