import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import '../Signup.css'; 
function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    handle: '',
    address: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí es donde enviarías los datos al backend usando fetch o axios
    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Manejar éxito (redireccionar, mostrar mensaje, etc.)
      } else {
        // Manejar error
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 450, margin: 'auto', radius: 100, padding: 2, boxShadow: 4 }}
    >
      <Typography variant="h5" align="center">
        Crear cuenta
      </Typography>
      <TextField
        label="Nombre"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Apellido"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        type="email"
      />
      <TextField
        label="Handle (e.g., @kingofbeers)"
        name="handle"
        value={formData.handle}
        onChange={handleChange}
        required
      />
      <TextField
        label="Dirección (opcional)"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <TextField
        label="Confirmar Contraseña"
        name="passwordConfirmation"
        type="password"
        value={formData.passwordConfirmation}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Registrarse
      </Button>
    </Box>
  );
}

export default Signup;
