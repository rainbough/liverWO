Meteor.users.allow({
  update: adminUser,
  remove: adminUser
})

// This method handles field validation for the user account creation.

Meteor.methods({
	user: function(userAttributes) {
	    var email = userAttributes.email;
	    var password = userAttributes.password;
	    var password2 = userAttributes.password2;
      var memberId = userAttributes.memberId;

        // removes whitespace 
	    var trimInput = function(val) {
          return val.replace(/\s+/g,'');
        }

        email = trimInput(email);
		var passwordsMatch = function(val1, val2) {
        	return val1 === val2 ? true : false; 
      	}

      	var isValidPassword = function(val) {
        	return val.length >= 6 ? true : false; 
      	}
        var memberUpdate = function(memberId, userId) {
            Members.update({_id: memberId}, {$set: {user_id: userId}});
        }
      	var goodPassword = isValidPassword(password);
      	var correctPassword = passwordsMatch(password, password2);

		if(!correctPassword)
            throw new Meteor.Error(422, "Password fields do not match.");
     
        if (!goodPassword)
            throw new Meteor.Error(422, "Password needs to be at least 6 characters long.");

    	if (goodPassword && correctPassword) {
	       var userId = Accounts.createUser({email: email, password: password, username: memberId});
           memberUpdate(memberId, userId);
           return userId;
        }
        

	}
});
