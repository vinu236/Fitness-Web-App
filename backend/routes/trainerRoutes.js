const{Router}=require("express")
const router=Router()
const trainerController=require("../controller/trainerController")

 router.post("/trainer/login",trainerController.postLogin,)
 router.get("/trainer/:id",trainerController.getTrainer)

router.get("/assigned/trainee/:id",trainerController.assignedTrainees);


module.exports=router;
