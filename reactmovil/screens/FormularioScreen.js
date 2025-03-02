import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FormularioScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const product = route.params?.product;
    const saveProduct = route.params?.saveProduct;

    const [name, setName] = useState(product?.name || '');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState(product?.price || '');
    const [id, setId] = useState(product?.id || new Date().getTime());

    const handleSave = () => {
        if (!name.trim() || !description.trim() || !price.trim()) {
            Alert.alert('Validation Error', 'All fields are required');
            return;
        }

        const newProduct = {
            id,
            name: name.trim(),
            description: description.trim(),
            price: price.trim(),
            status: product?.status || false,
            createdat: product?.createdat || new Date().toISOString(),
            updatedat: new Date().toISOString(),
        };

        if (saveProduct) {
            saveProduct(newProduct);
        }

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripcion"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button title="Guardar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
});

export default FormularioScreen;
