import { Product } from "../../models/product.model";
// import { ChangeEventHandler, useState } from "react";
import { TextField, Card, CardContent } from "@mui/material";
import Button from '@mui/material/Button'; 
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { clearProps, 
    createEditProduct, 
    fetchProducts, 
    validateInputChange, 
    setFormComplete, setSelectProduct,  
    validateErrorInputsAsync} from "../../slices/productsSlice"; 
 
const ProductForm = () => { 

    const dispatch = useDispatch<AppDispatch>();
    const { 
        error, selectedProduct, formComplete, errors 
      } = useSelector((state: RootState) => state.products);

    // Limpia item seleccionado y vuelve a mostrar la tabla
    const handleClearProps = () => { 
        dispatch(clearProps());
        dispatch(setSelectProduct(null));
    };
    
    const handleInputChange = (field: keyof Product) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(validateInputChange({ field, value: event.target.value }));
    };

    const handleCreateEdit = async(event: React.FormEvent) => { 
            event.preventDefault();
            //dispatch(validateErrorInputs());    
            const errorInput = (await dispatch(validateErrorInputsAsync())).payload as { name: boolean; description: boolean; price: boolean };
              
            if (!errorInput.name && !errorInput.description && !errorInput.price) {
                
                if(!selectedProduct){
                    return;
                }
                
                await dispatch(createEditProduct(selectedProduct)).then(() => {
                    dispatch(fetchProducts())
                }).finally(() => {
                    dispatch(clearProps());
                    dispatch(setFormComplete(true));
                });

            }
    };
   
    return (  
        <Card className="w-full sm:w-full flex justify-start p-2">        
            <CardContent>
            <div className="w-full flex justify-center items-center sm:justify-start sm:items-left"> 
                <Button variant="contained" onClick={handleClearProps}>Volver</Button> 
            </div>
            
            <div className="p-5 align-center">

                <form className="mt-1 mb-2 ">

                <p> Formulario de registro de productos </p>

                <div className="mt-5 mb-1 flex flex-col  gap-3"> 

                <TextField id="outlined-basic" label="Nombre del producto" variant="outlined"
                    onChange={handleInputChange('name')} 
                    value={selectedProduct?.name || ''}
                    error={errors.name}
                    helperText={errors.name ? 'El nombre es obligatorio.' : ' '} 
                /> 

                <TextField
                    id="outlined-multiline-flexible"
                    label="Descripción"
                    multiline
                    value={selectedProduct?.description || ''}
                    onChange={handleInputChange('description')}
                    maxRows={3}  
                    error={errors.description}
                    helperText={errors.description ? 'La descripcion es obligatorio.' : ' '} 
                />

                <TextField
                    id="outlined-multiline-flexible"
                    label="Precio"
                    multiline
                    value={selectedProduct?.price} 
                    onChange={handleInputChange('price')}
                    maxRows={3}
                    error={errors.price}
                    helperText={errors.price ? 'El precio es obligatorio y tiene que ser mayor 0' : ' '} 
                /> 
                </div> 

                <div className="mt-7">
                    <Button variant="outlined" 
                    onClick={handleCreateEdit}  
                    fullWidth >
                        Registrar
                    </Button>
                </div>
            
            </form>
            </div>
            </CardContent> 
        </Card> 
    );
}

export default ProductForm;