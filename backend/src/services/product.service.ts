import Product from "../models/product.model";
import ProductClass from "../models/product.model";

export class ProductService {
    async getProducts(){
        const products = await Product.findAll(
            {
                order: [['id', 'DESC']]
            }
        );
        return products;
    }

    async createEditProduct(dataProduct: any){
        try {
 
            // Si el registro viene con un id es para ediccion de lo contrario es nuevo
            if(dataProduct && dataProduct.id){

                const product = await Product.findByPk(dataProduct.id);
                if(!product){
                    throw new Error('Producto no encontrado.');
                } 

                await product.update(dataProduct);
                return product;
            }
            
            dataProduct.status = true;
            const newProduct = await Product.create(dataProduct);
            return newProduct;

        } catch (error:any) {
            throw new Error(`Error en el service createEditProduct. ${error.message}`);
        }
    }

    async deleteProduct(id : number){

        if(id && id <= 0){
            throw new Error('Id no valido.');
        }

        const product = await Product.findByPk(id);
        
        if(!product){
            throw new Error('Producto no encontrado.');
        }

        product.status = false;
        product.updatedat = new Date();
        await product.save();
        return product;
    }
}