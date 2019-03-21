const express = require('express');
const router = express.Router();

const users = require('../controllers/users')
const items = require('../controllers/items')
const orders = require('../controllers/orders')
const tokens = require('../controllers/tokens')

// retrive all items
router.get('/items', users.listItems);

// create token
router.post('/authenticate', tokens.authentication);

// verify token
// router.use(tokens.verify);

router.get('/', function (req, res) {
    res.json({
        message: 'Welcome to the coolest API on earth!'
    });
});

// retrive a item
router.get('/item/:item_id', items.getItem);

// add a item
router.post('/item', items.createItem);

// update a item
router.put('/item', items.updateItem);

// delete a item
router.delete('/item/:item_id', items.deleteItem);

// retrive a orders
router.get('/orders', orders.listOrders);

// retrive a order
router.get('/order/:order_id', orders.getOrder);

// add a order
router.post('/order', orders.createOrder);

// update a order
router.put('/order', orders.updateOrder);

// delete a order
router.delete('/order/:order_id', orders.deleteOrder);

// delete a order item
router.delete('/order/:order_id/:item_name', orders.deleteOrder);

module.exports = router;
