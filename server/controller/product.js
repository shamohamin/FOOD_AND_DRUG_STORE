const _ = require('lodash') ;
const foodModel = require('../dataSchema/foodSchema') ;
const drugModel = require('../dataSchema/drugsSchema') ;
const jwt = require('jsonwebtoken')


const controller = {

    getFoods : (req , res) => {
        const category = req.query.category || 'processed'; 
        const page = req.query.page || 1 ;
        const limit = req.query.limit || 3 ;
                
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
        };

        foodModel.paginate({category} , option , (err , foods) => {
            if(err) res.status(500).send(err)
            else {
                const food = {
                    doc : foods.docs.map(item => {
                        const newItem = {
                            _id : item._id ,
                            title : item.title,
                            description : item.description ,
                            category : item.category ,
                            url : item.url ,
                        }
                        return newItem ;
                    }),
                    page : foods.page ,
                    limit : foods.limit ,
                    total : foods.total 
                }

                res.status(200).send(food) ;
            }
        })
    },

    postFood : (req , res) => {
        
        jwt.verify(req.token , 'secretedkey222223' , (err,data) => {
            if(err) res.status(403).send({msg : 'forbbiden'})
            else {
                const {...userData} = data.user ; 
                if(userData.isAdmin){
                    const credential = _.pick(req.body , 
                        ['title','description','url','category']) ;
                    const food = new foodModel(credential) ;
                    food.saveFood() ;
                        console.log(food) ;
                    res.status(200).send(food) ;
                }else{
                    res.status(401).send({msg : 'unthurized'})
                }
            }
        })
        

    } ,

    getDrugs : (req , res) => {
        const page = req.query.page || 1 ;
        const limit = req.query.limit || 5 ;

        const category = req.query.category || 'pharmaceutical' ;
                
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
        };


        drugModel.paginate({category} , option , (err , drugs) => {
            if(err) res.status(500).send(err)
            else {
                const drug = {
                    doc : drugs.docs.map(item => {
                        const newItem = {
                            _id : item._id ,
                            title : item.title,
                            description : item.description ,
                            category : item.category ,
                            url : item.url ,
                        }
                        return newItem ;
                    }),
                    page : drugs.page ,
                    limit : drugs.limit ,
                    total : drugs.total 
                }
                res.status(200).send(drug)
            }
        })
    },

    postDrug : (req , res) => {
        console.log(req.body)
        jwt.verify(req.token , 'secretedkey222223' , (err,data) => {
            if(err) res.status(403).send({msg : 'forbbiden'}) 
            else {
                const {...userData} = data.user ;
                if(userData.isAdmin){
                    const credential = _.pick(req.body ,
                        ['title','description','url' ,'category']) ;
                    const drug = new drugModel(credential) ;
                    drug.saveDrugs() ;
                    res.status(200).send(drug) ;
                }else{
                    res.status(401).send({msg : 'unauthorized'})
                }
            }
        })   
    },

    updateDrugsOrFoods : (req , res) => {
        console.log(req.body)
        jwt.verify(req.token , 'secretedkey222223' , (err , data) => {
            if(err) res.status(403).send({msg : 'forbbiden'}) 
            else {
                const {...userData} = data.user ; 
                if(userData.isAdmin){
                    const credentials = _.pick(req.body , 
                        ['category' , 'url' , 'description' , 'title' , '_id']) ;
                    let model;
                    if(credentials.category === "processed" || credentials.category === "unprocessed"){
                        model = foodModel ;
                    }else{
                        model = drugModel ;
                    }
                    console.log(model) ;
                    model.findByIdAndUpdate({_id : credentials._id},credentials,
                        {useFindAndModify: false} ,(err , data) => {
                            console.log(data)
                        if(err) res.status(500).send(err)
                        else res.status(200).send(credentials)
                    })
                }else{
                    res.status(401).send({msg : 'unauthorized'})
                }
            }
        })
    },

    deleteProduct : (req , res) => {
        jwt.verify(req.token , 'secretedkey222223' , (err , data) => {
            if(err) res.status(403).send({msg : 'forbbiden'})
            else {
                const {...dataUser} = data.user ;
                if(dataUser.isAdmin){
                    console.log(req.body)
                    const credentials = _.pick(req.body , 
                            ['_id' , 'category']) ;
                    let model;
                    if(credentials.category === "processed" || credentials.category === "unprocessed"){
                        model = foodModel ;
                    }else{
                        model = drugModel ;
                    }
                    model.findByIdAndDelete({_id : credentials._id},(err , data) => {
                        if(err) res.status(500).send(err)
                        else res.status(204).send(credentials.id)
                    })
                }else{
                    res.status(401).send({msg : 'unauthorized'})
                }
                
            }
        })
    }

};



module.exports = controller ; 
