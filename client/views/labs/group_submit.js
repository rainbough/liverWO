Template.newLab.events({
	'submit form': function(e){
		e.preventDefault();
		//use jquery to pull data from form
		var group = {
			groupName: $(e.target).find("[name=groupName]").val(),
			user: $(e.target).find("[name=user]").val()
		}

		Meteor.call('newGroup', group, function(error, id){
			if (error) {
					throwError(error.reason);
					// redirect if group already exists
					if (error.error === 302)
						Router.go('groupPage', {groupName: error.details})
				} else {
					var newGroup = Groups.findOne({_id: id});
					var newGroupName = newGroup.groupName;
					Router.go('groupPage', {groupName: newGroupName});
				}

		});
	}
});