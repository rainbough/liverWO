Template.memberProfile.helpers({
	ownsProfile: function() {
		return this.user_id == Meteor.userId();
	}
});

Template.memberProfile.events({
	'click #edit': function(){
		var currentMemberId = this._id;
		Router.go('memberEdit', {_id: currentMemberId });
		
	},

	'click #delete': function(e) {
		e.preventDefault();
		if(confirm("Delete this member?")) {
			var currentMemberId = this._id;
			Members.remove(currentMemberId);
			Router.go('membersProfile');
		}
	}
});