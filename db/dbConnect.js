const { default: mongoose } = require("mongoose");

const dbConnection = () => {
    mongoose.connect('mongodb+srv://asatiharry964:nBDdpl1axkzT2qki@e-commerce.fwd7fpt.mongodb.net/e-coomerce?retryWrites=true&w=majority')
        .then(() => {
            console.log('Database Connected');
        }).catch((err) => {
            console.log(`Database Error ${err}`);
            process.exit(1); // Exit process with failure
        });
}

module.exports = dbConnection;


