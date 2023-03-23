// !importing dependencies
// And destructuring on the fly
const {Router}=require("express");
const router=Router();
const adminControllerRoutes=require("../controller/adminController")

router.post("/admin/login",adminControllerRoutes.postLogin)
//  user==>
router.get('/dashboard/users',adminControllerRoutes.getTrainees);
router.patch('/dashboard/users/:id',adminControllerRoutes.userBlock);

// trainer==>
router.post('/dashboard/addTrainer',adminControllerRoutes.postAddTrainer);
router.get('/dashboard/getTrainer',adminControllerRoutes.getTrainers);
router.patch('/dashboard/blockTrainer/:id',adminControllerRoutes.trainerBlock);


module.exports=router;
