const express = require("express");
const dbConnection = require("./db/dbConnect");
const userRoute = require("./routes/user.route");
const profileRoutes = require("./routes/profile.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

dbConnection();

// Use Routes
app.use('/api/users', userRoute);

app.use('/api/profiles', profileRoutes);

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
    res.send("File Uploaded Successfully");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
