const express = require("express");
const router = express.Router();

const { signup, signin, getAllUsers, getOneUser, updateUser, deleteUser } = require("../controllers/user.controller");


router.post('/signup', signup);
router.post('/signin', signin);

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

 
module.exports = router;