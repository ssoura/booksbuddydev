import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    HeartSvg,
    FilledHeartSvg,
    CloseButton,
    RightArrow,
    LoaderSvg,
} from "../Helpers/Svg";
import { useReducerContext } from "../../Context/ReducerContext";
import {
    isWishListed,
    isAddedToCart,
    addToWishList,
    removeFromWishList,
    addToCart,
} from "../../services/productCardCalls";

import card from './ProductCard.module.css'

export function ProductCard({ book }) {
    const { wishList, cart, dispatch, userId } = useReducerContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isMovingToCart, setIsMovingToCart] = useState(false);
    const [isAddingToWishList, setIsAddingToWishList] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    function toggleWishList(e) {
        if (isWishListed(wishList, book))
            removeFromWishList(
                e,
                userId,
                book,
                dispatch,
                isRemoving,
                setIsRemoving
            );
        else
            addToWishList(
                e,
                userId,
                book,
                dispatch,
                navigate,
                isAddingToWishList,
                setIsAddingToWishList
            );
    }

    return (
        <li
            className={card.card + card.noSelect}
            key={book._id}
            onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${book._id}`);
            }}
        >
            <img src={book.cover} alt="" className={card.cover} />

            {pathname === "/products" ? (
                <button
                    className={card.icon}
                    onClick={(e) => toggleWishList(e)}
                >
                    {!isAddingToWishList &&
                        !isRemoving &&
                        isWishListed(wishList, book) && <FilledHeartSvg />}
                    {!isAddingToWishList &&
                        !isRemoving &&
                        !isWishListed(wishList, book) && <HeartSvg />}

                    {(isRemoving || isAddingToWishList) && (
                        <LoaderSvg width="15px" height="15px" />
                    )}
                </button>
            ) : null}

            {pathname === "/wishlist" ? (
                <button
                    className={card.icon}
                    onClick={(e) =>
                        removeFromWishList(
                            e,
                            userId,
                            book,
                            dispatch,
                            isRemoving,
                            setIsRemoving
                        )
                    }
                >
                    {isRemoving ? (
                        <LoaderSvg width="15px" height="15px" />
                    ) : (
                        <CloseButton />
                    )}
                </button>
            ) : null}

            <div className={card.text}>
                <Link to={`/product/${book._id}`}>
                    <div className={card.heading}>{book.name}</div>
                </Link>
                <div className={card.subHeading}>{book.author}</div>
                <div className={card.price}>
                    <span className={card.price}>₹{book.discountedPrice}</span>
                    <span className={card.priceOriginal}>₹{book.price}</span>
                </div>
            </div>

            {pathname === "/wishlist" ? (
                <button
                    className={moveToCartButton}
                    onClick={(e) =>
                        addToCart(
                            e,
                            userId,
                            book,
                            dispatch,
                            navigate,
                            wishList,
                            cart,
                            isMovingToCart,
                            setIsMovingToCart
                        )
                    }
                >
                    {isMovingToCart ? "Moving to Cart..." : "Move to Cart"}
                </button>
            ) : null}

            {pathname === "/products" && !isAddedToCart(cart, book) ? (
                <button
                    className={addToCartButton}
                    onClick={(e) =>
                        addToCart(
                            e,
                            userId,
                            book,
                            dispatch,
                            navigate,
                            wishList,
                            cart,
                            isAddingToCart,
                            setIsAddingToCart
                        )
                    }
                >
                    {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
                </button>
            ) : null}

            {pathname === "/products" && isAddedToCart(cart, book) ? (
                <Link to="/cart" onClick={(e) => e.stopPropagation()}>
                    <button className={gotoCartButton}>
                        Go to Cart <RightArrow />
                    </button>
                </Link>
            ) : null}
        </li>
    );
}
