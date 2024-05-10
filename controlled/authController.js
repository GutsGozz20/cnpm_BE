const User = require('../model/User');



const authController = {
    register: async(req, res, next) => {
        try {
            const { username, email, password } = req.body;
    
            if (!username || !email || !password) {
                return res
                    .status(404)
                    .json({ error: 'Please provide required field values' });
            }
    
            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res
                    .status(404)
                    .json({ error: 'Email already exists' });
            }
    
            const newUser = new User({ username, email, password });
    
            await newUser.save();
    
            return res
                .status(201)
                .json({ success: "Registration successful" });
    
        } catch (error) {
            console.log(error);
        }
    },
    login: async(req, res, next) => {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: 'Please provide email and password' });
            }
    
            const user = await User.findOne({ email });
    
            if (!user) {
                return res
                    .status(404)
                    .json({ error: 'User not found' });
            }
    // Chỗ ni chưa check pas nầy
    
            return res
                .status(200)
                .json({ success: 'Login successful', user });
    
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: 'Internal server error' });
        }
    }
    
}

module.exports = authController
