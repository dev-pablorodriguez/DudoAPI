const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnection = () => {
    try {
        mongoose.connect(process.env.CONN_STRING);

        console.log('DB connected')
    } catch (error) {
        console.log(error)
        throw new Error('Error while initializing DB.')
    }
}

module.exports = {
    dbConnection
}