const TimeSheet = require('../models/timesheet');
const User = require('../models/user');
const addTimeSheet = async (req, res) => {
    const {user, weekOf, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday} = req.body;
    console.log(req.body);
    try {
        const foundUser = await User.findById(user);
        
        if (!foundUser) {
            return res.status(400).json({ error: "User not found" });
        }
        console.log(foundUser);
        const newTimeSheet = new TimeSheet({
            email: foundUser.email,
            weekOf,
            Monday,
            Tuesday,
            Wednesday,
            Thursday,
            Friday,
            Saturday,
            Sunday
        });

        const savedTimeSheet = await newTimeSheet.save();

        res.json(savedTimeSheet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { addTimeSheet};
