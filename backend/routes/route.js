const express = require('express');
const router = express.Router();
const { getCars, myBookings, getCurrentUser, updateUser } = require('../controllers/Cars');
const { signup, signin, logout } = require('../controllers/Authentication.js');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/cars', (req, res) => {
    getCars(req, res);
});
router.post('/signup', upload.single("image"), (req, res) => {
    signup(req, res);
});
router.post("/signin", (req, res) => {
    signin(req, res);
});
router.post("/logout", logout);
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, upload.single("image"), updateUser);
router.get("/bookings", authMiddleware, myBookings);

module.exports = router;