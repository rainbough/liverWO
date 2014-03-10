Router.configure({ 
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('members'); }
});
Router.map(function() { 
	this.route('membersList', {path: '/'});
	this.route('memberPage', {
	path: '/members/:_id',
	data: function() { return Members.findOne(this.params._id); }
	});

	this.route('memberSubmit', {
		path: '/submit'
	});
});