const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log(`Database connected server: ${data.connection.host}`);
    })
    // .catch((err) => {
    //     console.log(err);
    // });
};

module.exports = connectDatabase;

