Meteor.publish('members', function() { 
	return Members.find();
});
Meteor.publish('groups', function() {
	return Groups.find();
});

// Publish the user's feeds.
Meteor.publish("feeds", function(){
	return Feeds.find();
});

// Publish the user's articles for this feed.
Meteor.publish("articles", function(feedId){
	return Articles.find();
});

// server/publish.js

// Give authorized users access to sensitive data by group
// Meteor.publish('secrets', function (group) {
//   if (Roles.userIsInRole(this.userId, ['view-secrets','admin'], group)) {

//     return Meteor.secrets.find({group: group});

//   } else {

//     // user not authorized. do not publish secrets
//     this.stop();
//     return;

//   }
// });