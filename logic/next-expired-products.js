function getExpiredProducts(apiData) {
    const { productos } = apiData;
  
    // Ensure that productos is an array
    if (!Array.isArray(productos)) {
      console.error('Invalid input: productos is not an array.');
      return [];
    }
  
    const today = new Date();
  
    // Calculate the date two weeks from now
    const twoWeeksFromNow = new Date(today);
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
  
    // Filter products and return only name and date
    const expiredProducts = productos
      .filter((product) => {
        const expirationDate = new Date(product.fecha_vencimiento);
        return expirationDate > today && expirationDate <= twoWeeksFromNow;
      })
      .map((product) => ({
        name: product.nombre_producto,
        expirationDate: new Date(product.fecha_vencimiento),
      }))
      .sort((a, b) => a.expirationDate - b.expirationDate);
  
    return expiredProducts;
  }
  
  
// Export the function and other utilities
module.exports = {
    getExpiredProducts,
  };