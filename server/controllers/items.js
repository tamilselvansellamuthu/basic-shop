const Item = require('../models/items');

exports.listItems = function (req, res, next) {
    Item.find({}, (err, items) => {
        if (!err && items) {
            res.json(items);
        }
    })
};

exports.getItem = function (req, res, next) {
    Item.findOne({ id: req.params.item_id }, (err, user) => {
        if (!err && item) {
            res.json(item);
        }
    })
};

exports.createItem = function (req, res, next) {

    // Find the max balance of all accounts
    Item.aggregate([
        { $group: { _id: null, last_item_id: { $max: '$id' } } },
        { $project: { _id: 0, last_item_id: 1 } }
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
                    res.json({ msg: 'Failed to add item' });
                }
                else {
                    res.json({ msg: 'Item added successfully' });
                }
            })

        });
};

exports.updateItem = function (req, res, next) {
    Item.findOneAndUpdate({ id: req.body.item_id },
        {
            name: req.body.name,
            non_veg: req.body.non_veg,
            catagory: req.body.catagory,
            price: req.body.price
        },
        { new: true },
        function (err, item) {
            if (err) { res.json({ 'Error': ' Failed to update the db' }); }
            else {
                res.json(item);
            }
        });
};

exports.deleteItem = function (req, res, next) {
    Item.deleteOne({ id: req.params.item_id }, (err, data) => {
        if (err) {
            res.json({ 'Error': err });
        }
        else {
            res.json(data);
        }
    });
};