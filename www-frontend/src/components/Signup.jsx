import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Signup.css'; 

function Signup() {
  // Validación de campos usando Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Nombre es obligatorio'),
    lastName: Yup.string().required('Apellido es obligatorio'),
    email: Yup.string().email('Email no es válido').required('Email es obligatorio'),
    handle: Yup.string().required('Handle es obligatorio'),
    address: Yup.string(), // Campo opcional
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es obligatoria'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Confirmar contraseña es obligatorio'),
  });

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      handle: '',
      address: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Manejar éxito (redireccionar, mostrar mensaje, etc.)
        } else {
          // Manejar error
        }
      } catch (error) {
        console.error('Error al registrarse:', error);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 450, margin: 'auto', padding: 2, boxShadow: 4 }}
    >
      <Typography variant="h5" align="center">
        Crear cuenta
      </Typography>
      
      <TextField
        label="Nombre"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        required
      />
      
      <TextField
        label="Apellido"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        required
      />
      
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        required
      />
      
      <TextField
        label="Handle (e.g., @kingofbeers)"
        name="handle"
        value={formik.values.handle}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.handle && Boolean(formik.errors.handle)}
        helperText={formik.touched.handle && formik.errors.handle}
        required
      />
      
      <TextField
        label="Dirección (opcional)"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        required
      />
      
      <TextField
        label="Confirmar Contraseña"
        name="passwordConfirmation"
        type="password"
        value={formik.values.passwordConfirmation}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
        helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
        required
      />
      
      <Button type="submit" variant="contained" color="primary">
        Registrarse
      </Button>
    </Box>
  );
}

export default Signup;
