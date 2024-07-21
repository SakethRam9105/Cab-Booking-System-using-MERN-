const bookingControllers = require('../controllers/bookingControllers');
const app = require('express');
const router = app.Router();

router.post('/rides', bookingControllers.bookCab);
router.get('/getrides', bookingControllers.getAllBookings);
router.get('/getrides/:userId', bookingControllers.getMyBookings);
router.put('/rides/:id', bookingControllers.updateRideById);
router.delete('/deleteride/:id', bookingControllers.deleteRidebyId);

module.exports = router;
