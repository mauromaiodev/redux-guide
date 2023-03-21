import CartActionTypes from "./action-types";

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_PRODUCT:
      // verificar se o produto já está no carrinho
      const productIsAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id
      );

      // se ele estiver, aumentar a sua quantidade em 1
      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }

      // se ele não estiver, adiciona-lo
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

    case CartActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case CartActionTypes.INCREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };

    case CartActionTypes.DECREASE_PRODUCT_QUANTITY:
      // Reduz a quantidade de um produto no carrinho, mantendo pelo menos uma unidade.
      // Remove o produto do carrinho se sua quantidade é igual a uma unidade e é clicado o botão de remoção.
      return {
        ...state,
        products: state.products
          // Filtra todos os produtos que não são o produto que será reduzido ou que têm uma quantidade maior do que 1
          .filter(
            (product) => product.id !== action.payload || product.quantity > 1
          )
          // Mapeia os produtos que restaram, atualizando a quantidade do produto que será reduzido
          .map((product) =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity - 1 }
              : product
          ),
      };
    default:
      return state;
  }
};

export default cartReducer;
