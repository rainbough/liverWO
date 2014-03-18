Template.memberProfile.helpers({
	ownProfile: function() {
		return this.userId == Meteor.userId();
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
			Router.go('membersList');
		}
	}
});