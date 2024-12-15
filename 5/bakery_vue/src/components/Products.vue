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

<style>
.loader {
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
}

.loader:before,
.loader:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
}

.loader:after {
    color: #FF3D00;
    transform: rotateY(70deg);
    animation-delay: .4s;
}

@keyframes rotate {
    0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
    }
}

@keyframes rotateccw {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(-360deg);
    }
}

@keyframes spin {

    0%,
    100% {
        box-shadow: .2em 0px 0 0px currentcolor;
    }

    12% {
        box-shadow: .2em .2em 0 0 currentcolor;
    }

    25% {
        box-shadow: 0 .2em 0 0px currentcolor;
    }

    37% {
        box-shadow: -.2em .2em 0 0 currentcolor;
    }

    50% {
        box-shadow: -.2em 0 0 0 currentcolor;
    }

    62% {
        box-shadow: -.2em -.2em 0 0 currentcolor;
    }

    75% {
        box-shadow: 0px -.2em 0 0 currentcolor;
    }

    87% {
        box-shadow: .2em -.2em 0 0 currentcolor;
    }
}
</style>
