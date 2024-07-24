//CommonJS.
const express= require('express');
const mascotas= require('./mascotas.json');
const cors= require('cors');

const app= express();

//Middleware
app.use(express.json());
app.use(cors({
    origin:(origin,callBack)=>{
        const ACCEPTED_ORIGINS=[
            'http://localhost:8080',       
            'http://localhost:5454',
            'www.apipets.com',
            'http://localhost:3214',
        ];
        if(ACCEPTED_ORIGINS.includes(origin))
        {
            return callBack(null,true);
        }

        if(!origin)
        {
            return callBack(null,true);
        }

        return callBack(new Error('Now se permiten CORS'));

    }
}))

app.disable('x-powered-by');

const PORT= process.env.PORT ?? 1234;

app.get('/', (req, res) => {
  res.json({message:'Hola mundo'})
});

//Obtener mascotas
app.get('/mascotas', (req, res) => {
    const {tipo}= req.query;
    
    if(tipo)
    {
        const mascotasPorTipo=mascotas.filter(
        mascota=>mascota.tipo.toLowerCase()==tipo.toLowerCase());
        console.log(mascotasPorTipo);
        return  res.json(mascotasPorTipo);
    }
    res.json(mascotas);
  });


//Obtener mascotas por id.
app.get('/mascotas/:id', (req, res) => {
 
         const {id}=req.params;

         
         const mascota= mascotas.find(m=>m.id==id);
     
         if(mascota)
         {
             return res.json(mascota);
         }
     
         res.status(404).json({message:'Mascota no encontrada'});
  });



  app.post('/mascotas',(req,res)=>{
// Extraer datos del cuerpo de la solicitud
const { nombre, tipo, estado, edad, ubicadoEn, color, color2, color3, color4 } = req.body;
    const nuevaMascota={
        id:5,
        nombre,
        tipo,
        estado,
        edad,
        ubicadoEn,
        color,
        color2,
        color3,
        color4

    }

    mascotas.push(nuevaMascota);
    res.status(201).json(nuevaMascota);
  });


app.listen(PORT,()=>{
    console.log('Server listenning on port '+PORT);
});








/*
const http= require("http");

const desiredPort = process.env.PORT ?? 1234;


const processRequest=(req,res)=>{
    res.setHeader('Content-Type','text/html; charset=utf-8');
    const {method, url}= req;

    switch(method){
        case 'GET':
            break;
            
    }


}

const server= http.createServer(processRequest);

server.listen(desiredPort,()=>{
    console.log("server listening on port: http://localhost:"+desiredPort);
})*/