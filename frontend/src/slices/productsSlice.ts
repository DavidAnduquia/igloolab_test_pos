import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ProductService from '../services/product.service';
import { Product } from '../models/product.model';
import { RootState } from '../store/store';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: Error | null;
  selectedProduct: Product | null;
//   openDialogConfirm: Boolean | null;
  formComplete: boolean;
  errors: {
    name: boolean;
    description: boolean;
    price: boolean;
  };
  openDialog: boolean;
  productToDelete: number | null;
  productDelete: Product | null;
  isSmallScreen: boolean; 
}

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: null,
  selectedProduct: null,
//   openDialogConfirm: null,
  formComplete: false,
  errors: {
    name: false,
    description: false,
    price: false,
  },
  openDialog: false,
  productToDelete: null,
  productDelete: null,
  isSmallScreen: false,
};

const defaultProduct: Product = {
    id: undefined,
    name: '',
    description: '',
    price: undefined,
    status: true,
    createdat: undefined,
    updatedat: undefined
};

const productService = new ProductService();

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {  
  const response = await productService.getProducts(); 
  return response;
});

export const createEditProduct = createAsyncThunk('products/createEditProduct', async (product: Product) => {
  const response = await productService.createEditProduct(product);
  return response;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number) => {
  const response = await productService.deleteProduct(id);
  return response;
});

// Aquí está la nueva acción de validación asíncrona
export const validateErrorInputsAsync = createAsyncThunk(
    'products/validateErrorInputsAsync',
    async (_, { getState }) => {
      const state = getState() as RootState;
      const selectedProduct = state.products.selectedProduct;

        // Normaliza los datos del producto eliminando espacios en blanco
        const trimmedProduct = {
        ...selectedProduct,
        name: selectedProduct?.name.trim(),
        description: selectedProduct?.description.trim(),
        };

      if (selectedProduct) {
        return {
          name: trimmedProduct.name === '',
          description: trimmedProduct.description === '',
          price: isNaN(Number(trimmedProduct.price)) || Number(trimmedProduct.price) <= 0,
        };
      }
      return {
        name: false,
        description: false,
        price: false,
      };
    }
);

interface InputChangePayload {
  field: keyof Product;
  value: string | number;
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {  // FUNCIONA
    setSelectProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    }, // FUNCIONA
    newProduct(state){
        state.selectedProduct = { ...defaultProduct };
    }, // FUNCIONA
    clearProps(state) {
      state.selectedProduct = null;
      state.formComplete = false;
      state.errors = {
        name: false,
        description: false,
        price: false,
      };
    }, // FUNCIONA
    validateInputChange(state, action: PayloadAction<InputChangePayload>) { 
        if (state.selectedProduct) {
          const { field, value } = action.payload;
          state.selectedProduct = {
            ...state.selectedProduct,
            [field]: value,
          }; 
          if (field in state.errors) {
            state.errors[field as 'name' | 'description' | 'price'] = false;
          }
        }
    },  // FUNCIONA
    setOpenDialog(state, action: PayloadAction<boolean>) {
        state.openDialog = action.payload;
    },
    setFormComplete(state, action: PayloadAction<boolean>) {
      state.formComplete = action.payload;
    }, 
    setProductToDelete(state, action: PayloadAction<Product>) {
        state.productDelete = action.payload;
        const {id} = action.payload;
        state.productToDelete = Number(id); 
    }, // FUNCIONA
    setSmallScreen(state, action: PayloadAction<boolean>) {
        state.isSmallScreen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
      })
      .addCase(createEditProduct.fulfilled, (state) => {
        state.formComplete = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.formComplete = true;
      })
      .addCase(validateErrorInputsAsync.fulfilled, (state, action) => {
        state.errors = action.payload;
      });;
  },
});

export const { 
    setSelectProduct, newProduct, 
    clearProps, validateInputChange, 
    setFormComplete, setProductToDelete, 
    setOpenDialog,setSmallScreen } = productsSlice.actions;

export default productsSlice.reducer;
