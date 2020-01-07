const Schema = require('mongoose').Schema ;
const mongoose = require('mongoose') ;
const mongoosePaginate = require('mongoose-paginate');

const usersSchema = new Schema({
    firstName : {type : String},
    lastName : {type : String},
    phone : {type  : String },
    password : {type : String},
    intrestType : {type : String},
    emailAddress : {type : String},
    isAdmin : {type : Boolean , default : false}
},{timestamps : true })
usersSchema.plugin(mongoosePaginate);

usersSchema.methods.saveUser = function(){
    this.save(function(err , data){
        if(err) console.log(err)
        else console.log(data)
    })
}

const usersModel = mongoose.model('Users' , usersSchema) ;

module.exports = usersModel ;