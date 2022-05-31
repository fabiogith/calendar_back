/*
    Rutas de Events
    host + /api/events
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { obtenerEventos, crearEvento, actualizarEvento, elimnarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
//todas deben pasr por la validacion jwt
router.use(validarJWT)

router.get('/', obtenerEventos);

router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento
);

router.put('/:id',actualizarEvento);

router.delete('/:id', elimnarEvento);

module.exports = router; 