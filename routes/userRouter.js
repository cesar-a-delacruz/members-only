const controller = require("../controllers/userController");
const router = require("express").Router();

router.get("/new", controller.new);
router.post("/new", controller.create);
router.post("/join", controller.join);

module.exports = router;
