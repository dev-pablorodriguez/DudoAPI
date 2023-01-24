const { encryptPassword, validatePassword, generateJwt } = require('../helpers')
const User = require('../models/User');

const newUser  = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });
        
        //Si existe un cliente registrado con ese RUT
        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario ingresado ya se encuentra registrado.'
            });
        }

        user = new User({ username });
        user.password = encryptPassword(password);
        user.active = true;

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user._id,
            username
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const authUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });
        
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas.'
            });
        }

        if(!user.active){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario bloqueado.'
            });
        }

        const isValidPassword = validatePassword(password, user.password)

        if(!isValidPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas.'
            });
        }

        //Generate JWT
        const token = await generateJwt(user._id, user.name);

        res.status(200).json({
            ok: true,
            uid: user._id,
            username,
            token
        })

        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error interno del sistema.'
        })
    }
}

const refreshToken = async (req, res) => {
    //Generate JWT
    const token = await generateJwt(req.uid, req.name);

    res.json({ ok: true, token })
}

module.exports = {
    newUser,
    authUser,
    refreshToken
}