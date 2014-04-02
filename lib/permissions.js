ownsProfile = function(userId, doc){
	return doc && doc.user_id === userId;
}

adminUser = function(){
	user = Meteor.user();
	return Roles.userIsInRole(user, 'admin');
}
