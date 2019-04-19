// const Item = require('../models/items');

// exports.listItems = function (req, res, next) {
//     Item.find({}, (err, items) => {
//         if (!err && items) {
//             res.json(items);
//         }
//     })
// };

// exports.getItem = function (req, res, next) {
//     Item.findOne({ id: req.params.item_id }, (err, user) => {
//         if (!err && item) {
//             res.json(item);
//         }
//     })
// };

// exports.createItem = function (req, res, next) {
//     Item.findOne({ id: 0 })
//         .sort('-score')  // give me the max
//         .exec(function (err, item_id) {
//             if (!err && item_id) {
//                 console.log(item_id);
//             }
//         });

//     let newUser = new Item({
//         id: req.body.item_id,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         phone: req.body.phone,
//         email: req.body.email,
//         password: req.body.password
//     });

//     Item.create(newUser, (err, user) => {
//         if (err) {
//             res.json({ msg: 'Failed to add user' });
//         }
//         else {
//             res.json({ msg: 'User added successfully' });
//         }
//     })
// };

// exports.updateUser = function (req, res, next) {
//     Item.findOneAndUpdate({ user_id: req.body.phone },
//         {
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             phone: req.body.phone,
//             email: req.body.email,
//             password: req.body.password
//         },
//         { new: true },
//         function (err, contact) {
//             if (err) { res.json({ 'Error': ' Failed to update the db' }); }
//             else {
//                 res.json(contact);
//             }
//         });
// };

// exports.deleteUser = function (req, res, next) {
//     Item.deleteOne({ user_id: req.params.phone }, (err, data) => {
//         if (err) {
//             res.json({ 'Error': err });
//         }
//         else {
//             res.json(data);
//         }
//     });
// };