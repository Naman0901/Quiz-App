const express = require("express");
const router = express.Router();
const userControl = require('../controllers/userControllers');
router.use(express.json());

router.get("/quiz",userControl.getquiz);
router.get("/test/:id", userControl.getquestions);
module.exports = router;
