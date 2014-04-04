
Template.membersList.helpers({
	members: function() {
		return Members.find(); 
	}
});
Template.adminMembers.helpers({
	members: function() {
		return Members.find(); 
	}
});
