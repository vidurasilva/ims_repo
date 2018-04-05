// app/routes.js
	
	var dbconfig = require('../config/database');
	var mysql = require('mysql');
	var connection = mysql.createConnection(dbconfig.connection);
	var cookieParser = require('cookie-parser');
	const fileUpload = require('express-fileupload');
	var math = require('mathjs');
		
	connection.query('USE ' + dbconfig.database);


module.exports = function(app, passport) {

	// =====================================
	// Payment Vaucher SECTION =========================
	// =====================================

	app.get('/paymentVou', function(req, res) {


					connection.query("SELECT * FROM employee WHERE login_idlogin = ? ",[req.user.idlogin], function(err1, rows) {
                    if (err1)
                         console.log(err1);
                     		if(req.user.level == "admin"){
                     				var searchquery= "SELECT * FROM posts ORDER BY idposts DESC";
                     			}else{
                     				var searchquery= "SELECT * FROM posts WHERE posts.department_iddepartment = ? ORDER BY idposts DESC";
                     			}
                     		 connection.query(searchquery,[rows[0].department_iddepartment],function(err2,post){
			        		if(err2)
			        			console.log(err2);

			        			var query = connection.query('SELECT * FROM employee',function(err3,rowlist){
				        		if(err3)
				        			console.log(err3);

				        			var query = connection.query('SELECT * FROM announcements ORDER BY idannouncements DESC',function(err4,anns){
				        			if(err4)
				        				console.log(err4);

				        			var query = connection.query('SELECT * FROM department',function(err5,deplist){
				        			if(err5)
				        				console.log(err5);

				        			if(req.user.status=="B"){
										res.render('WorkFlow.ejs', {
										employeelist : rowlist,
										user : rows[0],	//  pass to template
										data : post,
										ann : anns,
										message: "",
										deps: deplist,
										level: req.user.level
										});

				        			}else{

				        				res.render('login.ejs', { message:"Not approved your account yet! Please contact your admin. " });

				        			}

				        			});
				        						
			        				});
			        			});
			        		});
                   
        			});
			});
}


// route middleware to make sure
function isLoggedIn(req, res, next) {


		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()){
			return next();
		}

		// if they aren't redirect them to the home page
		res.redirect('/');
}
