const {Router} = require('express')
const {
    getUsers,
    postUser,
    updateUser,
    deleteUser
} = require ('../controllers/users')

const router = Router();

router.get('/', getUsers);
router.post('/', postUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;