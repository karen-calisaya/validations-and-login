const express = require('express');
const app = express();
const path = require('path');
/* requerimos dotenv para la variable de entorno */
require('dotenv').config();
const port = process.env.port || 3000;
const session = require('express-session')
const cookieParser = require('cookie-parser')


/* Enrutadores */
const indexRouter = require("./routes/indexRouter")
const productRouter = require("./routes/productsRouter")
const userRouter = require("./routes/userRouter")
const adminRouter = require("./routes/adminRouter")


/* config de archivos estaticos */
app.use(express.static('public'));

/* views ejs config  */
app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use(express.urlencoded({extended: false})); /* para capturar aquello q vienen del formulario en forma de objeto literal */
app.use(express.json());
app.use(session({
    secret: 'Six Apples',
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());

/* Middlewares de Rutas */
app.use("/",indexRouter)  //Home , About
app.use("/productos", productRouter)  //Productos: carrito, detalle, catalogo, ofertas.
app.use("/usuario", userRouter) //Usuario: perfil, registro.
app.use("/admin", adminRouter) //admin, CRUD products, users, categorias


/* servidor escuchando */

app.listen(port, () => console.log(`servidor levantado en el puerto ${port} http://localhost:${port}`))
