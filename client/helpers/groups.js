var groups = {
	groups: function() {
		return Groups.find(); 
	}
}

Template.groupList.helpers(groups);
