const {response} = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const jwt = require('jsonwebtoken');

const crearUsuario = async(req , res= response)=>{
const { email, password } = req.body;

    try {

        let user = await Users.findOne({email});
        if(user){
            return res.status(400).json({
                ok: false,
                msg:'Ya existe un usario con ese correo'
            })
        }
            user = new Users(req.body);
            //Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);
            await user.save();

            const token = await generarJWT(user._id,user.name);
        
        res.status(201).json({
            ok:true,
            msg:'Registro',
            name: user.name,
            email:user.email,
            uid: user._id,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error inesperado por favor comuniquese con el administrados',
        })
    }

}

const loginUsurio = async(req,res)=>{
    const {email, password} = req.body;
 
    try {
        let user = await Users.findOne({email});
        if(!user){
            return res.status(400).json({
                ok: false,
                msg:'El usuario no existe con ese correo'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);


        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg:'Password incorrecta'
            })
        }

        //Generar JWT
        const token = await generarJWT(user._id,user.name);

        res.json({
            ok:true,
            msg:'login',
            name: user.name,
            email:user.email,
            uid: user._id,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error inesperado por favor comuniquese con el administrados',
        })
    }
};

const revalidarToken = async(req,res)=>{

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);
    res.json({
        ok:true,
        msg:'renew',
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsurio,
    revalidarToken
}