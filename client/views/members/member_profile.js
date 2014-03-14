Template.memberProfile.helpers({
	ownProfile: function() {
		return this.userId == Meteor.userId();
	}
});