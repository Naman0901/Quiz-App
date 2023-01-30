const express = require("express");
const router = express.Router();
const adminControl = require('../controllers/adminControllers');
router.use(express.json());

router.post("/test",adminControl.addtest);
router.post("/question",adminControl.addquestion);
router.get("/question/:id",adminControl.getquestion);
router.put("/question/:id",adminControl.updquestion);

module.exports = router;
