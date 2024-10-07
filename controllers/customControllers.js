app.get('/motors', (req, res) => {
    const vehicles = [
    { name: 'Toyota Prius', price: 24000, year: 2021, description: 'Hybrid electric vehicle' },
    { name: 'Ford F-150', price: 34000, year: 2020, description: 'Reliable and strong pickup truck'},
    // Add more vehicle data here
    ];
    res.render('custom', {
    pageTitle: 'Motors - Available Vehicles',
    heading: 'Explore Our Motors Collection',
    vehicles: vehicles
    });
   })