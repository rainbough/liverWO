Template.groupPage.helpers({
	permittedRoles: function(){
		var groupName = this.groupName;
		var user = Meteor.user();
		var roles = ['admin', groupName];
		return Roles.userIsInRole(user, roles);
	}
});