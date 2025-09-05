const controller = require("../controllers/messageController");
const router = require("express").Router();

router.get("/", controller.index);
router.get("/new", controller.new);
router.post("/new", controller.create);
router.post("/delete", controller.delete);

module.exports = router;
