let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({

    fx : {type: String ,required : true },
    x : {type: Number ,required : true}
});

let OnePoint = mongoose.model('OnePoint',userSchema5);
module.exports = OnePoint;