Template.labList.helpers({
	labs: function() {
		return Labs.find(); 
	}
});

Template.newLab.helpers({
	users: function(){
		return Meteor.users.find();
	}
});