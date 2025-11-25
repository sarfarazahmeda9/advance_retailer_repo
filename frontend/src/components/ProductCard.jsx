import { Box, HStack, useColorModeValue,Heading,IconButton,useToast } from '@chakra-ui/react'
import { Input,Button } from '@chakra-ui/react'
/*import { Image } from '@chakra-ui/react'*/
import { Text } from '@chakra-ui/react'
import { EditIcon, DeleteIcon, DragHandleIcon } from '@chakra-ui/icons'
import React from 'react'
import { useProductStore } from '../store/product'
import { Img } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
 } from '@chakra-ui/react'

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const {deleteProduct, updateProduct} = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    
    const handleDeleteProduct = async (pid) => {   
        const {success, message} = await deleteProduct({pid});
        if(success){
            toast({
                title: "sucess Deleted",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
        else {
            toast({
                title: "error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } 
    };
    const handleUpdateProduct = async (pid, updatedProduct) => {
        // console.log("updatedProduct : ", updatedProduct);
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();  
        if(success){
            toast({
                title: "Updated",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
        else {
            toast({
                title: "error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } 
    }

  return (
    <Box 
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
        
    >
        {/* <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover"/> */}
        <Img src={product.imageUrl} alt={product.name} h={48} w="full" objectFit="cover"/>

        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>
            <Text fontSize={"xl"} color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={onOpen}
                />
                <IconButton
                    //aria-label="Share"
                    icon={<DeleteIcon />}
                    colorScheme="red"                   
                    onClick={() => handleDeleteProduct(product._id) }
                />
               
            {/* <Button colorScheme={"teal"}>Add to Cart</Button> */}
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input 
                        placeholder="Product Name" 
                        name='name'
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                    />
                    <Input
                        placeholder="Price" 
                        type='number'
                        name='price'
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                    />
                    <Input 
                        placeholder="Image URL" 
                        name='imageUrl'
                        value={updatedProduct.imageUrl}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, imageUrl: e.target.value})}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3}  
                        onClick={() => handleUpdateProduct(product._id,updatedProduct) }
                        >
                        Update
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}
export default ProductCard