import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const initialData = [
    { id: 5, name: 'Monitor', description: 'Monitor 4K de 27 pulgada', price: '379.89', status: false, createdat: '2025-02-28T10:19:27.448Z', updatedat: '2025-03-01T13:01:05.503Z' },
    { id: 4, name: 'Keyboards', description: 'Teclado bluethoot retroiluminado', price: '89.95', status: true, createdat: '2025-02-28T10:19:27.448Z', updatedat: '2025-03-01T09:41:22.362Z' },
    { id: 3, name: 'Headphones', description: 'Auriculares inalámbricos con cancelación de ruido', price: '199.99', status: false, createdat: '2025-02-28T10:19:27.448Z', updatedat: '2025-03-01T13:06:25.384Z' },
    { id: 2, name: 'Smartphone', description: 'Teléfono inteligente con cámara de 13MP', price: '799.49', status: false, createdat: '2025-02-28T10:19:27.448Z', updatedat: '2025-03-01T13:06:33.149Z' },
    { id: 1, name: 'Laptop', description: 'Laptop de alta gama con procesador i7', price: '1200.99', status: true, createdat: '2025-02-28T10:19:27.448Z', updatedat: '2025-03-01T01:58:51.726Z' }
];

const ListProdutScreen = () => {
    const [products, setProducts] = useState(initialData);
    const navigation = useNavigation();

    const handleEditProduct = (product) => {
        navigation.navigate('Formulario', { product, saveProduct });
    };

    const handleAddProduct = () => {
        navigation.navigate('Formulario', { product: null, saveProduct });
    };

    const saveProduct = (newProduct) => {
        setProducts(prevProducts => {
            const index = prevProducts.findIndex(p => p.id === newProduct.id);
            if (index !== -1) {
                const updatedProducts = [...prevProducts];
                updatedProducts[index] = newProduct;
                return updatedProducts;
            }
            return [...prevProducts, newProduct];
        });
    };

    const renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => handleEditProduct(item)}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                <ListItem.Subtitle>{`Price: $${item.price}`}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon name="edit" type="material" onPress={() => handleEditProduct(item)} />
        </ListItem>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <Button title="Agregar Producto" onPress={handleAddProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ListProdutScreen;
