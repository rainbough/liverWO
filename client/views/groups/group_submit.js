Template.newGroup.events({
	'submit form': function(e){
		e.preventDefault();

		var group = {
			groupName: $(e.target).find("[name=groupName]").val(),
			groupAdminEmail: $(e.target).find("[name=groupAdminEmail]").val()
		}
	}
});