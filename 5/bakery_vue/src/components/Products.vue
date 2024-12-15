<template>
    <div>
        <h1>Product List</h1>

        <div v-if="loading" class="loading-spinner">
            <span class="loader"></span>
        </div>

        <div v-else>
            <div>
                <ul>
                    <li v-for="product in products" :key="product.id">
                        {{ product.name }} - ${{ product.price }}
                        <router-link :to="`/products/${product.id}/edit`">Edit</router-link>
                        <button @click="deleteProduct(product.id)">Delete</button>
                    </li>
                </ul>
                <router-link :to="`/products/new`">Add Product</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            productForm: {
                name: '',
                price: ''
            },
            isEditing: false,
            errors: {},
            loading: false,
            apiUrl: 'http://localhost:3000/products' // Adjust the API URL as needed
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            this.loading = true;
            try {
                const response = await fetch(this.apiUrl);
                this.products = await response.json();
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                this.loading = false;
            }
        },
        async createProduct() {
            this.errors = {};
            this.loading = true;
            try {
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.productForm)
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    this.errors = errorData || {};
                    return;
                }
                const newProduct = await response.json();
                this.products.push(newProduct);
                this.resetForm();
            } catch (error) {
                console.error('Error creating product:', error);
            } finally {
                this.loading = false;
            }
        },
        async updateProduct() {
            this.errors = {};
            this.loading = true;
            try {
                const response = await fetch(`${this.apiUrl}/${this.productForm.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.productForm)
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    this.errors = errorData || {};
                    return;
                }
                const updatedProduct = await response.json();
                const index = this.products.findIndex(product => product.id === updatedProduct.id);
                if (index !== -1) {
                    this.products.splice(index, 1, updatedProduct); // Directly modify the array
                }
                this.resetForm();
            } catch (error) {
                console.error('Error updating product:', error);
            } finally {
                this.loading = false;
            }
        },
        async deleteProduct(id) {
            this.loading = true;
            try {
                await fetch(`${this.apiUrl}/${id}`, {
                    method: 'DELETE'
                });
                this.products = this.products.filter(product => product.id !== id);
            } catch (error) {
                console.error('Error deleting product:', error);
            } finally {
                this.loading = false;
            }
        },
    }
};
</script>
