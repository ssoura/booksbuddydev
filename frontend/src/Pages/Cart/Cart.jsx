import React, { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { CartProducts } from "./components/CartProducts/CartProducts";
import { CartInvoice } from "./components/CartInvoice/CartInvoice";
import { useReducerContext } from "../../Context/ReducerContext";

export function Cart() {
    const { dispatch } = useReducerContext();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({ type: "CLEAR FILTER" });
    }, []);

    return (
        <div className="container">
            <Header />
            <div className="containerBody">
                <CartProducts />
                <CartInvoice />
            </div>
        </div>
    );
}
