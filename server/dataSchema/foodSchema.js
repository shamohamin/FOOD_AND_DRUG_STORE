const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate') ;


const foodSchema = new mongoose.Schema({
    title : String ,
    description : String ,
    url : String ,
    category : String 
});

foodSchema.plugin(mongoosePaginate) ;

foodSchema.methods.saveFood = function(){
    this.save(function(err , data){
        if(err) console.log(err) 
        else console.log(data)
    })
}

const foodModel = mongoose.model('foodModel' , foodSchema) ;

module.exports = foodModel ;




