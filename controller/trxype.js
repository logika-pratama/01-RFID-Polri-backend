'usse strict';
const response = require('../res');
const koneksi = require('../koneksi');


exports.getTrx = function(req, res) {
    koneksi.query('SELECT * FROM Transaction_type', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            res.send({
                status: 'succes',
                message: req.t('success_get_data'),
                data: rows
            });
        }
    });
}

exports.addTrx = function(req, res) {
    const trx_type = req.body.trx_type;
    console.log(req.body)
    koneksi.query('INSERT INTO Transaction_type (trx_type) VALUES (?)', [trx_type],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                response.ok({
                    status: 'error',
                    message: error.sqlMessage,
                }, res)
            } else {
                res.send({
                    status: 'succes',
                    message:  req.t('success_get_data')
                });
            }
        }
    );
};