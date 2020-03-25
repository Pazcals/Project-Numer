var express = require('express');
var router = express.Router();

let Trap = require('../models/Trap');
let Bisec = require('../models/Bisec');
let OnePoint = require('../models/OnePoint')
/* GET users listing. */

/////////////////////////// Trapzoidal ////////////////////////////////

router.get('/showtrap', function(req, res, next) {
 
  Trap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addtrap',(req,res)=>{
  console.log(req.body);
  let doc = new Trap(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

///////////////////////////// Bisection ///////////////////////////////

router.get('/showBisec', function(req, res, next) {
 
  Bisec.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addBisec',(req,res)=>{
  console.log(req.body);
  let doc = new Bisec(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

////////////////////////// One-Point ////////////////////////////////////

router.get('/showOnePoint', function(req, res, next) {
 
  OnePoint.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addOnePoint',(req,res)=>{
  console.log(req.body);
  let doc = new OnePoint(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

//////////////////////////////////////////////////////////////////////

module.exports = router;
