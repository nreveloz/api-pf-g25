const { Router } = require('express');

const bookRouter = require("./bookRouter");
const router = Router();

router.use('/books', bookRouter);

module.exports = router;