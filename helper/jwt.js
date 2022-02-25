const jwt = require('jsonwebtoken');

const scret = "ssolusirfid";

const getToken = (headers) => {
    if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
    }
    return undefined;
};

function tesjwt(parameter) {

    const options = { algorithm: 'RS256', expiresIn: '1h' };
    var token = jwt.sign(parameter, scret, { expiresIn: '1d' });
    console.log(token)
    return token
}

function decodejwt(data) {

    try {
        var decoded = jwt.verify(data, scret);
        return decoded
    } catch (err) {
        console.log(err);

    }

}


const verify = async(req, res, next) => {
    var cektoken = getToken(req.headers)
    console.log("headers: " + cektoken)
    if (!cektoken) {

        return res.status(401).json({ message: "Token not found!" });
    }

    var decodetoken = decodejwt(cektoken)
    console.log(decodetoken)
    if (!decodetoken) {

        return res.status(401).json({ message: "invalid tokken!" });
    }

    var datatoken = decodetoken;
    req.id_user = datatoken.id_user;
    req.role = datatoken.role;
    req.idaccount = datatoken.idaccount;
    req.Device_ID = datatoken.Device_ID;
    req.modul_name = datatoken.modul_name;
    req.name = datatoken.name;
    next();
}

function cekrole(data = []) {
    return (req, res, next) => {
        var role = req.role
        if (!data.includes(role)) {
            return res.status(401).json({ message: "Hak Akses Ditolak!" })
        }
        next();
    }

}



module.exports = { tesjwt, verify, cekrole }