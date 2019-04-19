const Item = require('../models/items');

exports.listItems = function (req, res, next) {
    Item.find({}, (err, items) => {
        if (!err && items) {
            msg = [];
            for (i = 0; i < items.length; i++) {
                item = {
                    item_id: items[i].id,
                    item_name: items[i].name,
                    non_veg: items[i].non_veg,
                    catagory: items[i].catagory
                }
                msg[i] = item
            }
            res.json({
                message: msg
            });
        }
    })
};

exports.getItem = function (req, res, next) {
    Item.findOne({
        id: req.params.item_id
    }, (err, item) => {
        if (!err && item) {
            msg = {
                message: {
                    item_id: item.id,
                    item_name: item.name,
                    non_veg: item.non_veg,
                    catagory: item.catagory
                }
            }
            res.json(msg);
        }else{
            res.json({
                message:err
            });
        }
    })
};

exports.createItem = function (req, res, next) {

    if (typeof (req.body.item_name) === 'undefined') {
        res.status(400).send({
            "message": "item_name not valid"
        })
    } else if (typeof (req.body.non_veg) === 'undefined') {
        res.status(400).send({
            "message": "non_veg not valid"
        })
    } else if (typeof (req.body.catagory) === 'undefined') {
        res.status(400).send({
            "message": "catagory not valid"
        })
    } else if (typeof (req.body.price) === 'undefined') {
        res.status(400).send({
            "message": "price not valid"
        })
    } else {
        // Find the max balance of all accounts
        Item.aggregate([{
                $group: {
                    _id: null,
                    last_item_id: {
                        $max: '$id'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    last_item_id: 1
                }
            }
        ]).
        then(function (doc) {
            var item_id;
            if (typeof (doc[0]) === 'undefined') {
                item_id = 1
            } else {
                item_id = doc[0].last_item_id + 1;
            }

            let newItem = new Item({
                id: item_id,
                name: req.body.item_name,
                non_veg: req.body.non_veg,
                catagory: req.body.catagory,
                price: req.body.price,
            });

            Item.create(newItem, (err, item) => {
                if (err) {
                    res.json({
                        message: 'Failed to add item'
                    });
                } else {
                    res.json({
                        message: {
                            item_id:item.id,
                            item_name:item.name,
                            non_veg:item.non_veg,
                            catagory:item.catagory,
                            price:item.price
                        }
                    });
                }
            })

        });
    }
};

exports.updateItem = function (req, res, next) {
    if (typeof (req.body.item_id) === 'undefined') {
        res.status(400).send({
            message: "item_id not valid"
        })
    } else {
        payload = {};
        if (typeof (req.body.item_name) !== 'undefined') {
            payload.name = req.body.item_name;
        }
        if (typeof (req.body.non_veg) !== 'undefined') {
            payload.non_veg = req.body.non_veg;
        }
        if (typeof (req.body.catagory) !== 'undefined') {
            payload.catagory = req.body.catagory;
        }
        if (typeof (req.body.price) !== 'undefined') {
            payload.price = req.body.price;
        }

        Item.findOneAndUpdate({
                id: req.body.item_id
            }, payload, {
                new: true
            },
            function (err, item) {
                if (err) {
                    res.json({
                        'message': err
                    });
                } else {
                    msg = {
                        message: {
                            item_id: item.id,
                            item_name: item.name,
                            non_veg: item.non_veg,
                            catagory: item.catagory
                        }
                    }
                    res.json(msg);
                }
            });
    }
};

exports.deleteItem = function (req, res, next) {
    Item.deleteOne({
        id: req.params.item_id
    }, (err, deletedItem) => {
        if (err) {
            res.json({
                'Error': err
            });
        } else {
            if (deletedItem.deletedCount === 1) {
                msg = {
                    message: "Item deleted successfully"
                }
            } else {
                msg = {
                    message: "Item detetion failed"
                }
            }
            res.json(msg);
        }
    });
};