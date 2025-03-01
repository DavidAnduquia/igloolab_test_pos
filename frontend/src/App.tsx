import TableProducts from "../src/components/products/tableProducts";
// import { useEffect, useState } from "react";
// import { Product, ProductClass } from "./models/product.model";
// import ProductService from "./services/product.service";
import ProductForm from "./components/products/productForm"; 
import { Alert, Button, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { setFormComplete } from "./slices/productsSlice";


export default function App() {

  const dispatch = useDispatch<AppDispatch>();
  const { 
          products, loading,
          error, selectedProduct, formComplete 
        } = useSelector((state: RootState) => state.products);

  // Boton para cerrar el snackbar confirmacion de cambios.           
  const handleCloseConfirmation = () => {
    dispatch(setFormComplete(false));
  }
 
  if (loading && !products) {
      return <div>Cargando...</div>;
  }

  if (error) {
      return <div>Error al obtener productos: {error.message}</div>;
  }
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-blue-100">
      {!formComplete}
      <div className="mb-4">
    
      <Snackbar open={formComplete} 
      autoHideDuration={3000} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => handleCloseConfirmation}>
        <Alert onClose={handleCloseConfirmation} severity="success" sx={{ width: '100%' }}>
          Se ha registrado el cambio con éxito.
        </Alert>
      </Snackbar>

      </div>
      {!selectedProduct ? ( 
          <TableProducts />
        ) : (
          <div className="w-90">
            <ProductForm />
          </div>
       )
      }
    </div>
  );
} 