/*
    Autenticación
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { mdlFieldValidator, mdlValidateJwt } = require('../middlewares')

const { newUser, authUser, refreshToken } = require('../controllers/auth')

router.post(
    '/register',
    [
        //middlewares
        check('username')
            .notEmpty()
            .withMessage('El nombre de usuario es obligatorio.'),
        check('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria.')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe contener mínimo 6 caracteres.'),
        mdlFieldValidator
    ],
    newUser
);

router.post(
    '/',
    [
        //middlewares
        check('username')
            .notEmpty()
            .withMessage('El nombre de usuario es obligatorio.'),
        check('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria.'),
        mdlFieldValidator
    ],
    authUser
);

router.get('/refresh', mdlValidateJwt, refreshToken);


module.exports = router;