module.exports = function (app, mongoose) {
    var Phone = require('../models/phoneModel')
    var bodyParser = require('body-parser')
    var urlencodedParser = bodyParser.urlencoded({
        extended: true
    })
    app.use(bodyParser.json())

    function randomizeInteger(min, max) {
        min = Math.ceil(min);  // inclusive min
        max = Math.floor(max); // exclusive max

        if(min > max - 1) {
            throw new Error("Incorrect arguments.");
        }

        return min + Math.floor((max - min) * Math.random());
    }

    let code =''
    app.post('/phones', urlencodedParser, async function (req, res) {
        const phoneNumber = req.body.phoneNumber
        try {
            const phone = new Phone({
                phoneNumber
            })
            const newPhone = await phone.save();
            console.log('new',newPhone);

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
        code = randomizeInteger(10000,99999);
        console.log(code)
        // const accountSid = 'AC7504c012cdb18a275f6bd6163aad1baa';
        // const authToken = '2fef1e1f93c043923d1e802a237510ff';
        // const client = require('twilio')(accountSid, authToken);
        //
        // client.messages
        //     .create({
        //         body: `Hello! Your code is ${code}`,
        //         from: '+14076033864',
        //         to: '+380997009376'
        //     })
        //     .then(message => console.log(message.sid));
    })

    app.get('/phones', urlencodedParser, async function (req, res){

        try {
            const phones = await Phone.find();
            if (!phones) {
              return res.status(404).send({
                success: false,
                message: 'phones not found!!!!'
              });
            }

            const token = phones

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

    app.post('/phones-code', urlencodedParser, async function(req, res,) {
        const phoneCode = req.body.phoneCode
        if (code === +phoneCode) {
            res.status(200).send({
                success: true,
                message: 'Access',
            });
        } else {
            res.status(200).send({
                success: false,
                message: 'incorrect code',
            });
        }
    })
}
