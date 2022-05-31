const momemt = require('moment')

const isDate = (value, {req, location, path}) =>{
   if(!value){
        return false;
   }

   const fecha = momemt(value);
   if(fecha.isValid()){
       return true;
   }else{
       return false;
   }
}

module.exports = {
    isDate
}