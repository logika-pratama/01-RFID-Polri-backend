const Validator = require('fastest-validator');
const v = new Validator();

exports.validateItem = (req, res, next)=>{

    const schema = {
        Item_code: {
            type: "string",
            optional: true,
            max: 20,
            messages:{
                stringMax: req.t("item.max_item_code")
            }
        },
        Item_category: {
            type: "string",
            optional: true
        },
        Item_Type: {
            type: "string",
            optional: true
        },
        SKU: {
            type: "string",
            empty: false
        },
        Name: {
            type: "string",
            optional: true
        },
        Description: {
            type: "string",
            optional: true
        },
        Uom: {
            type: "string",
            optional: true
        },
        tag_number: {
            type: "string", 
            empty:false, 
            max:100, 
            messages: { 
                stringMax: req.t("item.max_tag_number"), 
                stringEmpty: req.t("item.tag_required")
            }
        },
        Ref_Number:{
            type: "string",
            empty: false,
            max: 15,
            messages:{
               stringEmpty: req.t("item.ref_required"),
               stringMax: req.t("item.max_ref_number")
            }
        }
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