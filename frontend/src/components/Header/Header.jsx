import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeartSvg, CartSvg } from "../Helpers/Svg";
import { useReducerContext } from "../../Context/ReducerContext";
import styles from "./Header.module.css";

import { Stack, Button, Image, Center } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

export function Header() {
  const { dispatch, cart, userId } = useReducerContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch({ type: "CLEAR SESSION STATE" });
    dispatch({ type: "END SESSION" });
    navigate("/login");
  }

  return (
    <Flex>
      <Center>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Image borderRadius="md" src="/logo.png" />
        </Link>
      </Center>
      <Spacer />
      <Center>
        <Stack direction="row" spacing={2}>
          {pathname !== "/wishlist" && (
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => navigate("/wishlist")}
            >
              {<HeartSvg />}
            </Button>
          )}
          {pathname !== "/cart" && (
            <div>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => navigate("/cart")}
              >
                {<CartSvg />}{" "}
              </Button>
              {!!cart.length && (
                <div className={styles.cartQuantity}>{cart.length}</div>
              )}
            </div>
          )}
          {!userId && (
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
          {userId && (
            <Button colorScheme="teal" variant="outline" onClick={logoutUser}>
              Logout
            </Button>
          )}
        </Stack>
      </Center>
    </Flex>
  );
}
