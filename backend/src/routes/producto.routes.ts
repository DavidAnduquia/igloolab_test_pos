import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { body  } from "express-validator";

const router = Router();
const productoController = new ProductController();

router.get("/api/product/getProducts", productoController.getProducts);
router.post("/api/product/createEditProduct", 
     [
        body('name').notEmpty().withMessage('El nombre del producto no puede ser nulo ni vacío.'),
        body('description').notEmpty().withMessage('La descripción del producto no puede ser nula ni vacía.'),
        body('price').isDecimal({ decimal_digits: '0,2' }).withMessage('El precio debe ser un número decimal.')
        .custom(value => value > 0).withMessage('El precio del producto no puede ser cero o menor a cero.')
    ],
    productoController.createEditProduct);
router.delete("/api/product/deleteProduct/:id", productoController.deleteProduct);

export default router;