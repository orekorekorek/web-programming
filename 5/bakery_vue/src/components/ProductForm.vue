<template>
  <div>
      <h1>Product Management</h1>

      <div v-if="loading" class="loading-spinner">
          <span class="loader"></span>
      </div>

      <div v-else>
          <div>
              <h2>{{ isEditing ? 'Edit Product' : 'Add Product' }}</h2>
              <form @submit.prevent="isEditing ? updateProduct() : createProduct()">
                  <div>
                      <label for="name">Name:</label>
                      <input type="text" v-model="productForm.name" required>
                      <span v-if="errors.name" class="error-message">{{ errors.name[0] }}</span>
                  </div>
                  <div>
                      <label for="price">Price:</label>
                      <input type="number" v-model="productForm.price" required>
                      <span v-if="errors.price" class="error-message">{{ errors.price[0] }}</span>
                  </div>
                  <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
                  <button type="button" @click="resetForm">Cancel</button>
              </form>
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
    this.isEditing = this.$route.path.includes('/edit');

    if (this.isEditing) {
        this.fetchProduct();
    }
  },
  methods: {
      async fetchProduct() {
          this.loading = true;
          try {
              const response = await fetch(`${this.apiUrl}/${this.$route.params.id}/edit`);
              const parsed_response = await response.json();
              this.productForm = {
                id: parsed_response.id,
                name: parsed_response.name,
                price: parsed_response.price
              }
              console.log(this.productForm);
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
              this.$router.push('/products');
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
              this.$router.push('/products');
          } catch (error) {
              console.error('Error updating product:', error);
          } finally {
              this.loading = false;
          }
      },
      resetForm() {
          this.productForm = {
              name: '',
              price: ''
          };
          this.errors = {};
      }
  }
};
</script>
