const router = require('express').Router();
const controller = require('../controller/admin');
const userController = require('../controller/user') ;
const productController = require('../controller/product');

router.get('/users',verifyToken, controller.getRegisteredUsers) ;
router.put('/users' ,userController.update ) ;
router.get('/foods',productController.getFoods) ;
router.post('/foods',verifyToken,productController.postFood) ;
router.post('/drugs',verifyToken,productController.postDrug) ;
router.put('/drugs' , verifyToken , productController.updateDrugsOrFoods) ;
router.put('/foods', verifyToken , productController.updateDrugsOrFoods) ;
router.delete('/foods' , verifyToken , productController.deleteProduct) ;
router.delete('/drugs' , verifyToken , productController.deleteProduct) ;
router.get('/drugs',productController.getDrugs) ;
router.post('/token',verifyToken,controller.refreshToken ) ;

function verifyToken(req ,res ,next){
    console.log(req.headers) ;
    const bearerHeader = req.headers['authorization'] ;
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ') ;
        const bearerToken = bearer[1] ;
        req.token = bearerToken ;
        next();
    }else{
        res.status(403).send({msg : 'forbbinden'})
    }
}

module.exports = router ;