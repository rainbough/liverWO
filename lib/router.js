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

	this.route('memberEdit', {
		path: 'members/:_id/edit',
		data: function() { return Members.findOne(this.params._id); }
	});

	this.route('memberNew', {
		path: '/member/new'
	});

	this.route('usersList', {
		path: '/users',
	});
	this.route("signIn", {
		path: '/signin'
	});
	this.route('signUp', {
		path: '/signUp'
	});
	this.route('adminHome', {
		path: '/admin'
	});
});

var requireLogin = function() { 
	if (! Meteor.user()) {
		if(Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDenied');

		this.stop(); 
	}
}

Router.before(requireLogin, {only: ['memberEdit', 'memberNew', 'adminHome']});
Router.before(function() { clearErrors() });