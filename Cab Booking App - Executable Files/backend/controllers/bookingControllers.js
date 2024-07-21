const bookingModel = require('../models/booking');

exports.bookCab = async (req, res) => {
    const { 
        selectedPickupState, selectedPickupCity, selectedDropState, selectedDropCity, 
        pickupdate, pickuptime, dropdate, droptime, bookeddate, userId, userName, 
        drivername, fare, carname, cartype, carno, price 
    } = req.body;
    try {
        const booking = new bookingModel({ 
            selectedPickupState, selectedPickupCity, selectedDropState, selectedDropCity, 
            pickupdate, pickuptime, dropdate, droptime, bookeddate, userId, userName, 
            drivername, fare, carname, cartype, carno, price 
        });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.getAllBookings = async (req, res) => {
    try {
        const rides = await bookingModel.find();
        res.json(rides);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


exports.getMyBookings = async (req, res) => {
    const userId = req.params.userId;
    try {
        console.log(`Fetching bookings for user ID: ${userId}`);
        
        const bookings = await bookingModel.find({ userId });
        
        if (!bookings || bookings.length === 0) {
            return res.json({ message: 'No bookings found for this user.' });
        }
        
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};


exports.updateRideById = async (req, res) => {
    try {
        const updatedBooking = await bookingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteRidebyId = async (req, res) => {
    try {
        await bookingModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Ride deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
