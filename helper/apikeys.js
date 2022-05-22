const koneksi = require('../koneksi');
const response = require('../res')

const genKey = () => {
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};

const createUser = (_email, req) => {
    let today = new Date().toISOString().split('T')[0];
    let user = {
        _id: Date.now(),
        api_key: genKey(),
        email: _email,
        host: req.headers.origin, 
        usage: [{ date: today, count: 0 }],
    };
    console.log('add user');
    users.push(user);
    return user;
};


exports.validateUser = function validateUser(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    if (email && email != '' && password && password != '') {
        koneksi.query(`SELECT email, password,id_account,Device_ID, id_user FROM users WHERE email = ? AND password = ? `, [email, password],
            function(error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    if (rows.length < 1) {
                        return response.warning({
                            status: 'failed',
                            message: 'email atau password salah'
                        }, res);
                        next()
                    }
                    console.log('Success Generate API-Key');
                    req.id_user = rows[0].id_user;
                    req.idaccount = rows[0].id_account;
                    req.Device_ID = rows[0].Device_ID;
                    // console.log(rows);
                    next()

                }

            }
        )
    }
}


exports.validateKey = function validateKey(req, res, next) {
    let host = req.headers.origin;
    let api_key = req.headers.api_key;
    console.log(api_key);
    api_key = JSON.stringify(api_key);
    console.log(req.headers);
    if (api_key) {
        koneksi.query(`SELECT * FROM users WHERE api_key = ${api_key}`,
            function(error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    if (rows.length < 1) {
                        return response.warning({
                            status: 'Failed',
                            message: 'Api-Key Not Found'
                        }, res)
                    }
                    console.log('Success Call API');
                    req.id_user = rows[0].id_user;
                    req.role = rows[0].role;
                    req.idaccount = rows[0].id_account;
                    req.Device_ID = rows[0].Device_ID;
                    req.name = rows[0].name;
                    next();
                }
            });
    }
}