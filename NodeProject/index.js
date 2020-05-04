const express = require('express');
const router = express.Router();
const moongose = require('mongoose');
const users = moongose.model('users')
const session = require('client-sessions');

//checkkkk

router.get('/',(req,res)=>res.render('login'));

function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/');
    } else {
      next();
    }
  };    


//functions for pages

router.get('/admin_dashboard',requireLogin,(req,res)=>res.render('admin_dashboard'))
router.get('/addcourse',requireLogin,(req,res)=>res.render('AddCourse'))
router.get('/addfaculty',requireLogin,(req,res)=>res.render('AddFaculty'))
router.get('/addprogram',requireLogin,(req,res)=>res.render('AddProgram'))
router.get('/addquestion_faculty',requireLogin,(req,res)=>res.render('AddQuestion_Faculty'))
router.get('/addquestions',requireLogin,(req,res)=>res.render('AddQuestions'))
router.get('/addstudent',requireLogin,(req,res)=>res.render('AddStudent'))
router.get('/contact',requireLogin,(req,res)=>res.render('contact'))
router.get('/faculty_getstarted',requireLogin,(req,res)=>res.render('Faculty_GetStarted'))
router.get('/generate_questionpaper',requireLogin,(req,res)=>res.render('Generate_QuestionPaper'))
router.get('/old_questionpapers',requireLogin,(req,res)=>res.render('Old_QuestionPapers'))
router.get('/removecourse',requireLogin,(req,res)=>res.render('RemoveCourse'))
router.get('/removefaculty',requireLogin,(req,res)=>res.render('RemoveFaculty'))
router.get('/removeprogram',requireLogin,(req,res)=>res.render('RemoveProgram'))
router.get('/removequestion_faculty',requireLogin,(req,res)=>res.render('RemoveQuestion_Faculty'))
router.get('/removequestion',requireLogin,(req,res)=>res.render('RemoveQuestion'))
router.get('/removestudent',requireLogin,(req,res)=>res.render('RemoveStudent'))
router.get('/review_questionpaper_faculty',requireLogin,(req,res)=>res.render('Review_QuestionPaper_Faculty'))

router.post('/',(req,res) =>{
    console.log(req.body);
    checkUser(req,res); 
});

function checkUser(req,res){
    //create obj of employee schema 
    var user = new users();
    if(req.body.uname != null){
    users.findOne({email: req.body.uname},function(err, docs) {
        console.log("Username " + JSON.stringify(docs));
        if(JSON.stringify(docs)!=null){
            //if(docs.userid == req.body.uname)
            if(docs.email=== req.body.uname && docs.password === req.body.password && docs.active === true)
            {
                console.log("Authentication Done!!!");
                // sets a cookie with the user's info
                req.session.user = docs;
                if(docs.role == "admin"){
                  res.redirect('/admin_dashboard');                 
               }   
              else if(docs.role == "faculty")
              {
                res.redirect('/faculty_getstarted');
              }
              else
              {
                console.log("Student dashboard");
              }
                
            }
        }
        else{
            console.log("UserId not found!!");
        }

      })
    }
    else{
        res.redirect('/');
    }
}
router.get('/list',(req,res) =>{
    res.json('from list');
});
module.exports = router;