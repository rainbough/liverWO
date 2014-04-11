// this function checks to see if the user owns the member profile that is in the data context

ownsProfile = function(userId, doc){
	user = Meteor.user();
	return doc && doc.user_id === user._id;
	console.log(userId);
	console.log("doc.user_id: "+ doc.user_id);
}

// this function checks to see if the user has admin credentials
adminUser = function(){
	user = Meteor.user();
	return Roles.userIsInRole(user, 'admin');
}

