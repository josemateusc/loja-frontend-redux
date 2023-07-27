import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Produto } from "./produto.slice";

export type tipoCarrinho = {
  produto: Produto;
  count: number;
};

export const carrinhoSlice = createSlice({
  name: "carrinhoSlice",
  initialState: {
    produtos: [] as tipoCarrinho[],
  },

  reducers: {
    addProdutoNome(state, action) {
      let item: tipoCarrinho = {
        produto: action.payload,
        count: 1,
      };
      state.produtos.push(item);
      return state;
    },
    addProduct(state, action) {
      let exists: boolean = false;

      state.produtos.forEach((produto) => {
        if (produto.produto.id === action.payload.id) {
          produto.count++;
          exists = true;
        }
      });
      if (!exists) {
        const novoProduto: tipoCarrinho = {
          produto: action.payload,
          count: 1,
        };
        state.produtos.push(novoProduto);
      }
      return state;
    },
    incrementProduct(state, action: PayloadAction<Produto>) {
      const index = state.produtos.findIndex(
        (produto) => produto.produto.id === action.payload.id
      );
      if (index !== -1) {
        state.produtos[index].count++;
      }
    },
    decrementProduct(state, action: PayloadAction<Produto>) {
      const index = state.produtos.findIndex(
        (produto) => produto.produto.id === action.payload.id
      );
      if (state.produtos[index].count > 1 && index !== -1) {
        state.produtos[index].count--;
      }
    },
    removeProduct(state, action: PayloadAction<Produto>) {
      state.produtos = state.produtos.filter(
        (produto) => produto.produto.id !== action.payload.id
      );
    },
  },
});

export const {
  addProdutoNome,
  addProduct,
  incrementProduct,
  decrementProduct,
  removeProduct,
} = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
