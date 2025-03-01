import axios from 'axios';
import { Product } from '../models/product.model';

const API_URL = 'http://localhost:3030/api/product';

class ProductService {
    async getProducts(): Promise<Product[]> {
        try {
            const response = await axios.get(`${API_URL}/getProducts`);
            return response.data as Product[];
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    async createEditProduct(dataProduct:Product): Promise<Product> {
        try {
            const response = await axios.post(`${API_URL}/createEditProduct`, dataProduct);
            return response.data as Product;
        } catch (error) {
            console.error('Error al registrar producto:', error);
            throw error;
        }
    }

    async deleteProduct(id: number): Promise<Product> {
        try {
            const response = await axios.delete(`${API_URL}/deleteProduct/${id}`);
            return response.data as Product;
        } catch (error) {
            console.error('Error al editar usuario:', error);
            throw error;
        }
    }
}

export default ProductService;
