const express = require('express');
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require('./database/config');
const productsRoutes = require('./routes/product');
const imageRoutes = require('./routes/images');
const categoryRoutes = require('./routes/category');
const authRoutes = require("./routes/auth");
const ordersRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");
// const usersRoutes = require("./routes/user");
const bodyParser = require('body-parser');
const {createRoles} = require('./libs/initialSetup');
const app = express();
createRoles();
const port = process.env.APP_PORT;
dbConnection();

//CORS
const corsOptions ={
    // origin:'http://localhost:5173/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//middleware
//body reading and parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', productsRoutes)
app.use('/api', categoryRoutes)
app.use('/api', ordersRoutes)
app.use('/api', paymentRoutes)
app.use('/api', authRoutes);
// app.use('/api', usersRoutes)
// Registrar la ruta para la eliminación de imágenes
app.use('/api/images', imageRoutes);
app.use('/public', express.static(`${__dirname}/storage/imgs`))

    app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', "*");
      
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
      
        // Pass to next layer of middleware
        next();
      });



//routes 
app.get('/', (req, res) => {
    res.send("zuka3d api")
})




app.listen(port || "3000", () => {
    console.log('Servidor abierto en puerto', port )
})