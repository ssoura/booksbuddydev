import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReducerContext } from "../../Context/ReducerContext";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import wishlist from "../../assets/wishlist.png";
import { NavBar } from "./NavBar/NavBar";

import styles from "./Wishlist.module.css";

export function WishList() {
  const { wishList, dispatch } = useReducerContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: "CLEAR FILTER" });
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.count}>
        My Wishlist
        <span>{wishList.length} Items</span>
      </div>

      <div className={styles.display}>
        {wishList.map((book) => (
          <ProductCard book={book} key={book._id} />
        ))}
      </div>

      {wishList.length === 0 ? (
        <div className={styles.isEmptyPage}>
          <img src={wishlist} alt="" className={styles.image} />
          <div className={styles.isEmptyPageText}>Wishlist is empty</div>
          <button
            className={isEmptyPageButton}
            onClick={() => navigate("/products")}
          >
            Continue shopping
          </button>
        </div>
      ) : null}
    </>
  );
}
