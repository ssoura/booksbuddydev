import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Header } from "../../components/Header/Header";
import { useReducerContext } from "../../Context/ReducerContext";
import { getCartData, getWishListData } from "../../services/networkCalls";
import { setupAuthHeaderForServiceCalls } from "../../services/setupAuthHeaders";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Center,
} from "@chakra-ui/react";

import { BiUserCircle, BiKey } from "react-icons/bi";

export function Login() {
  const [emailId, setEmailId] = useState("s@examole.com");
  const [password, setPassword] = useState("123456");
  const [asGuest, setAsGuest] = useState(true);
  const [error, setError] = useState();
  const { userId, dispatch } = useReducerContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const previousPath = state?.previousPath || "/";

  useEffect(() => {
    if (userId) {
      navigate(previousPath, { replace: true });
    }
  }, [userId, navigate, previousPath]);

  function updatePassword(e) {
    setPassword(e.target.value);
    setError("");
    setAsGuest(false);
  }

  function updateEmail(e) {
    setEmailId(e.target.value);
    setError("");
  }

  async function loginAndRedirect(e) {
    e.preventDefault();
    try {
      const {
        data: { userId, user, jwt },
      } = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      if (userId) {
        dispatch({
          type: "SAVE SESSION",
          payload: { userId, jwt },
        });
        setupAuthHeaderForServiceCalls(jwt);
        const [cart, wishList] = await Promise.all([
          getCartData(userId),
          getWishListData(userId),
        ]);
        dispatch({
          type: "LOAD USER DATA",
          payload: {
            cart: cart,
            wishList: wishList,
          },
        });
        dispatch({ type: "SET USER", payload: user });
        navigate(previousPath, { replace: "true" });
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <>
      <Header />
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.700"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiUserCircle color="gray.300" />}
                    />
                    <Input
                      variant="outline"
                      placeholder="Email"
                      type="email"
                      id="email"
                      onChange={updateEmail}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiKey color="gray.300" />}
                    />
                    <Input
                      variant="outline"
                      placeholder="Password"
                      type="password"
                      id="password"
                      required
                      onChange={updatePassword}
                    />
                  </InputGroup>
                </FormControl>
                <Box>{error}</Box>
                {emailId && password && !error && !asGuest && (
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={loginAndRedirect}
                  >
                    Login
                  </Button>
                )}
                {asGuest && <Center>OR</Center>}
                {asGuest && (
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={loginAndRedirect}
                  >
                    Login as Guest
                  </Button>
                )}
                <Box>
                  <Center>
                    Don't have an account yet?
                    <Link
                      to="/signup"
                      state={{ previousPath: `${previousPath}` }}
                    >
                      Sign-up
                    </Link>
                  </Center>
                </Box>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
