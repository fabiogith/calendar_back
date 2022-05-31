/*
    Rutas de Usaurio / Auth
    host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator')
const { crearUsuario, loginUsurio, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/new',

    [
        check('name','El nombre es obligatorio').not().isEmpty().isLength({min: 4}),
        check('email','El email es obligatorio').not().isEmpty().isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],

    crearUsuario
);

router.post(
    '/',
     [
        check('email','El email es obligatorio').not().isEmpty().isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
     ],
     
     loginUsurio
);

router.get('/renew',validarJWT, revalidarToken);


module.exports = router;