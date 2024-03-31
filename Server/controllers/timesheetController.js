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

        // Check if a timesheet already exists for this user and week
        const existingTimeSheet = await TimeSheet.findOne({ email: foundUser.email, weekOf });
        if (existingTimeSheet) {
            return res.status(400).json({ error: "A timesheet already exists for this user and week. Please contact an admin" });
        }

        const newTimeSheet = new TimeSheet({
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
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

const getTimeSheets = async (req, res) => {
    try {
        const { weekOf } = req.query;

        if (!weekOf) {
            return res.status(400).json({ error: "Missing 'weekOf' query parameter" });
        }

        const timeSheets = await TimeSheet.find({ weekOf });

        res.json(timeSheets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTimeSheetById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Missing 'id' parameter" });
        }

        const timeSheet = await TimeSheet.findById(id);

        if (!timeSheet) {
            return res.status(404).json({ error: "No timesheet found with this ID" });
        }

        res.json(timeSheet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateTimeSheet = async (req, res) => {
    try {
        const { id } = req.params;
        const { approved } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Missing 'id' parameter" });
        }

        const timeSheet = await TimeSheet.findById(id);

        if (!timeSheet) {
            return res.status(404).json({ error: "No timesheet found with this ID" });
        }

        timeSheet.approved = approved;
        await timeSheet.save();

        res.json(timeSheet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteTimeSheet = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTimeSheet = await TimeSheet.findByIdAndDelete(id);

        if (!deletedTimeSheet) {
            return res.status(404).json({ error: "No timesheet found with this ID" });
        }

        res.json(deletedTimeSheet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addTimeSheet, getTimeSheets, getTimeSheetById, updateTimeSheet, deleteTimeSheet };