ownsProfile = function(userId, doc){
	return doc && doc.userId === userId;
}

adminUser = function(userId){
	user = Meteor.user();
	return Roles.userIsInRole(user, 'admin');
}
