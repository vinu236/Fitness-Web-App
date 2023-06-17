// !importing dependencies
// And destructuring on the fly
const {Router}=require("express");
const router=Router();
const adminControllerRoutes=require("../controller/adminController")
const multer=require("multer");
const {storage}=require("../cloudinary")
const upload=multer({storage})
//admin login=>
router.post("/admin/login",adminControllerRoutes.postLogin)

//  user==>
router.get('/dashboard/users',adminControllerRoutes.getTrainees);
router.patch('/dashboard/users/:id',adminControllerRoutes.userBlock);

// trainer==>
router.post('/dashboard/addTrainer',adminControllerRoutes.postAddTrainer);
router.get('/dashboard/getTrainer',adminControllerRoutes.getTrainers);
router.patch('/dashboard/blockTrainer/:id',adminControllerRoutes.trainerBlock);


//plan=>
router.post("/dashboard/addPlan",upload.single("img"),adminControllerRoutes.addPlan);
router.get("/dashboard/plan",adminControllerRoutes.getPlans);
router.delete("/dashboard/delete/plans/:id",adminControllerRoutes.deletePlans)
router.get("/dashboard/getPlans/details/:id",adminControllerRoutes.getPlanDetails);
router.patch("/update/plans/:id",upload.single("img"),adminControllerRoutes.updatePlans);


//bookings
router.get("/bookings",adminControllerRoutes.getBookings);
router.get("/bookingDetail/:id",adminControllerRoutes.getUserBooking);
router.patch("/booking/:id",adminControllerRoutes.patchBooking);


//count 
router.get("/count/plans",adminControllerRoutes.getPlansCount)
router.get("/count/trainees",adminControllerRoutes.getTraineesCount)
router.get("/count/trainers",adminControllerRoutes.getTrainersCount)
router.get("/count/bookings",adminControllerRoutes.getBookingsCount)



module.exports=router;
