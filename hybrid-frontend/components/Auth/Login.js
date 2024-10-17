import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {Form, Formik} from 'formik';
import * as yup from 'yup';

const validationScheam=yup.object().shape({
    email:yup.string().email('Porfavor Ingresar un email valido...').required('Email es requerido'),
    password:yup.string().min(6, 'La contraseña requiere 6 caracteres').required('Password es requerido')
});


export default function Login({setIsAuthenticated, navigation}) {

    const handleSumbit = async (values) => {
        try {
            const response = await fetch('http://192.168.0.13:3001/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        email: values.email,
                        password: values.password,
                    },
                }),
            }); 
            const data = await response.json();

            if (response.status === 200) {
                alert('Login Exitoso');
                setIsAuthenticated(true);
                navigation.navigate('Home');
            } 
            else {
                alert('Error: ${data.status.message}');
            }
        } catch (error) {
            console.error('Error en el login:', error);
            alert('Error', 'Error en el login');
        }
    };
            
    return (
        <Formik
            initialValues={{email:'', password:''}}
            validationSchema={validationScheam}
            onSubmit={handleSumbit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={style.outercontainer}>
                    <View style={style.container}>
                        <Input style={style.inputText}
                            placeholder='Email'
                            placeholderTextColor='#f9a825'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            errorMessage={errors.email && touched.email ? errors.email : null}
                        />
                        <Input style={style.inputText}
                            placeholder='Password'
                            placeholderTextColor='#f9a825'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            SecureTextEntry
                            errorMessage={errors.password && touched.password ? errors.password : null}
                        />
                        <Button title='Iniciar Sesión' onPress={handleSubmit} />
                        <Button title='No tienes cuenta? Registrate' onPress={() => navigation.navigate('Register')}
                            color='#f9a825'
                        />
                    </View>
                </View>
            )}
        </Formik>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',  // Fondo del formulario
        padding: 20,
        borderRadius: 10,  // Esquinas redondeadas del formulario
        width: '90%',
        shadowColor: '#000',  // Sombra para resaltar el contenedor
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,  // Sombra para Android
    },
    inputText: {
        marginBottom: 10,
        color: '#f9a825',
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    outercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9a825'
    }
});