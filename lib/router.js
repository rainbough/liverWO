Router.configure({ 
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return [Meteor.subscribe('members'), Meteor.subscribe('groups')]; 
	}
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
	this.route('adminMembers', {
		path: '/admin/members/'
	});
	// Admin routes
	this.route('adminMemberNew',{
		path: '/admin/member/new'
	});

	this.route( 'memberSignUp', {
		path: '/member/:routeName/signup',
		data: function(){
			return Members.findOne({routeName: this.params.routeName});
		}
	});

	this.route('adminEmailNewMember', {
		path: '/member/:routeName/email',
		data: function(){
			return Members.findOne({routeName: this.params.routeName});
		}
	});
	// end admin routes 
	this.route('memberProfiles', {
		path: '/member/profiles'
	});
	this.route('groupList', {
		path: '/groups'
	});
	this.route('groupPage', {
		path: '/:groupName',
		data: function() { 
			return Groups.findOne({groupName: this.params.groupName});
		}
	});
	this.route('newGroup', {
		path: '/admin/newgroup'
	})
	// may need to take this out later
	this.route( 'profileName', {
		path: '/member/:profileName',
		data: function() { return Members.findOne(this.params.profileName); }
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