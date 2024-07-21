const Admin = require('../models/admin'); 
const seedAdmin = async () => {
    try {
        const admin = await Admin.findOne({ AdminID: 'admin123@gmail.com' }); 
        if (!admin) {
            const newAdmin = new Admin({
                AdminID: 'admin123@gmail.com',
                password: '123' 
            });
            await newAdmin.save();
            console.log('Admin user seeded');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

module.exports = seedAdmin;
