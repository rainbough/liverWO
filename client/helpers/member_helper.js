var members = {
	members: function() {
		return Members.find(); 
	}
}

Template.membersList.helpers(members);
Template.adminMembers.helpers(members);
Template.memberProfiles.helpers(members);