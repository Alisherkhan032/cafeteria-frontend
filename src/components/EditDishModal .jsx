import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const EditDishModal = ({ dish, onSave }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: dish.name,
    description: dish.description,
    price: dish.price,
    category: dish.category,
    inStock: dish.inStock,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData); // Trigger save callback with updated form data
    handleClose();
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={handleOpen}>
        <i className="fi fi-rr-edit"></i>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-dish-title"
        aria-describedby="edit-dish-description"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-dish-title" variant="h6" component="h2">
            Edit Dish
          </Typography>
          <Box
            component="form"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Stock"
              name="inStock"
              type="number"
              value={formData.inStock}
              onChange={handleChange}
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditDishModal;
