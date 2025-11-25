import { create } from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.imageUrl){
            return {success: false, message: 'Please fill in all the fields'};
        }
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        // backend may return either an array directly (GET) or { success, data }
        const created = data?.data ?? data;
        set((state) => ({ products: [...(Array.isArray(state.products) ? state.products : []), created] }));
        return {success: true, message: 'Product created successfully'};
    },
    fetchProducts: async () => {
        const res = await fetch('/api/products/');
        const data = await res.json();
        // normalize response: accept either array or { data: array }
        const list = data?.data ?? data ?? [];
        set({ products: Array.isArray(list) ? list : [] });
    },
    deleteProduct: async ({pid}) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if(!data.success){
            return {success: false, message: data.message};
        }
        // ensure products is an array before filtering
        set((state) => ({ products: Array.isArray(state.products) ? state.products.filter((product) => product._id !== pid) : [] }));
        return {success: true, message: data.message}
        
    },
    updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });       
        const data = await res.json();
        if(!data.success){
            return {success: false, message: data.message};
        }
        const updated = data?.data ?? null;
        set((state) => ({ products: Array.isArray(state.products) ? state.products.map(product => product._id === pid ? (updated ?? product) : product) : [] }));

        return {success: true, message: data.message}
        
    }   
    /*
    addProduct: (product) => set((state) => (
        { products: [...state.products, product] })
    ),

    removeProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product._id !== id) 

    })),
    updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)),
    })),
    */
}));
