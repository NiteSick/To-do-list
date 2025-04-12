const express = require("express");
const { handleRefresh } = require("../controllers/refresh");
const router = express.Router();

router.get("/", handleRefresh);

module.exports = router;
