import { Box, Link, Flex, Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { isServerSide } from "../utils/isServerSide";

interface Props {}

const Navbar = ({}: Props) => {
  const [{ data, error, fetching }, refetchMe] = useMeQuery({
    pause: isServerSide(),
  });
  const [{ data: logoutData }, logoutUser] = useLogoutMutation();
  const router = useRouter();

  console.log(data);

  return (
    <Box p={4} backgroundColor='teal'>
      <Flex justifyContent='end'>
        {data?.me ? (
          <>
            <Box color='white'>{data.me?.username}</Box>
            <Button
              variant='link'
              onClick={async () => {
                logoutUser();
                refetchMe();
                router.push("/");
              }}
              color='white'
              mr={2}
              pl={6}
            >
              Logout
            </Button>
          </>
        ) : (
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
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
