const Order = require('../models/orders');

exports.listOrders = function (req, res, next) {
    Order.find({}, (err, users) => {
        if (!err && users) {
            res.json(users);
        } else {
            res.json({
                "Error": err
            });
        }
    })
};

exports.getOrder = function (req, res, next) {
    // var token = (typeof (req.headers.token) !== 'undefined' && req.headers.token.length) > 0 ? req.headers.token : false;
    var order_id = (typeof (req.params.order_id) !== 'undefined' && req.params.order_id.length) > 0 ? req.params.order_id : false;
    // if (token && item_id) {
    Order.findOne({
        id: order_id
    }, function (err, order) {
        res.json(order)
    });
};

exports.createOrder = function (req, res, next) {

    if (typeof (req.body.order_id) !== 'undefined') {
        //if order already exists 
        Order.findOne({
            id: req.body.order_id
        }, function (err, order) {
            var orders = {
                name: req.body.item_name,
                qty: req.body.qty,
                unit_price: req.body.unit_price,
                price: req.body.price
            }

            if (order !== null) {
                order.items.push(orders);
                order.save(res.json({
                    "order": order.id
                }));
            } else {
                res.status(404).json({
                    "message": "order_id " + req.body.order_id + " not found"
                })
            }
        });
    } else {
        Order.aggregate([{
                $group: {
                    _id: null,
                    last_order_id: {
                        $max: '$id'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    last_order_id: 1
                }
            }
        ]).
        then(function (doc) {
            var order_id;
            if (typeof (doc[0]) === 'undefined') {
                order_id = 1
            } else {
                order_id = doc[0].last_order_id + 1;
            }
            let newOrder = new Order({
                id: order_id,
                date: Date.now(),
                total_price: req.body.total_price
            });

            Order.create(newOrder, (err, order) => {
                if (err) {
                    console.log(err);
                    res.json({
                        msg: 'Failed to add items in order'
                    });
                } else {
                    var items = {
                        name: req.body.item_name,
                        qty: req.body.qty,
                        unit_price: req.body.unit_price,
                        price: req.body.price
                    }
                    order.items.push(items);
                    order.save(res.json({
                        "orders": order.id
                    }));
                }
            })
        });
    }
};

exports.updateOrder = function (req, res, next) {
    var order_id = (typeof (req.body.order_id) !== 'undefined') > 0 ? req.body.order_id : false;
    var item_name = (typeof (req.body.item_name) !== 'undefined') > 0 ? req.body.item_name : false;
    if (order_id && item_name) {
        Order.findOne({
            "id": order_id,
            "items.name": item_name
        }, function (err, order) {
            if (!err && order) {
                Order.findOneAndUpdate({
                        "id": order_id,
                        "items.name": item_name
                    }, {
                        "$set": {
                            "items.$.qty": req.body.qty,
                            "items.$.unit_price": req.body.unit_price,
                            "items.$.price": req.body.price
                        }
                    },
                    function (err, doc) {
                        if (!err && doc) {
                            res.status(200).json({
                                "order": doc
                            })
                        }
                    }
                );
            } else {
                res.status(404).json({
                    "result": "token not found"
                })
            }
        });
    } else {
        if (!order_id && !item_name) {
            res.status(404).json({
                error: "order_id & item_name should be valid"
            })
        } else {
            if (!order_id) {
                res.status(404).json({
                    error: "order_id should be valid"
                })
            } else {
                res.status(404).json({
                    error: "item_name should be valid"
                })
            }
        }
    }
};

exports.deleteOrder = function (req, res, next) {
    var order_id = (typeof (req.params.order_id) !== 'undefined') ? req.params.order_id : false;
    var item_name = (typeof (req.params.item_name) !== 'undefined') ? req.params.item_name : false;
    if (order_id && item_name) {
        Order.findOne({
            id: order_id
        }, function (err, order) {
            var items = order.items.filter(function (items) {
                return items.name === item_name;
            }).pop();
            if (typeof (items) !== 'undefined') {

                Order.findOneAndUpdate({
                        id: order_id
                    }, {
                        $pull: {
                            items: {
                                name: item_name
                            }
                        }
                    },
                    function (err, doc) {
                        if (!err && doc)
                            res.status(200).json({
                                "result": "Item " + item_name + " deleted successfully"
                            })
                    });
            } else {
                res.status(404).json({
                    message: "order_id " + order_id + " and  item_name" + item_name + " is not found"
                });
            }
        });
    } else {
        if (!order_id && !item_name) {
            res.status(404).json({
                error: "order_id & item_name should be valid"
            })
        } else {
            if (!order_id) {
                res.status(404).json({
                    error: "order_id should be valid"
                })
            } else {

                Order.deleteOne({
                    id: order_id
                }, function (err) {
                    if (!err) {
                        res.status(200).json({
                            message: "order_id " + order_id + " deleted successfully"
                        })
                    } else {
                        res.status(404).json({
                            error: "order_id " + order_id + " could not be deleted"
                        })
                    }
                });
            }
        }
    }
};