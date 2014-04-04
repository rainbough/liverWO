// this function checks to see if the user owns the member profile that is in the data context

ownsProfile = function(userId, doc){
	return doc && doc.user_id === userId;
}

// this function checks to see if the user has admin credentials
adminUser = function(){
	user = Meteor.user();
	return Roles.userIsInRole(user, 'admin');
}
