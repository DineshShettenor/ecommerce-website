import React from "react";
import OrderSummery from "./OrderSummery";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";

const CartModal = ({ isCartOpen, handleCartToggle, products }) => {
    const dispatch = useDispatch();

    const handleQuantity = (type, id) => {
        const payload = {type, id};
        dispatch(updateQuantity(payload));
    }
    const handleRemove = (e, id) => {
        e.preventDefault();
        dispatch(removeFromCart({id}))
    }
  //   console.log(isCartOpen, handleCartToggle, products);
  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${
        isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.96)",
        }}
      >
        <div className="p-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button
              className="text-gray-400 hover:text-gray-900"
              onClick={() => handleCartToggle()}
            >
              <i className="ri-xrp-fill bg-black p-1 text-white"></i>
            </button>
          </div>

          {/* cart details */}
          <div className="cart-items">
            {products.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2"
                >
                  <div className="flex items-center">
                    <span className="mr-4 px-1 bg-primary text-white rounded-full">
                      {index + 1}
                    </span>
                    <img
                      src={product.image}
                      alt=""
                      className="size-12 object-cover mr-4"
                    />
                    <div>
                      <h5 className="text-lg font-medium">{product.name}</h5>
                      <p className="text-gray-600 text-sm">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row md:justify-start justify-end mt-2">
                    <button onClick={(e) => handleQuantity("decrement", product.id)} className="size-6 items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8">
                      -
                    </button>
                    <span className="px-2 text-center mx-1">
                      {product.quantity}
                    </span>
                    <button onClick={(e) => handleQuantity("increment", product.id)} className="size-6 items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white">
                      +
                    </button>
                    <div className="ml-5">
                      <button className="text-red-500 hover:text-red-800 mr-4" onClick={(e) => handleRemove(e, product.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ordersummmery */}
        { products.length !== 0 && <OrderSummery />}
        
      </div>
    </div>
  );
};

export default CartModal;
