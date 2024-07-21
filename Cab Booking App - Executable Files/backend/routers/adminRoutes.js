const adminControllers=require('../controllers/adminControllers')
const app=require('express')
const router=app.Router();

router.post('/adminlogin',adminControllers.checkAdmin)

module.exports=router