const userModel = require('../dataSchema/userSchema');
const _ = require('lodash');


const controller = {
    update : (req , res) => {
        const credentials = _.pick(req.body , 
        ['_id','emailAddress','firstName','lastName','phone','intrestType','isAdmin']);
        console.log(credentials)
        userModel.findByIdAndUpdate({ _id : credentials._id},credentials, 
            {useFindAndModify: false},function(err,user){
                if(err) res.status(500).send(err)
                else {
                    credentials.isAdmin = user.isAdmin ;
                    res.status(200).send(credentials) ;
                }
        })
    }
}

module.exports = controller ;