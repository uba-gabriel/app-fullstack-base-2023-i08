//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.post('/device/',function(req,res){
    console.log("llego = "+req.body.id);
    if(req.body.texto==undefined || req.body.texto==null || req.body.texto.length<4){
        res.status(409);
        res.send("el texto no es valido");
    }else{
        
        res.status(200)
        res.send("Todo ok");
    }
    
});
app.get('/displaydevices/', function(req,res) {
    utils.query("select * from Devices",function(err,rsp,fields){
        if(err==null)
        res.send(JSON.stringify(rsp));
    else{
       res.status(409).send("error");
    }
    });
  
});
app.post('/displaydevices/', function(req,res) {

                    // Realiza la operación de actualización en la base de datos
                utils.query(
                  'UPDATE Devices SET state = ? WHERE id = ?',
                  [2, 1],
                  (error, results) => {
                    if (error) {
                      console.error('Error al actualizar la fila:', error);
                      res.status(409);
                    } else {
                        utils.query("select * from Devices",function(err,rsp,fields){
                            if(err==null)
                            res.send(JSON.stringify(rsp));
                        else{
                           res.status(409).send("error");
                        }
                        });
                    }
                  }
                );
  
});
app.get('/devices/', function(req, res, next) {
    devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 0, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Ventilador 1', 
            'description': 'Ventilador Habitacion', 
            'state': 1, 
            'type': 2, 
            
        },
        { 
            'id': 3, 
            'name': 'Parlante 1', 
            'description': 'Parlante Living', 
            'state': 1, 
            'type': 3, 
            
        },
    ]
    res.send(JSON.stringify(devices)).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
