var express = require('express');
var router = express.Router();

let Bisec = require('../models/Bisec');
let OnePoint = require('../models/OnePoint')
let Integration = require('../models/Integration')
let IntegrationN = require('../models/IntegrationN')
let Diff = require('../models/Diff')
/* GET users listing. */

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

////////////////////////// Integration ////////////////////////////////////

router.get('/showIntegrat', function(req, res, next) {
 
  Integration.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addIntegrat',(req,res)=>{
  console.log(req.body);
  let doc = new Integration(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

////////////////////////// Integration N ////////////////////////////////////

router.get('/showIntegratN', function(req, res, next) {
 
  IntegrationN.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addIntegratN',(req,res)=>{
  console.log(req.body);
  let doc = new IntegrationN(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

////////////////////////// Differentiation ////////////////////////////////////

router.get('/showDiff', function(req, res, next) {
 
  Diff.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addDiff',(req,res)=>{
  console.log(req.body);
  let doc = new Diff(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})



module.exports = router;
