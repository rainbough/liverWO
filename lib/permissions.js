ownsProfile = function(userId, doc){
	return doc && doc.userId === userId;
}

adminUser = function(){
	user = Meteor.user();
	return Roles.userIsInRole(user, 'admin');
}
