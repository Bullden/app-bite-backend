module.exports = function (app, mongoose) {
    var User = require('../models/userModel')
    var bodyParser = require('body-parser')
    var urlencodedParser = bodyParser.urlencoded({
        extended: false
    })
    app.use(bodyParser.json())

    app.get('/users', urlencodedParser, async function (req, res){

        try {
            const user = await User.find();
            console.log(user)
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'person not found!!!!'
                });
            }

            const token = user

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

    app.post('/users', urlencodedParser, async function (req, res) {
        const info = req.body
        console.log(info)
        try {
            const checkUser =  await User.findOne({phone: info.phone})
            if(checkUser) {
                if(info.nameOfCategory === 'Personal info') {
                    checkUser['personalInfo'] = {
                        name: info.personalInfo.name,
                        surname: info.personalInfo.surname,
                        middlename: info.personalInfo.middlename,
                        email: info.personalInfo.email,
                        image: info.personalInfo.image
                    }
                }
                if(info.nameOfCategory === 'Address') {
                    checkUser['address'] = {
                        address1: info.address.address1,
                        address2: info.address.address2,
                        appartament: info.address.appartament,
                        floor: info.address.floor,
                        deliveryNote: info.address.deliveryNote
                    }
                }
                const newCheckUser = await checkUser.save();
                console.log('newCheckUser',newCheckUser);

            } else {
                const user = new User({
                    phone: info.phone
                })
                if(info.nameOfCategory === 'Personal info') {
                    user['personalInfo'] = {
                        name: info.personalInfo.name,
                        surname: info.personalInfo.surname,
                        middlename: info.personalInfo.middlename,
                        email: info.personalInfo.email,
                        image: info.personalInfo.image
                    }
                }
                if(info.nameOfCategory === 'Address') {
                    user['address'] = {
                        address1: info.address.address1,
                        address2: info.address.address2,
                        appartament: info.address.appartament,
                        floor: info.address.floor,
                        deliveryNote: info.address.deliveryNote
                    }
                }
                console.log('USERRR',user);
                
                const newUser = await user.save();
                console.log('new',newUser);
            }

            res.status(200).send({
                success:true,
                message:'Successfully added'
            });
        } catch(err) {
            res.status(500).send({
                success:false,
                message:err.toString()
            })
        }
    })

}