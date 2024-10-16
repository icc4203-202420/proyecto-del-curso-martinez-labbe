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

    const handleSumbit = (values) => { 
        if (values.email && values.password) { 
            setIsAuthenticated(true);
        }
        else{
            Alert.alert('Error', 'Email y Password son requeridos');
        }
    };

    return (
        <Formik
            initialValues={{email:'', password:''}}
            validationSchema={validationScheam}
            onSubmit={handleSumbit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={style.container}>
                    <Input
                        placeholder='Email'
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        errorMessage={errors.email && touched.email ? errors.email : null}
                    />
                    <Input
                        placeholder='Password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        SecureTextEntry
                        errorMessage={errors.password && touched.password ? errors.password : null}
                    />
                    <Button title='Iniciar Sesión' onPress={handleSubmit} />
                    <Button title='No tienes cuenta? Registrate' onPress={() => navigation.navigate('Register')}
                        color={'Blue'} 
                    />
                </View>
            )}
        </Formik>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9a825',

    },
});