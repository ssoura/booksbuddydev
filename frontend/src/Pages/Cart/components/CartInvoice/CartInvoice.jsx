import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    getCartQuantity,
    getTotalAmount,
    getTotalAmountBeforeDiscount,
} from "../../utils";
import { useReducerContext } from "../../../../Context/ReducerContext";
import { openRazorpay } from "../../../Checkout/razorpay";

export function CartInvoice() {
    const { cart, userId, dispatch } = useReducerContext();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <>
            {cart.length !== 0 ? (
                <div>
                    <div className="priceDetaiils">
                        <div className="price-details-heading">
                            <span>Price Details</span> ({getCartQuantity(cart)}{" "}
                            Items)
                        </div>
                        <div className="price-details-body">
                            <div className="price-details-body-item">
                                <span>Total MRP</span>
                                <span>
                                    ₹{getTotalAmountBeforeDiscount(cart)}
                                </span>
                            </div>
                            <div className="price-details-body-item">
                                <span>Discount on MRP</span>
                                <span className="discountHighlight">
                                    -₹
                                    {getTotalAmountBeforeDiscount(cart) -
                                        getTotalAmount(cart)}
                                </span>
                            </div>
                            <div className="price-details-body-item">
                                <span>Delivery Fee</span>
                                <span className="discountHighlight">Free</span>
                            </div>
                        </div>
                        <div className="price-details-total">
                            <span>Total Amount</span>
                            <span>₹{getTotalAmount(cart)}</span>
                        </div>
                    </div>
                    {pathname === "/cart" ? (
                        <button
                            className="priceDetailsOrderButton"
                            onClick={() => navigate("/checkout")}
                        >
                            Place Order
                        </button>
                    ) : (
                        <button
                            className="priceDetailsOrderButton"
                            onClick={() =>
                                openRazorpay(
                                    getTotalAmount(cart),
                                    navigate,
                                    userId,
                                    dispatch
                                )
                            }
                        >
                            Pay Now
                        </button>
                    )}
                </div>
            ) : null}
        </>
    );
}
