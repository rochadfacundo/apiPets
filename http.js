const http= require("http");

const desiredPort = process.env.PORT ?? 1234;


const processRequest=(req,res)=>{
    res.setHeader('Content-Type','text/html; charset=utf-8');
    if(req.url=='/')
    {
        res.statusCode=200;

        res.end('Bienvenido');
        
    }  else if(req.url=='/getMascotas')
    {
        res.statusCode=200;

        res.end('Bienvenido a las mascotas');
        
    }else{
        res.statusCode=404;

        res.end('ERROR');
    }
    //res.end("hola mundo");
}

const server= http.createServer(processRequest);

server.listen(desiredPort,()=>{
    console.log("server listening on port: http://localhost:"+desiredPort);
})