Meteor.methods({
	isAdmin: function(user){
		if(!Roles.userIsInRole(user, 'admin'))
			throw new Meteor.Error(403, "You are not authorized to view this page!");

		return user._id;
	}
});