let mongoose = require('mongoose');

//Schema Validation

let userSchema5 = mongoose.Schema({
    
    fx : {type: String ,required : true },
    lower : {type: Number ,required : true},
    upper : {type: Number ,required : true}
});

let Integrat = mongoose.model('Integrat',userSchema5);
module.exports = Integrat;