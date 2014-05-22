Template.labPage.helpers({
	permittedRoles: function(){
		var labName = this.labName;
		var user = Meteor.user();
		var roles = ['admin', labName];
		return Roles.userIsInRole(user, roles);
	}
});