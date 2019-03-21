const User = require('../models/users');
exports.createAdminUser = function (req, res) {

    // create a sample user
    var nick = new User({
        name: 'admin',
        password: 'admin',
        admin: true
    });

    // save the sample user
    nick.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
}