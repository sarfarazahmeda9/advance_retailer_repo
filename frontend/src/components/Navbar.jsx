import React from 'react'
import { Text,  Button, Box, Flex, Container, HStack, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
  
   <Container maxW={'1140px'}  p={4} >
        <Flex justifyContent={'space-between'}
            alignItems={'center'}
            flexDir={{base: 'column', sm: 'row'}} 
        >
        <Text fontSize={{ base: "22", sm:"28" }}
            fontWeight={'bold'}
            textTransform={'uppercase'}
            textAlign={'center'}
            bgGradient={"linear(to-r, cyan.400,blue.500)"}
            bgClip="text"
            >
            <Link to={'/'}>Advance Retail Store 🛒</Link>
        </Text>
        <HStack>
            <Link to={'/create'}>
                <Button>
                    <PlusSquareIcon fontSize={20}/>
                </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <IoMoon /> : <LuSun size="20" /> } 
                {/* Toggle {colorMode === 'light' ? 'Dark' : 'Light'} */}
            </Button>
        </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar