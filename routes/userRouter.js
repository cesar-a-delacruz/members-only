const controller = require("../controllers/userController");
const router = require("express").Router();

router.get("/sign-up", controller.new);
router.post("/sign-up", controller.create);
router.post("/join", controller.join);

module.exports = router;
