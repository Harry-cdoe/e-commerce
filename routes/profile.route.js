const express = require("express");
const { createProfile, getAllProfiles, getProfileById, deleteProfile, updateProfile } = require("../controllers/profile.controller");
const { upload } = require("../middleware/multerConfig");
const router = express.Router();

// Route to create profile with image
router.post('/create', upload, createProfile);
router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.put('/:id', upload, updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router;