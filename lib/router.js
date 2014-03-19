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
	this.route('adminMemberNew', {
		path: '/admin/member/new'
	});
	this.route('adminMemberEdit', {
		path: '/admin/members/:_id/edit'
	});
	this.route('adminMembers', {
		path: '/admin/members/'
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

var loggedIn = function(){
	if (Meteor.user()) {
		this.render('signIn');
	this.stop();
	}
}
var isAdmin = function(){
	var user = Meteor.user();
	if (Meteor.user()) {
		Meteor.call('isAdmin', user, function(error, id){
			if(error){
				throwError(error.reason);
				Router.go('home');
			} 
			else
			this.stop();
		});

	} else {
		this.render('accessDenied');
	}
}

Router.before(isAdmin, {only: ['adminHome', 'adminMemberEdit', 'adminMemberNew', 'adminMembers']});
Router.before(loggedIn, {only: 'signUp'});
Router.before(requireLogin, {only: ['memberEdit', 'memberNew', 'adminHome']});
Router.before(function() { clearErrors() });