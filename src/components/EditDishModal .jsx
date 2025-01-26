import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const EditDishModal = ({ dish, onSave, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    id: dish?._id || "",
    name: dish?.name || "",
    description: dish?.description || "",
    price: dish?.price || 0,
    category: dish?.category || "",
    inStock: dish?.inStock || false,
  });

  const [errors, setErrors] = useState({});

  // Reset form data when dish changes
  useEffect(() => {
    setFormData({
      id: dish?._id || "",
      name: dish?.name || "",
      description: dish?.description || "",
      price: dish?.price || 0,
      category: dish?.category || "",
      inStock: dish?.inStock || false,
    });
  }, [dish]);

  const handleClose = () => {
    console.log("Closing modal...");
    onClose(); // Call the parent's close handler
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    setFormData((prev) => ({ ...prev, inStock: e.target.checked }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return; // Stop if validation fails
    console.log("Saving data:", formData);
    onSave(formData); // Trigger save callback with updated form data
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="edit-dish-title"
      aria-describedby="edit-dish-description"
    >
      <Box sx={modalStyle}>
        <Typography id="edit-dish-title" variant="h6" component="h2" mb={2}>
          Edit Dish
        </Typography>
        <Box
          component="form"
          sx={{
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
            error={!!errors.name}
            helperText={errors.name}
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
            error={!!errors.price}
            helperText={errors.price}
            fullWidth
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.inStock}
                onChange={handleSwitchChange}
                name="inStock"
              />
            }
            label="In Stock"
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
  );
};

export default EditDishModal;
