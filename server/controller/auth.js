const _ = require('lodash');
const bcrypt = require('bcryptjs');
const usersModel = require('../dataSchema/userSchema');
const jwt = require('jsonwebtoken');

const controller = {
    login : (req , res ) => {
        const credentials = _.pick(req.body ,['emailAddress' , 'password']);
        usersModel.findOne({emailAddress:credentials.emailAddress},(err,user) => {
            if(err) res.status(500).send(err)
            else if(!user) res.status(404).send("this EmailAddress not Registred")
            else {
                bcrypt.compare(credentials.password,user.password)
                .then(isMatch => {
                    if(isMatch){
                        const data = {
                            _id : user._id ,
                            firstName : user.firstName ,
                            lastName : user.lastName ,
                            emailAddress : user.emailAddress ,
                            intrestType : user.intrestType ,
                            phone : user.phone ,
                            isAdmin : user.isAdmin 
                        };
                        const token = jwt.sign({user},'secretedkey222223') ;
                        res.send({ data , token }) ;
                    }else{
                        res.status(400).send('password is wrong')
                    }
                }).catch(err => {
                    res.status(500).send(err)
                })
            }
        })
    },
    register : (req , res) => {
        const credentials = _.pick(req.body , 
        ['firstName','lastName','emailAddress','phone','intrestType','password','isAdmin']);
        console.log(credentials) ;
        usersModel.findOne({emailAddress:credentials.emailAddress},
                            function(err,user){
            if(err){ 
                console.log(err);
                res.status(500).send(err)
            }
            else if(user){
                res.status(400).send("User Already Registered");
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                bcrypt.hash(credentials.password , salt)
                .then(hashPassword => {
                    const data = {
                        firstName : credentials.firstName ,
                        lastName : credentials.lastName,
                        emailAddress : credentials.emailAddress ,
                        intrestType : credentials.intrestType ,
                        phone : credentials.phone ,
                        password : hashPassword ,
                    } ;
                    console.log(data)
                    const user = new usersModel(data);
                    user.saveUser() ;
                    delete data.password ;
                    data._id = user._id ;
                    data.isAdmin = user.isAdmin ;
                    jwt.sign({userData : data}, 'secretedkey222223'
                            ,(err , token) => {
                                console.log(token)
                                if(err) res.status(500).send(err)
                                else res.status(200).send({data , token})
                            });
                }).catch(err => res.status(500).send(err))
            }
        })    
    }
}

module.exports = controller ;