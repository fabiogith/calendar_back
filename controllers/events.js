const {response} = require('express');
const Events = require('../models/Events');

const obtenerEventos = async(req, res = response) =>{

    const events = await Events.find().populate('user','name');
                            

    res.json({
        ok:true,
        events
    })
}

const crearEvento = async(req, res = response) =>{
    console.log(req.body)
    
    const event = new Events(req.body);

    try {
        event.user = req.uid;
        const eventSaved = await event.save()

        res.json({
            ok:true,
            event: eventSaved
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al crear evento comuciquese con el administrador'
        })
    }    
}

const actualizarEvento = async (req, res = response) =>{

    const eventID = req.params.id;
    const uid = req.uid;

    try {
        const  event = await Events.findById(eventID);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:`No existe un evento con el ID ${eventID}`
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para editar este evento'
            })
        }
        
        const nuevoEvento={
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Events.findByIdAndUpdate(eventID, nuevoEvento, {new: true});

        res.json({
            ok:true,
            event: eventoActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar evento comuciquese con el administrador'
        })
    }
}

const elimnarEvento = async(req, res = response) =>{
    
    const eventID = req.params.id;
    const uid = req.uid;

    try {
        const event = await Events.findById(eventID);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'No existe un evento con ese ID'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para editar este evento'
            })
        }

        const eventEliminado = await Events.findByIdAndDelete(eventID);

        res.json({
            ok:true,
            msg:'Evento elmininado',
            evento:eventEliminado
        })
 


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al eliminar evento comuciquese con el administrador'
        })
    }

}

module.exports ={
    obtenerEventos,
    actualizarEvento,
    crearEvento,
    elimnarEvento
}