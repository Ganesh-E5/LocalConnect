const express = require('express');
const router = express.Router();
const { createRequest, getRequests,getMyRequests, acceptRequest,getAssignedRequests,markRequestComplete } = require('../controllers/requestController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, createRequest);
router.get('/', verifyToken,getRequests)
router.get('/all', verifyToken,getMyRequests)
router.get('/assigned',verifyToken,getAssignedRequests)

router.patch('/:id/complete',verifyToken,markRequestComplete)
router.patch('/:id/accept',verifyToken,acceptRequest)
module.exports = router;