import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Button,
  Modal,
  Box,
} from "@mui/material";

const Orders = () => {
  const { orderData } = useContext(MyContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOpenModal = (items) => {
    setSelectedItems(items);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItems([]);
  };

  // Màu theo payment method
  const getPaymentMethodColor = (method) => {
    switch (method?.toLowerCase()) {
      case "cod":
        return "info";
      case "credit":
        return "primary";
      case "paypal":
        return "secondary";
      case "momo":
        return "warning";
      default:
        return "default";
    }
  };

  // Màu theo payment status
  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "paid":
        return "success";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  // Màu theo order status
  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <section className="section">
      <div className="container-fluid">
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Payment ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Customer Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
                <TableCell sx={{ color: "#fff" }}>Address</TableCell>
                <TableCell sx={{ color: "#fff" }}>Payment Method</TableCell>
                <TableCell sx={{ color: "#fff" }}>Payment Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Order Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Subtotal</TableCell>
                <TableCell sx={{ color: "#fff" }}>Shipping</TableCell>
                <TableCell sx={{ color: "#fff" }}>Tax</TableCell>
                <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                <TableCell sx={{ color: "#fff" }}>Items</TableCell>
                <TableCell sx={{ color: "#fff" }}>Created At</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orderData.length > 0 ? (
                orderData.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell>{order._id || "N/A"}</TableCell>
                    <TableCell>{order.customer?.fullName}</TableCell>
                    <TableCell>{order.customer?.email}</TableCell>
                    <TableCell>{order.customer?.phone || "-"}</TableCell>
                    <TableCell>
                      {order.customer?.street}, {order.customer?.apartment && order.customer.apartment + ", "}
                      {order.customer?.city}, {order.customer?.state && order.customer.state + ", "}
                      {order.customer?.zipcode}, {order.customer?.country}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.paymentMethod?.toUpperCase() || "N/A"}
                        color={getPaymentMethodColor(order.paymentMethod)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.paymentStatus?.toUpperCase() || "PENDING"}
                        color={getPaymentStatusColor(order.paymentStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.orderStatus?.toUpperCase() || "PROCESSING"}
                        color={getOrderStatusColor(order.orderStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>${order.subtotal}</TableCell>
                    <TableCell>${order.shipping}</TableCell>
                    <TableCell>${order.tax}</TableCell>
                    <TableCell>${order.total}</TableCell>

                    {/* Items: hiển thị nút mở modal */}
                    <TableCell>
                      <Button variant="contained" size="small" onClick={() => handleOpenModal(order.items)}>
                        {order.items.length} item(s)
                      </Button>
                    </TableCell>

                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} align="center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Modal hiển thị items */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 3
              }}
            >
              <Typography variant="h6" mb={2}>Order Items</Typography>
              {selectedItems.map((item) => (
                <Typography key={item.productId}>
                  {item.productTitle} × {item.quantity}
                </Typography>
              ))}
              <Box mt={2} textAlign="right">
                <Button onClick={handleCloseModal} variant="contained">Close</Button>
              </Box>
            </Box>
          </Modal>
        </TableContainer>
      </div>
    </section>
  );
};

export default Orders;
