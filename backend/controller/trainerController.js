const Trainer=require('../model/addTrainer');

exports.postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userCredentialsCheck = await Trainer.findOne({ email, password });
      if (!userCredentialsCheck) {
        throw new Error("User is not found");
      }
      res.status(200).json();
    } catch (error) {
      console.log(error);
    }
  };