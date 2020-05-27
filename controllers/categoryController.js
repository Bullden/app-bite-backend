module.exports = function (app, mongoose) {
    var Category = require('../models/categoryModel')
    var Restaurant = require('../models/restaurantModel')
    var bodyParser = require('body-parser')
    var urlencodedParser = bodyParser.urlencoded({
        extended: true
    })
    app.use(bodyParser.json())

    // app.post('/tasks', urlencodedParser, async function (req, res) {
    //     console.log('ADDDDDDD',req.body);
    //
    //     const {nameTask,date,list,countList,token} = req.body;
    //     try {
    //
    //         const tasks = new Task({
    //             nameTask,
    //             date,
    //             list,
    //             countList,
    //             token
    //         })
    //         const newTask = await tasks.save();
    //
    //         res.status(200).send({
    //             success:true,
    //             message:'Successfully added'
    //         });
    //     } catch(err) {
    //         res.status(500).send({
    //             success:false,
    //             message:err.toString()
    //         })
    //     }
    // })

    app.get('/categories', async function (req, res) {
        try {
           const category = await Category.find();
            console.log(category)
           // async function re(id, name) {
           //      const restaurant = await Restaurant.findById({_id: id});
           //      console.log(name);
           //      console.log(restaurant);
           //
           //      //     console.log(restaurant[prop])
           //      // }
           //  }
           //  category.map((i) => {
           //      let name = i.nameCategory
           //      i.category.map((id) => {
           //          re(id , name)
           //      })
           //
           //  });

            // const restaurant = await Restaurant.findById({_id: '5e68f8961c9d4400008ddac0'});
            // console.log(restaurant)


            if (!category) {
              return res.status(404).send({
                success: false,
                message: 'tasks not found!!!!'
              });
            }
            const token = category

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

    app.put('/tasks/:id', async function (req, res){
      console.log('1111',req.body);
      console.log(req.params.id);
      console.log(req.params._id);

      const {list} = req.body;
      const name = list.list
    try {
      const listUpdated = await Task.findByIdAndUpdate( {_id:req.body._id}
         ,
        {
          $set: {
            list,
          }
        },
        { new: true }
        );
       console.log('TaskUPDATE',listUpdated);

      if (!listUpdated) {
        return res.status(404).send({
          success: false,
          message: 'List not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: listUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
    })
}
