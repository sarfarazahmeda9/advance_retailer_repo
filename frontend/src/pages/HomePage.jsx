import { Container, VStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'


const HomePage = () => {
    const {fetchProducts, products} =useProductStore();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    
    //console.log("products", products);

  return (
    <Container maxW='container.xl'  py={12} >
        <VStack spacing={8}>
         <Text fontSize={"30"}
            fontWeight={'bold'}
            textAlign={'center'}
            bgGradient={"linear(to-r, cyan.400,blue.500)"}
            bgClip="text"
            >
            Current Product 🛒
        </Text>
        <SimpleGrid columns={{base: 1, md: 3, lg: 4}} spacing={10} w={"full"}>
            {/* <ProductCard /> */}
            {(products || []).map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </SimpleGrid>
        {(products?.length ?? 0) === 0 && 
        <Text fontSize='xl '
            fontWeight={'bold'}
            textAlign={'center'}
            color= 'gray.500'
            >
                No Product found 😢 {" "}
            <Link to="/create">
                <Text as='span' color='blue.500' _hover={({textDecoration:"underline"})}>
                    Create a Product
                </Text>
            </Link>
        
        </Text>
        }
        </VStack>
        
        
    </Container>
  )
}

export default HomePage