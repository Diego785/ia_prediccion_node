const fs = require('fs');
const csv = require('csv-parser');

const data = [];

fs.createReadStream('test_csv.csv')
   .pipe(csv())
   .on('data', (row) => {
      data.push({
         fecha: new Date(row.fecha),
         cantidad: parseInt(row.cantidad),
      });
   })
   .on('end', () => {
      // Aquí puedes continuar con el procesamiento de datos una vez que se hayan leído todos los datos del CSV.
      console.log('Datos leídos con éxito:');
      console.log(data);

      // Puedes llamar a una función de pronóstico de demanda o realizar cualquier otro procesamiento que necesites.
   });
