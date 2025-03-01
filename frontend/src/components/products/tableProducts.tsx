import { useEffect, useState } from "react";
import { Product } from "../../models/product.model"; 
import { CardContent, Card, Button, CardHeader, TableContainer, Table, Paper, TableBody, TableCell, TableHead, TableRow, Divider, DialogActions, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { formatearFecha, formatearHora } from '../../utils/formater';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { deleteProduct, setSelectProduct, newProduct, setSmallScreen, setProductToDelete, fetchProducts, setOpenDialog } from "../../slices/productsSlice";

const TableProducts = () => {
        
        const dispatch = useDispatch<AppDispatch>();
        const { products, isSmallScreen, openDialog, productToDelete, productDelete, selectedProduct } = useSelector((state: RootState) => state.products);
 
        const handleNewProduct = () => { 
            dispatch(newProduct());
        }

        const handleEditProduct = (product:Product) => {
            if(product){
                dispatch(setSelectProduct(product));
            }
        }

        const handleClickOpenDialog = (product: Product) => {  
            console.log("1 handleClickOpenDialog") 
            if(product){  
                dispatch(setProductToDelete(product));  
                dispatch(setOpenDialog(true)); 
            }
        };

        const handleCloseDialog = () => { 
            dispatch(setOpenDialog(false));
        };

        const getProducts = async() => {
            await dispatch(fetchProducts()).finally(()=>{}); 
        }

        const handleConfirmDelete = async() => {  
            if (productToDelete !== null) {   
                await dispatch(deleteProduct(productToDelete)).finally(() => {
                    getProducts();
                    handleCloseDialog(); 
                }); 
            }
        };
  
        useEffect(() => {
            const handleResize = () => { 
                dispatch(setSmallScreen(window.innerWidth < 640));
            };  
           
            getProducts();
            window.addEventListener('resize', handleResize);
            handleResize();
  
        }, [dispatch]);
  
        return ( 
            <div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{"Confirmación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span>¿Está seguro de eliminar/desactivar el producto?</span>
                        <span style={{ display: 'block', marginTop: '8px' }}>
                            {productDelete?.id} - {productDelete?.name}
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Confirmar
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            {isSmallScreen ? (
                <div className="list-disc pl-5">
                    <div className="mt-5">
                        <Button className="w-40 h-10" variant="contained" onClick={handleNewProduct}>Crear producto</Button>
                    </div>
                    {products.map((product) => (
                        <Card key={product.id} className="mt-5">
                            <CardHeader
                                action={
                                    <div>
                                        <Button variant="text" color="warning" disabled={!product.status} onClick={() => handleEditProduct(product)} className="mt-2">Editar</Button>
                                        <Button variant="text" color="error" disabled={!product.status} onClick={() => handleClickOpenDialog(product)} className="mt-2">Eliminar</Button>
                                    </div>
                                }
                                title={`${product.id} - ${product.name}`}
                            />
                            <CardContent> 
                                <p><strong>Descripción:</strong> {product.description}</p>
                                <p><strong>Precio:</strong> {product.price}</p>
                                <p><strong>Estado:</strong> {product.status ? 'Activo' : 'Inactivo'}</p>
                                <p><strong>Creado:</strong> {formatearFecha(product.createdat)} | {formatearHora(product.createdat)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="h-120 shadow-xl max-h-screen overflow-y-auto">
                    <CardHeader
                        action={
                            <Button className="w-40 h-10" variant="contained" onClick={handleNewProduct}>Crear producto</Button>
                        }
                        title="Lista de productos"
                    />
                    <CardContent>
                        <div className="w-140 rounded-lg bg-clip-border">
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><p className="text-sm">Id</p></TableCell>
                                            <TableCell align="center"><p className="text-sm">Nombre del producto</p></TableCell>
                                            <TableCell align="center"><p className="text-sm">Descripción</p></TableCell>
                                            <TableCell align="center"><p className="text-sm">Precio</p></TableCell>
                                            <TableCell align="center"><p className="text-sm">Estado</p></TableCell>
                                            <TableCell align="center">Creado</TableCell>
                                            <TableCell align="center" sx={{ position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 1 }}>Opción</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>{product.id}</TableCell>
                                                <TableCell><p className="text-sm">{product.name}</p></TableCell>
                                                <TableCell align="center"><p className="text-sm">{product.description}</p></TableCell>
                                                <TableCell align="center">{product.price}</TableCell>
                                                <TableCell align="center">{product.status ? 'Activo' : 'Inactivo'}</TableCell>
                                                <TableCell align="center">{formatearFecha(product.createdat)} | {formatearHora(product.createdat)}</TableCell>
                                                <TableCell sx={{ width: '120px', position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 1 }} align="right">
                                                    <Button variant="text" color="warning" disabled={!product.status} onClick={() => handleEditProduct(product)} className="w-20">Editar</Button>
                                                    <Divider />
                                                    <Button variant="text" color="error" disabled={!product.status} onClick={() => handleClickOpenDialog(product)} className="mt-2 w-20">Eliminar</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </CardContent>
                </Card>
            )}
            </div>
        );
    }

    export default TableProducts;