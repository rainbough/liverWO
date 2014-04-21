var email = {
	email: function() {
	var user = Meteor.user();
	if (user && user.emails)
		return user.emails[0].address;
	}
};

Template.signIn.helpers(email);
Template.header.helpers(email);
Template.signUp.helpers(email);
// Template.memberNew.helpers(email);