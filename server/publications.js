Meteor.publish('members', function() { 
	return Members.find();
});
Meteor.publish('labs', function() {
	return Labs.find();
});

// Publish the user's feeds.
Meteor.publish("feeds", function(){
	return Feeds.find();
});

// Publish the user's articles for this feed.
Meteor.publish("articles", function(options){
	return Articles.find({}, options);
});

Meteor.publish("news", function(){
	return News.find();
});

// server/publish.js

// Give authorized users access to sensitive data by lab
Meteor.publish('users', function () {
	// var user = Meteor.user();
 //  	if (Roles.userIsInRole(user._id, 'admin')) {
    return Meteor.users.find();
    
  // } else {

  //   // user not authorized. do not publish secrets
  //   this.stop();
  //   return;

  // }
});