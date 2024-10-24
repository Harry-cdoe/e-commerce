const profileModel = require("../models/profile.model");
const path = require("path");
const fs = require('fs');

// Create a new profile with image upload
const createProfile = async (req, res) => {
    try {
        // check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No File Uploaded' });
        }

        const newData = new profileModel({
            user: req.body.user,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            bio: req.body.bio,
            profileImage: req.file.path,
            phoneNumber: req.body.phoneNumber
        });

        const savedData = await newData.save();
        res.json({ message: 'Profile Created Successfully!', profile: savedData });
    } catch (error) {
        res.status(500).json({ error: 'Error creating profile', error });
    }
}

// Get all profile
const getAllProfiles = async (req, res) => {
    try {
        const allProfile = await profileModel.find();
        res.status(200).json(allProfile);
    } catch (error) {
        res.status(500).json({ error: 'Error finding profiles.', error });
    }
}

// Get a single profile by ID
const getProfileById = async (req, res) => {
    try {
        const profile = await profileModel.findById(req.params.id);
        if (!profile) {
            res.status(400).json({ error: 'profile is not found!' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Error finding profile by id.', error });
    }
}

// update a profile
const updateProfile = async (req, res) => {
    try {
        const profile = await profileModel.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        if (req.file) {
            // Delete the old image file
            if (profile.profileImage) {
                fs.unlinkSync(path.join(__dirname, '../', profile.profileImage));
            }
            profile.profileImage = req.file.path;
        }

        profile.firstname = req.body.firstname || profile.firstname;
        profile.lastname = req.body.lastname || profile.lastname;
        profile.bio = req.body.bio || profile.bio;
        profile.phoneNumber = req.body.phoneNumber || profile.phoneNumber;

        const updatedProfile = await profile.save();
        res.json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Delete a Profile
const deleteProfile = async (req, res) => {
    try {
        const profile = await profileModel.findById(req.params.id);
        if (!profile) {
            res.status(400).json({ error: 'Profile not found!' });
        }

        // Delete the profile image from the filesystem
        if (profile.profileImage) {
            fs.unlinkSync(path.join(__dirname, '../', profile.profileImage));
        }

        await profile.deleteOne();
        res.json({ message: 'Profile delete successfully!' });

    } catch (error) {
        res.status(500).json({ error: 'Error deleting profile.', error });
    }
}

module.exports = { createProfile, getAllProfiles, getProfileById, deleteProfile, updateProfile }