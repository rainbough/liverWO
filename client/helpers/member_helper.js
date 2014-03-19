var members = {
	members: function() {
		return Members.find(); 
	}
}

Template.membersList.helpers(members);
Template.adminMemberList.helpers(members);