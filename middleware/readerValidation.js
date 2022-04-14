const Validator = require('fastest-validator');
const v = new Validator();

exports.validateReader = (req, res, next) =>{
    const schema = {
        name: {
            type: "string",
            max: 30,
            optional: true,
            messages:{
                stringMax: req.t('reader.max_length_of_name')
            }
        },
        description:{
            type: "string",
            optional: true
        },
        id_account:{
            type: "string",
            max: 20,
            empty: false
        },
        id_location:{
            type: "string",
            max: 20,
            empty: false

        },
        trxtype:{
            type:"string",
            max: 20,
            empty: false

        }
    }

    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate[0].message
        })
    }
    next();
}