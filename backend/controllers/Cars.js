const express = require('express');
const fs = require('fs');
const MyBooking = require('../model/myBooking');
const User = require('../model/User');

async function getCars(req, res) {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    res.json(data.cars);
}

async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                contact: user.contact,
                imageUrl: user.imageUrl,
                createdAt: user.createdAt,
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching user" });
    }
}

async function updateUser(req, res) {
    try {
        const updates = req.body;
        if (req.file) {
            updates.imageUrl = req.file.path;
        }
        const existingUser = await User.findById(req.userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        updates.firstname = updates.firstname !== "" ? updates.firstname : existingUser.firstname;
        updates.lastname  = updates.lastname  !== "" ? updates.lastname  : existingUser.lastname;
        updates.email     = updates.email     !== "" ? updates.email     : existingUser.email;
        updates.contact   = updates.contact   !== "" ? updates.contact   : existingUser.contact;
        const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                contact: user.contact,
                imageUrl: user.imageUrl,
                createdAt: user.createdAt,
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating user" });
    }
}

async function myBookings(req, res) {
    try{
        const bookings = await MyBooking.find({ userId: req.userId });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
}

module.exports = {
    getCars,
    getCurrentUser,
    updateUser,
    myBookings
}