// controllers/sedanController.js
// Mock data for the sedan, typically this would be fetched from a database
const sedanData = {
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    engine: '2.5L 4-Cylinder',
    price: 25999,
    fuelType: 'Gasoline',
    description: 'A comfortable and fuel-efficient sedan perfect for families or commuting.'
   };
   // Controller function to handle the request and render the view
   exports.getSedanDetails = (req, res) => {
    res.render('Sedan', { sedan: sedanData }); // Passing sedan data to the EJS template
   };
   