Router.configure({ 
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('members'); }
});
Router.map(function() { 
	this.route('home', {path: '/'});
	this.route('membersList', {
		path: '/members'
	});
	this.route('memberPage', {
	path: '/members/:_id',
	data: function() { return Members.findOne(this.params._id); }
	});

	this.route('memberNew', {
		path: '/member/new'
	});
});