Groups = new Meteor.Collection('groups');

Meteor.methods({
	newGroup: function(groupInfo){
		var groupName = groupInfo.groupName;
		var userEmail = groupInfo.user;
		var groupExists = Groups.findOne({ groupName: groupName});
		var userExists = Meteor.users.findOne({ 'emails.address': userEmail});
		var trimInput = function(val) {
        	return val.replace(/\s+/g,'');
      	}
      	console.log(userExists);

  		var trimGroupName = trimInput(groupName);

		if(!groupName)
			throw new Meteor.Error(422, "Please enter a name for the group.");
		if(!userEmail)
			throw new Meteor.Error(422, "Please enter a user to add to the group");
		if(groupExists && groupName)
			throw new Meteor.Error(302, "A group with this name already exists.",
				groupExists.groupName
				);
		if(!userExists)
			throw new Meteor.Error(404, "This user was not found, please enter a valid user email.");
		
		var group = _.extend(_.pick(groupInfo, 'user'), {
			submitted: new Date().getTime(),
			groupName: trimGroupName
		});

		var createGroupRole = function(user, groupName){
			console.log(user + " " + groupName);
			Roles.addUsersToRoles(user, groupName);
			 Meteor.users.update({ 'emails.address': userEmail}, {$set: {'roles': [groupName]}
			});
		  }

		createGroupRole(userEmail, trimGroupName);
		var groupId = Groups.insert(group);
		return groupId;
	
	}
})