const usersModel = require('../dataSchema/userSchema');
const jwt = require('jsonwebtoken') ;
const _ = require('lodash') ;

const controller = {
    getRegisteredUsers : (req , res) => {
        // console.log(req)
        // console.log(req.token) ;
        jwt.verify(req.token , 'secretedkey222223' , (err , data) => {
            // console.log(data)
            
            // console.log(userData);
            
            if(err) res.status(403).send({msg : 'forbbiden'})
            else {
                const {...userData} = data.user ;
                console.log(data) ;
                if(userData.isAdmin){
                    
                    // console.log("hello");
                    let page = req.query.page;
                    let limit = req.query.limit;
                    // console.log(limit)
                    if (page === undefined || limit === null){
                        page = 1 ;
                    }
                    if(limit === undefined || limit === null){
                        limit = 5 ;
                    }

                    const myCustomLabels = {
                        totalDocs: 'itemCount',
                        docs: 'itemsList',
                        limit: 'perPage',
                        page: 'currentPage',
                        nextPage: 'next',
                        prevPage: 'prev',
                        totalPages: 'pageCount',
                        pagingCounter: 'slNo',
                        meta: 'paginator'
                    };

                    const option = {
                        page:parseInt(page) , limit:parseInt(limit) , myCustomLabels
                    }

                    usersModel.paginate({},option,function(err , users){
                        console.log(err)
                        if(err) res.status(500).send(err)
                        else {
                            console.log(users);
                            const user = {
                                doc : users.docs.map(item => {
                                    const newItem = {
                                        _id : item._id ,
                                        firstName : item.firstName,
                                        lastName : item.lastName ,
                                        phone : item.phone ,
                                        intrestType : item.intrestType ,
                                        emailAddress : item.emailAddress
                                    }
                                    return newItem ;
                                }),
                                page : users.page ,
                                limit : users.limit ,
                                total : users.total 
                            }
                            res.status(200).send(user)
                        }
                    })
                }else{
                    res.status(401).send({msg : 'unauthorized'}) ;
                }
            }
        })
    } ,
    refreshToken : (req , res) => {
        const user = _.pick(req.body , 
        ['_id','lastName' ,'firstName' , 'isAdmin' ,'emailAddress','intrestType','phone']);
        console.log(user)
        jwt.sign({user : user }, 'secretedkey222223' ,{expiresIn : 60*60} ,(err , token) => {
            if(err) {
                console.log(err) ;
                res.status(500).send(err) ;
            }
            else res.status(200).send(token) 
        })
    } 
}



module.exports = controller ;