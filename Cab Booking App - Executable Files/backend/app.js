//require statements
const express = require('express')
const mongoose=require('mongoose')
require('dotenv').config();
const cors=require('cors')
const useRouter1=require('./routers/userRoutes')
const useRouter2=require('./routers/adminRoutes')
const useRouter3=require('./routers/cabRoutes')
const useRouter4=require('./routers/bookingRoutes')

const seedAdmin = require('./middleware/seedAdmin'); 

const PORT = process.env.PORT;
const connectionString=process.env.ConnectionString;
const frontendURL=process.env.frontendURL;
const app = express();


// middleware
app.use(cors(
    {
        origin: [frontendURL],
        methods: ["POST", "GET", "DELETE", "PUT"],
        credentials: true
    }
))
app.use(express.json())
app.use(useRouter1) //for users 
app.use(useRouter2) //for admin
app.use(useRouter3) //for cabs
app.use(useRouter4) //for bookings
app.use('/uploads', express.static('uploads'));


//connection with database
mongoose.connect(connectionString)
    .then(async () => {
        console.log('Connected to MongoDB');
        await seedAdmin(); // Seed the admin user
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });


