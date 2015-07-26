/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// User sign up
	signup : function(req, res){
	    console.log('Backend Signup');
	    
	    var Passwords = require("machinepack-passwords");
	    
	    // Encrypts the password
	    Passwords.encryptPassword({
			password: req.param('password'),
			difficulty: 10,
		}).exec({
		    error : function(err){
				return res.negotiate(err);
		    },
		    success : function(encryptedPassword){
		        require('machinepack-gravatar').exec({
		               error : function(err){
        			   return res.negotiate(err);
        		    }, success : function(gravatarUrl){
        		        // Create User
        		        User.create({
        		            name: req.param('name'),
							email: req.param('email'),
							password: encryptedPassword,
							lastLoggedIn: new Date(),
							gravatarUrl: gravatarUrl
        		        }, function userCreated(err, newUser){
        		            if(err){
        		                console.log('Error: '+err);
								return res.negotiate(err);
        		            }
        		            
        		            // Session Variable
        		            console.log('User Added');

							return res.json({
								id: newUser.id
							});
        		        });
        		    }
		        }); 
		    }
		});
	}
};

