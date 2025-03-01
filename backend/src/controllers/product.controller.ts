import { ProductService } from "../services/product.service";
import { Request, Response } from 'express';

const productService = new ProductService();

export class ProductController {

    async getProducts(req: Request,res: Response): Promise<void> {
        try {
            const products = await productService.getProducts(); 
            res.status(200).json(products);
        } catch (error:any) {
            res.status(500).json({ message:  `${error.message}` });
        }
    }

    async createEditProduct(req: Request, res: Response): Promise<void> {
        try {
            const createEditProduct = await productService.createEditProduct(req.body);
            res.status(201).json(createEditProduct);
        } catch (error:any) {
            res.status(500).json({ message: `${error.message}` });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const editProduct = await productService.deleteProduct(Number(id));
            res.status(200).json(editProduct);
        } catch (error:any) {
            res.status(500).json({ message: `${error.message}` });
        }
    }
}