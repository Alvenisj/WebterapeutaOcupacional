import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';



// CREAMOS LA INSTANCIA DE EXPRESS
const app = express();

// USAMOS HANDLEBARS
app.set('view engine', 'hbs');

// OBTENEMOS TODO EL PATH, EJEMPLO: C:\Users\Alvenis\Desktop\nodeFinal\06-webServerExpress\app.js
const __filename = fileURLToPath( import.meta.url );
// OBTENEMOS EL DIRECTORIO "PADRE" CON path.dirname()
const __dirname = path.dirname( __filename );
// devuelve la ruta absoluta resultante al combinar esos segmentos.
// C:\Users\Alvenis\Desktop\nodeFinal\06-webServerExpress\public
const publicPath = path.resolve( __dirname, 'public');
hbs.registerPartials( __dirname + '/views/partials')

app.use( express.static( publicPath ) );


app.get('/', ( req, res ) => {
   
   res.render('inicio', {
       pestana: "HealthyCare | TO",
       nombre: 'Lisseth Viera',
       titulo: 'Licenciada en Terapia Ocupacional ||'
     });
  
} );

app.get('/leerOne',  ( req, res ) => {
   
   res.render('leerOne', {
       pestanaLeerOne: "HealthyCare | leerOne"
    })

} );

app.get('/leerTwo',  ( req, res ) => {
   
   res.render('leerTwo', {
       pestanaLeerTwo: "HealthyCare | leerTwo"
    })

} );


app.get('/leerThree',  ( req, res ) => {
   
   res.render('leerThree', {
       pestanaLeerThree: "HealthyCare | leerThree"
    })

} );


app.get('/leerFour',  ( req, res ) => {
   
   res.render('leerFour', {
       pestanaLeerFour: "HealthyCare | leerFour"
    })

} );


app.get('/nuestrosServicios',  ( req, res ) => {
   
   res.render('nuestrosServicios', {
       pestanaInforma: "HealthyCare | nuestrosServicios"
    });


} );


app.get('/serviceOne', ( req, res ) => {
   
   res.render('serviceOne', {
       pestanaInforma: "HealthyCare | serviceOne"
    });

} );

app.get('/serviceTwo', ( req, res ) => {
   
   res.render('serviceTwo', {
       pestanaInforma: "HealthyCare | serviceTwo"
    });

} );

app.get('/serviceThree',  ( req, res ) => {
   
   res.render('serviceThree', {
       pestanaInforma: "HealthyCare | serviceThree"
    });

} );

app.get('/serviceFour',  ( req, res ) => {
   
   res.render('serviceFour', {
       pestanaInforma: "HealthyCare | serviceFour"
    });


} );


app.get('/serviceFive',  ( req, res ) => {
   
   res.render('serviceFive', {
       pestanaInforma: "HealthyCare | serviceFive"
    });

} );

app.get('/contactanos',  ( req, res ) => {
   
   res.render('contactanos', {
       pestanaInforma: "HealthyCare | contactanos"
    });

} );


// // SI NO SE ENCUENTRA LA RUTA VA LLEGAR A ESTE PUNTO Y MUESTRA EL MENSAJE
app.get('*', ( req, res ) => {

    res.sendFile( publicPath + '/error404.html');

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ( ) => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
})