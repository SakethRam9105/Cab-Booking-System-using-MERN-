const userModel = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching data ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getuserbyId = async (req, res) => {
    const id = req.params.id;
    try {
        const users = await userModel.findById({ _id: id });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateUserById = async (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email
    })
    .then((users) => {
        res.json(users)
    }).catch((err) => {
        res.json(err)
    })
}


exports.postUser = async (req, resp) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return resp.json({ Status: "Error", message: "User already exists" });
        }

        // Create a new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: password // Store password as plain text
        });

        // Save the user to the database
        await newUser.save();
        
        resp.json({ Status: "Success", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ Status: "Error", message: "Server error" });
    }
};


exports.checkUser = async (req, resp) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
}

exports.deleteUser= async (req,res)=>{
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}