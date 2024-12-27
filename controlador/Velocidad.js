const express = require('express')
const app = express()



var velTramo = {
   velMax: 0,
   puntoInicio: '',
   puntoFinal: '',
 };




function velocidad2Segundos(vel){

   var velTemp = 0
   var vel2s = velTramo
   
   //while vector: sumar de dos en dos y ver cual es mayot
   for(var i=0 ; i < vel.length  ; i++ ){

      console.log(vel[i]);
      velTemp = vel[i] + vel[i+1]
      if(velTemp > vel2s.velMax) {
         vel2s.vel2max = velTemp;
         vel2s.puntoInicio=i
         vel2s.puntoFinal=i+1

      }

   }
   vel2s.velMax  = vel2s.velMax  / 2
   return vel2s

};



function velocidad10Segundos(vel){

   var velTemp = 0
   var vel10s = velTramo
   //while vector: sumar de dos en dos y ver cual es mayot
   for(var i=0 ; i < vel.length - 10  ; i++ ){

      console.log(vel[i]);
      velTemp = vel[i] + vel[i+1] + vel[i+2] + vel[i+3]+ vel[i+4]+ vel[i+5]+ vel[i+6]+ vel[i+7]+ vel[i+8]+ vel[i+9]
      if(velTemp > vel10s.vel10max) {
         vel10s.velMax = velTemp;
         vel10s.puntoInicio=i
         vel10s.puntoInicio=i+10
      }

   }
   vel10s.velMax= vel10s.velMax / 10
   return vel10s

};

function velocidad500(vel){

    /*while vector: calcular la distancia según velocidad (solo) cada segundo se mide la velocidad 
    suponiendo que es en km/h se divide la velocidad entre 3,6 y te da la distancia recorrida
    recorrer el vector desde cero hastaa fina, mientras sea inferior, mover punteros calculado 500m
    si nos pasamos de 500m hay que estimar en medio 0,5 s hasta no pasarse */
    var distancia = 0
    var j = 0
    
    var vel500m = velTramo

    //while vector: sumar de dos en dos y ver cual es mayot
    for(let i=0 ; i < vel.length ; i++ ){
      
       while(distancia < 500 ) {
         
         distancia += vel[j] / 3,6   //  km/hora -> m/s 
         j++
       }
       if(vel500m.velMax < distancia){
         vel500m.velMax = distancia 
         vel500m.puntoInicio=i           
         vel500m.puntoFinal=j
       }
     
      while(distancia>=500){
         
         distancia-=vel[i] / 3,6
         
      }
    }
    vel500m.velMax = vel500m.velMax * 3,6 / (j-i)  //se pasa a velocidad km/h y se hace la media 


    return vel500m
 }
 



module.exports = app