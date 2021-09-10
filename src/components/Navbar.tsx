import { Box, Link, Flex, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { isServerSide } from "../utils/isServerSide";

interface Props {}

const Navbar = ({}: Props) => {
  const [{ fetching, data: logoitData }, logoutUser] = useLogoutMutation();
  const router = useRouter();
  const [{ data }] = useMeQuery({
    pause: isServerSide(),
  });

  let body = null;

  if (!data?.me) {
    // user is not logged in
    body = (
      <>
        <NextLink href='/login'>
          <Link color='white' mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href='/register'>
          <Link color='white'>Register</Link>
        </NextLink>
      </>
    );
  } else if (data.me) {
    // user is logged in
    body = (
      <>
        <Box color='white'>{data.me?.username}</Box>
        <Button
          variant='link'
          onClick={async () => {
            await logoutUser();
            router.push("/");
          }}
          isLoading={fetching}
          color='white'
          mr={2}
          pl={6}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Box p={4} backgroundColor='teal'>
      <Flex justifyContent='end'>{body}</Flex>
    </Box>
  );
};

export default Navbar;
