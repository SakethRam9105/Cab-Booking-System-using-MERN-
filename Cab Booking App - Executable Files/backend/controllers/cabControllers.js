const Cab = require('../models/cab');

exports.createCar = async (req, res) => {
  const { drivername, carname, cartype, carno, price } = req.body;
  const carImage = req.file ? req.file.path : null; // Check if file exists

  try {
    const car = new Cab({ drivername, carImage, carname, cartype, carno, price });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create car' });
  }
};

exports.getCabs = async (req, res) => {
  try {
    const cabs = await Cab.find();
    res.json(cabs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getCabById = async (req, res) => {
  const id = req.params.id;
  try {
    const cab = await Cab.findById(id);
    if (!cab) return res.status(404).json({ error: 'Cab not found' });
    res.json(cab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editCabById = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCab = await Cab.findByIdAndUpdate(
      id,
      {
        drivername: req.body.drivername,
        carname: req.body.carname,
        cartype: req.body.cartype,
        carno: req.body.carno,
        price: req.body.price
      },
      { new: true }
    );
    if (!updatedCab) return res.status(404).json({ error: 'Cab not found' });
    res.json(updatedCab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCabById = async (req, res) => {
  try {
    const deletedCab = await Cab.findByIdAndDelete(req.params.id);
    if (!deletedCab) return res.status(404).json({ error: 'Cab not found' });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
