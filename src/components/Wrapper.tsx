import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {
  variant?: 'regular' | 'small';
  children: any;
}

const Wrapper = ({ children, variant }: Props) => {
  return (
    <Box maxW={variant === 'regular' ? "800px" : '400px'} mx="auto" mt={8}>
      {children}
    </Box>
  )
}

export default Wrapper
