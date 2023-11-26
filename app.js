// Encapsulate the logic into a function
function processApiData(apiData) {
  // Procesa los datos recuperados del API
  const data = {
    fecha: apiData.facturas.map(factura => factura.fecha),
    cantidad: apiData.facturas.map(factura => factura.total),
  };

  // Convierte las fechas a valores numéricos (por ejemplo, el tiempo UNIX)
  const fechaNumerica = data.fecha.map((date, index) => index + 1);

  // Realiza el cálculo de la regresión lineal manualmente
  function calcularRegresionLineal(x, y) {
    const n = x.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;

    for (let i = 0; i < n; i++) {
      sumX += x[i];
      sumY += y[i];
      sumXY += x[i] * y[i];
      sumX2 += x[i] ** 2;
    }

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const b = (sumY - m * sumX) / n;

    return { m, b };
  }

  const { m, b } = calcularRegresionLineal(fechaNumerica, data.cantidad);

  // Genera nuevas fechas empezando un día después del último
  const lastDate = data.fecha[data.fecha.length - 1];
  const nuevasFechas = generateContinuedDates(lastDate, 3);

  // Predice valores para nuevas fechas
  const predicciones = nuevasFechas.map((date, index) => {
    const nuevaFechaNumerica = fechaNumerica.length + 1 + index;
    return m * nuevaFechaNumerica + b;
  });

  // Return the predictions
  const predictions = nuevasFechas.map((fecha, index) => ({
    fecha,
    predicciones: predicciones[index],
  }));

  // Muestra las predicciones
  console.log('Predicciones:');
  nuevasFechas.forEach((fecha, index) => {
    console.log(`${fecha}: Predicción ${predicciones[index]}`);
  });

  return predictions;
}

// Función para generar fechas continuas empezando un día después del último
function generateContinuedDates(lastDate, count) {
  const result = [];
  const currentDate = new Date(lastDate);
  currentDate.setDate(currentDate.getDate() + 2); // Start one day later

  for (let i = 0; i < count; i++) {
    result.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

// Función para dar formato a la fecha (YYYY-MM-DD)
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


// Export the function and other utilities
module.exports = {
  processApiData,
  generateContinuedDates,
  formatDate,
};