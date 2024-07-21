const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); 
const cabController = require('../controllers/cabControllers');

router.post('/cabs', upload.single('carImage'), cabController.createCar);
router.get('/cabs', cabController.getCabs);
router.get('/cab/:id', cabController.getCabById);
router.put('/carEdit/:id', cabController.editCabById);
router.delete('/deleteCar/:id', cabController.deleteCabById);

module.exports = router;
