const Validator = require('fastest-validator');
const v = new Validator();


exports.validateUser = (req, res, next) =>{
    const schema = {
        id_user:{
            type:"string",
            max:20,
            min:3,
            empty: false
        },
        name:{
            type: "string",
            max: 30,
            min: 3,
            optional: true
        },
        description:{
            type: "string",
            max: 100,
            optional: true
        },
        telpon:{
            type: "string",
            max: 20,
            optional: true
        },
        email:{
            type: "string",
            max: 30,
            empty: false,

        },
        username:{
            type: "string",
            max: 20,
            empty: false
        },
        password:{
            type: "string",
            max: 20,
            min: 3,
            empty: false
        },
        id_account:{
            type: "string",
            max: 20,
            min: 3,
            empty: false
        },
        role:{
            type: "string",
            max: 10,
            empty: false
        },
        Device_ID:{
            type: "string",
            max: 7,
            min:3
        },
    }
}