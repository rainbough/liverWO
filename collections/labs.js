// This is for creating a new lab it is called on the lab_submit.js page
// It checks for the presence of a user email and a lab name. 
// It also checks to see if the lab name already exists for another lab.
// It also verifies that the user email is a currently registered user. 
Meteor.methods({
	newLab: function(labInfo){
		var labName = labInfo.labName;
		var userEmail = labInfo.user;
		var labExists = Labs.findOne({ labName: labName});
		var userExists = Meteor.users.findOne({ 'emails.address': userEmail});
		var trimInput = function(val) {
        	return val.replace(/\s+/g,'');
      	}
      	console.log(userExists);
      	
      	// this removes whitespace from the lab name for use as a url/route
  		var trimLabName = trimInput(labName);

		if(!labName)
			throw new Meteor.Error(422, "Please enter a name for the lab.");
		if(!userEmail)
			throw new Meteor.Error(422, "Please enter a user to add to the lab.");
		if(labExists && labName)
			throw new Meteor.Error(302, "A lab with this name already exists.",
				labExists.labName
				);
		if(!userExists)
			throw new Meteor.Error(404, "This user was not found, please enter a valid user email.");
		
		var lab = _.extend(_.pick(labInfo, 'user'), {
			submitted: new Date().getTime(),
			labName: trimLabName
		});

		var createLabRole = function(user, labName){
			console.log(user + " " + labName);
			Roles.addUsersToRoles(user, labName);
			 	Meteor.users.update({ 'emails.address': userEmail}, {$set: {'roles': [labName]}
			});
		  }

		createLabRole(userEmail, trimLabName);
		var labId = Labs.insert(lab);
		return labId;
	
	}
})