const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user:'aintechsoftware@gmail.com',
        pass:'bnbdyxamjjctbfiw',
    }
})




module.exports = {
    transporter
}