const Validator = require('fastest-validator');
const v = new Validator();

exports.validateAccount = (req, res, next)=>{
    const schema = {
        id_account: {
            type:"string",
            max: 10,
            min: 3,
            empty: false,
            messages:{
                stringMax: req.t('account.id_account_max_length'),
                stringEmpty: req.t('account.id_account_is_required'),
                stringMin: req.t('account.id_account_min_length')
            }
        },
        name:{
            type:"string",
            optional: true,
            max: 20,
            messages:{
                stringMax: req.t('account.name_max_length')
            }
        },
        description:{
            type: "string",
            optional: true,
        },
        email:{
            type: "string",
            empty: false,
            max: 30,
            messages:{
                stringMax: req.t('account.email_max_length'),
                stringEmpty: req.t('account.email_is_required')
            }
        },
        address:{
            type: "string",
            optional: true,
        },
        status: {
            type: "string",
            optional: true,
            max: 20,
            messages: {
                stringMax: req.t('account.status_max_length'),
            }
        },
        registerDate:{
            type: "string",
            optional: true
        },
        expiredDate:{
            type: "string",
            optional: true
        },
        cleanData:{
            type: "string",
            optional: true,
            max: 2,
            messages:{
                stringMax: req.t('account.clean_data_max_length')
            }
        },
        modul_name: {
            type: "string",
            optional: true,
            max: 20,
            messages:{
                stringMax: req.t('account.modul_name_max_length')
            }
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