const Validator = require('fastest-validator');
const v = new Validator();


exports.validateUser = (req, res, next) =>{
    const schema = {
        id_user:{
            type:"string",
            max:20,
            min:3,
            empty: false,
            messages:{
                stringEmpty:req.t("user.user_id_is_rerquired"),
                stringMin: req.t("user.user_min_length"),
                stringMax: req.t("user.user_max_length")
            }
        },
        name:{
            type: "string",
            max: 30,
            min: 3,
            optional: true,
            messages:{
                stringMax: req.t("user.name_max_length"),
                stringMin: req.t("user.name_min_length")
            }
        },
        description:{
            type: "string",
            max: 100,
            optional: true,
            messages:{
                stringMax: req.t("user.description_max_lenght")
            }
        },
        telpon:{
            type: "string",
            max: 20,
            optional: true,
            messages:{
                stringMax: req.t("user.phone_number_max_length")
            }
        },
        email:{
            type: "string",
            max: 30,
            empty: false,
            messages:{
                stringEmpty: req.t("user.email_is_required"),
                stringMax: req.t("user.email_max_length")
            }

        },
        username:{
            type: "string",
            max: 20,
            min: 30,
            messages:{
                stringMax: req.t("user.username_max_length"),
                stringMin: req.t("user.username_min_length")
            }
        },
        password:{
            type: "string",
            max: 20,
            min: 3,
            empty: false,
            messages:{
                stringMin: req.t("user.password_min_length"),
                stringMax: req.t("user.password_max_length"),
                stringEmpty: req.t("user.password_is_required")
            }
        },
        id_account:{
            type: "string",
            max: 20,
            min: 3,
            empty: false,
            messages:{
                stringMax: req.t("user.id_account_max_length"),
                stringMin: req.t("user.id_account_min_length"),
                stringEmpty: req.t("user.id_account_required")
            }
        },
        role:{
            type: "string",
            max: 10,
            empty: false,
            messages:{
                stringEmpty:  req.t("user.role_required")
            }
        },
        Device_ID:{
            type: "string",
            max: 7,
            min:3,
            messages:{
                stringMax: req.t("user.device_id_max_lenght"),
                stringMin: req.t("user.device_id_min_length")

            }
        },
    }

    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate[0].message
        });
    }
    next();
}
