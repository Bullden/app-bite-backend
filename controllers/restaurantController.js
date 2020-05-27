module.exports = function (app, mongoose) {
    var Restaurant = require('../models/restaurantModel')
    var bodyParser = require('body-parser')
    var urlencodedParser = bodyParser.urlencoded({
        extended: false
    })
    app.use(bodyParser.json())

    app.get('/restraunts', urlencodedParser, async function (req, res){

        try {
            const restaurant = await Restaurant.find();
            console.log(restaurant)
            if (!restaurant) {
                return res.status(404).send({
                    success: false,
                    message: 'phones not found!!!!'
                });
            }

            const token = restaurant

            res.status(200).send({
                success: true,
                message: 'Token generated Successfully',
                data: token,
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString()
            });
        }
    })

}
