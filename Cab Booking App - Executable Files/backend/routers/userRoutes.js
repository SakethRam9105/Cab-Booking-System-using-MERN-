const userControllers=require('../controllers/userControllers')
const app=require('express')
const router=app.Router();

router.get('/getAllUsers',userControllers.getAllUsers)
router.get('/getUser/:id',userControllers.getuserbyId)
router.post('/register',userControllers.postUser);
router.post('/login',userControllers.checkUser)
router.put('/userEdit/:id',userControllers.updateUserById)
router.delete('/deleteUser/:id',userControllers.deleteUser)


module.exports=router