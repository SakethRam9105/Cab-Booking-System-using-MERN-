const adminModel = require('../models/admin');

exports.checkAdmin = async (req, res) => {
    const { AdminID, password } = req.body; // Ensure the field names match

    try {
        const admin = await adminModel.findOne({ AdminID: AdminID }); 

        if (admin) {
            if (admin.password === password) {
                return res.json({ Status: "Success", admin: { AdminID: admin.AdminID } });
            } else {
                return res.status(401).json({ Status: "Fail", message: "Incorrect password" });
            }
        } else {
            return res.status(404).json({ Status: "Fail", message: "Admin not found" });
        }
    } catch (error) {
        console.error('Error checking admin:', error);
        return res.status(500).json({ Status: "Error", message: "Internal server error" });
    }
};
