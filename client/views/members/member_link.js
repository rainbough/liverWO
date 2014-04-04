Template.memberLink.helpers({ 
	domain: function() {
		var a = document.createElement('a'); 
		a.href = this.url;
		return a.hostname;
	}
});

Template.memberLink.events({
	'click #edit': function(){
		var currentMemberRoute = this.routeName;
		Router.go('memberEdit', {routeName: currentMemberRoute });
		
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