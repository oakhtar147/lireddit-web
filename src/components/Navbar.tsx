import { Box, Link, Flex } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link';


interface Props {}

const Navbar = ({}: Props) => {
  return (
    <Box p={4} backgroundColor="teal">
      <Flex justifyContent="end">
        <NextLink href="/login">
          <Link color="white" mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </Flex>
    </Box>
  )
}

export default Navbar
