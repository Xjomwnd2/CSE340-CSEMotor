// controllers/suvController.js
// Mock data for the SUV, typically this would be fetched from a database
const suvData = {
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    engine: '1.5L Turbocharged 4-Cylinder',
    price: 29999,
    fuelType: 'Gasoline',
    description: 'A compact SUV with a spacious interior, great for families and long trips.'
   };
   // Controller function to handle the request and render the SUV details
   exports.getSuvDetails = (req, res) => {
    res.render('SUV', { suv: suvData }); // Passing SUV data to the EJS template
   };
   