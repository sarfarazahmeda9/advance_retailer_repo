import { Heading, Button ,Box, Container, Input, useColorModeValue, VStack} from '@chakra-ui/react'
import {React, useState } from 'react'
import { useProductStore } from '../store/product'
import { useToast } from '@chakra-ui/react'

const CreatePage = () => {
   const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        imageUrl: "",
    })

    const toast = useToast();
    const {createProduct} = useProductStore();

    const handleAddProduct = async () => {
        const {success, message} = await createProduct(newProduct);    
        //console.log(success, message);
        if(success){
            toast({
                title: "successs",
                description: message,
                status: "success",
                //duration: 9000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: "error",
                description: message,
                status: "error",
                //duration: 9000,
                isClosable: true,
            })
        }
        setNewProduct({ name: "", price: "",  imageUrl: "", });
    }

  return (
    <Container maxW={"container.sm"} >
        <VStack spacing={8}>
            <Heading as="h1" size={"2x1"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>
        </VStack>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")}  >
            <VStack spacing={4}>
                <Input 
                    placeholder="Product Name" 
                    name='name'
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
                <Input
                    placeholder="Price" 
                    type='number'
                    name='price'
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
                <Input 
                    placeholder="Image URL" 
                    name='imageUrl'
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                />
                <Button colorScheme='blue' onClick={handleAddProduct} w="full">
                    Create Product
                </Button>
            </VStack>
            
        </Box>
           
    </Container>
  )
}

export default CreatePage
