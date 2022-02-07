'usse strict';
const response = require('../res');
const koneksi = require('../koneksi');


exports.getTrx = function(req, res) {
    koneksi.query('SELECT * FROM Transaction_type', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok({
                status: 'succes',
                message: 'berhasil mendapatkan data',
                data: rows
            }, res);
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
                response.ok({
                    status: 'succes',
                    message: 'berhasil menambahkan type transaksi'
                }, res);
            }
        }
    );
};