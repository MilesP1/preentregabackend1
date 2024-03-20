const fs = require('fs');

class ProductManager {
  #id = 0;

  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      this.products = await this.getProducts();
      const product = {
        id: this.#id++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.find((product) => product.code === code)
        ? console.error('Código repetido')
        : this.products.push(product);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, '\productos')
      );
      console.log('Producto guardado correctamente');
      return product;
    } catch (error) {
      console.error('Error al guardar', error);
    }
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      this.products = await this.getProducts();
      const productFound = this.products.find((product) => product.id === id);
      return productFound
        ? productFound
        : console.error('ID no encontrado', error);
    } catch (error) {
      console.error('Error de ID', error);
    }
  }

  async updateProduct(id, update) {
    try {
      this.products = await this.getProducts();
      const product = await this.getProductById(id);

      if (product) {
        const updateProduct = {
          ...product,
          ...update,
          id,
        };

        const updateProducts = this.products.map((product) =>
          product.id === id ? updateProduct : product
        );

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(updateProducts, null, '\productos')
        );
        console.log('Actualización de producto');
        return updateProduct;
      } else {
        console.error('Producto no encontrado por ID');
      }
    } catch (error) {
      console.error('Error de actualización', error);
    }
  }

  async deleteProduct(id) {
    try {
      this.products = await this.getProducts();
      const productIndex = this.products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        this.products.splice(productIndex, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, '\productos')
        );
        console.log('Producto eliminado');
      } else {
        console.error('Producto no encontrado por ID');
      }
    } catch (error) {
      console.error('Error al eliminar', error);
    }
  }
}

export default ProductManager;
  
        


// const fs = require('fs');

// //array vacio
// class ProductManager {
//     #id = 0;
//     constructor(path) {
//         this.path = path;
//         this.products = [];
// }

// //Agregar productos
// async addProduct(title, description, price, thumbnail, code, stock) {
//   try {
//     this.products = await this.getProducts();
//     const product = {
//       id: this.#id++,
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock
//     }
//   this.products.find(product => product.code === code) ? console.error('Codigo repetido') : this.products.push(product);
//   await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\productos'));
//   console.log('Producto guardado correctamente');
//   return product;
//   }
//   catch (error) {
//   console.error('Error al guardar', error);
//   }

// }

// async getProducts() {
//   try {
//     const products = await fs.promises.readFile(this.path, 'utf-8');
//     return JSON.parse(products);
//   }
//   catch (error) {
//     console.error(error);
//     return [];
//     }
// };

// async getProductById(id) {
//   try {
//     this.products = await this.getProducts();
//     const productFound = this.products.find(product => product.id === id)
//     return productFound ? productFound : console.error('ID no encontrado', error);
//   }
//   catch (error) {
//     console.error('Error de ID', error);
//   }
// }

// //Cargar Prpducto
// async updateProduct(id, update) {
//   try {
//     this.products = await this.getProducts();
//     const product = await this.getProductById(id);
//     if (product) {
//       const updateProduct = {
//         ...product,
//         ...update,
//         id
//       }
//       const updateProducts = this.products.map(product => (product.id === id) ? updateProduct : product);
//       await fs.promises.writeFile(this.path, JSON.stringify(updateProducts, null, '\productos'));
//       console.log('Actualizacion de producto');
//       return updateProduct;
//     }
//     else {
//       console.error('Producto no encontrado por ID', error);
//     }
//   } catch (error) {
//     console.error('Error de actualizacion', error);
//     }
// }

// //ELiminar Producto
// async deleteProduct(id) {
//   try {
//     const product = await this.getProductById(id);
//     if (product) {
//       this.products = await this.getProducts();
//       const products = this.products.filter(product => product.id != id);
//       await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\productos'));
//       console.log('Producto eliminado');
//     }
//     else {
//       console.error('Producto no encontrado por ID');
//     }

//   }
//   catch (error) {
//     console.error('No se pudo eliminar', error);
//   }
//   }
// }

// export default ProductManager;

// // Usar codigo

// const manager = new ProductManager(`${__dirname}/products.json`);


// const iniciarMenu = async () => {
//   let products = await manager.getProducts();
//   console.log(products)

// //Agregar producto
//   await manager.addProduct(
//     'Fideos',
//     'RECETA(Con Tuco)',
//     4700,
//     '(imagen de recetario)',
//     '123',
//     2);

//   await manager.addProduct(
//     'Ravioles',
//     'RECETA(De Pollo)',
//     5600,
//     '(Imagen de recetario)',
//     '124',
//     10);

//   await manager.addProduct(
//     'Ñoquis',
//     'RECETA(De papa)',
//     5000,
//     '(Imagen de recetario)',
//     '125',
//     8);
        
//   await manager.updateProduct(2, { price:1800, stock: 30 });
//   await manager.deleteProduct(3);
//   products = await manager.getProducts();
//   console.log(products);
// }

// iniciarMenu();


// //Al Menu Ravioles bajaron los precios,ahora esta en oferta


