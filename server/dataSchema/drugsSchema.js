const monoogse = require('mongoose') ;
const mongoosePaginate = require('mongoose-paginate');

const drugsSchema = new monoogse.Schema({
    title : String ,
    description : String ,
    url : String ,
    category : String 
})

drugsSchema.plugin(mongoosePaginate) ;

drugsSchema.methods.saveDrugs = function(){
    this.save((err , data) => {
        if(err) console.log(err)
        else console.log(data) 
    })
}

const drugsModel = monoogse.model('drugs' , drugsSchema) ;

module.exports = drugsModel ;