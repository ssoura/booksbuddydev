import React from "react";
import { useNavigate } from "react-router-dom";
import { useReducerContext } from "../../../../Context/ReducerContext";
import bag from "../../../../assets/bag.png";
import { CartCard } from "../CartCard/CartCard";
import { getCartQuantity, getTotalAmount } from "../../utils";

export function CartProducts() {
    const { cart } = useReducerContext();
    const navigate = useNavigate();

    return (
        <div className="containerBody-overview-and-products">
            {cart.length !== 0 ? (
                <div className="overview">
                    <span className="quantityDesktop">
                        My Cart ({getCartQuantity(cart)} Items)
                    </span>
                    <div className="quantityMobile">
                        {getCartQuantity(cart)} Items
                    </div>
                    <span className="overview-price">
                        Total: ₹{getTotalAmount(cart)}
                    </span>
                </div>
            ) : (
                <div className="empty">
                    <img src={bag} alt="bag" className="bag-image" />
                    <div className="empty-text">Cart is empty</div>
                    <button
                        className="empty-button"
                        onClick={() => navigate("/wishlist")}
                    >
                        Add items from wishlist
                    </button>
                </div>
            )}
            <div className="products">
                {cart.map((item) => (
                    <CartCard book={item} key={item._id} />
                ))}
            </div>
        </div>
    );
}
