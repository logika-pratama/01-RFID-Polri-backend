const Validator = require('fastest-validator')
const v = new Validator();

exports.validateLocation = (req, res, next) => {
    
    const schema = {
        id_location: {
            type: "string",
            empty: false,
            max: 30,
            messages: {
                stringEmpty: req.t('location.id_location_required')
            }

        },
        name : {
            type: "string",
            optional: true,
            max: 30

        },
        description :{
            type: "string",
            optional: true,
            max: 30

        },
        id_account:{
            type: "string",
            empty: false,
            max: 30,
            messages:{
                stringEmpty: req.t('location.id_account_is_required')
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
}