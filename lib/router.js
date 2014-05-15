if(Meteor.isClient){
	Meteor.startup(function() {
	 	if($('html').hasClass('no-history')){
	   		$('body').html("<h1>This is an unsupported browser</h1>");
	   	}
	});
}

Router.configure({ 
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return [Meteor.subscribe('members'), Meteor.subscribe('groups'), Meteor.subscribe('news')]; 
	}
});

ArticlesListController = RouteController.extend({
	template: 'articleList',
	increment: 20,
	limit: function() {
		return parseInt(this.params.articlesLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {retrieved: -1}, limit: this.limit()};
	},
	waitOn: function() {
		return Meteor.subscribe('articles', this.findOptions());
	},
	articles: function() {
		return Articles.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.articles().count() === this.limit();
		var nextPath = this.route.path({articlesLimit: this.limit() + this.increment});

		return {
			articles: this.articles(),
			nextPath: hasMore ? nextPath : null
		};
	}
});

Router.map(function() { 
	this.route('home', {path: '/'});
	this.route('membersList', {
		path: '/members'
	});
	this.route('memberPage', {
	path: '/members/:routeName',
	data: function() { 
		return Members.findOne({routeName: this.params.routeName}); 
	}
	});

	this.route('memberEdit', {
		path: '/members/:routeName/edit',
		data: function() { 
			return Members.findOne({routeName: this.params.routeName}); 
		}
	});
	this.route('memberNew', {
		path: '/member/new'
	});
	this.route('about');
	this.route('articleList', {
		path: '/articles/:articlesLimit?',
		controller: ArticlesListController
	});
	this.route('usersList', {
		path: '/users',
	});
	this.route("signIn", {
		path: '/signin'
	});

	this.route("summit2014", {
		path: '/summit2014'
	});
	this.route("supporters", {
		path: '/supporters'
	});
	this.route("participants", {
		path: '/ourmembers'
	});

	this.route("news");
	this.route("newsPage", {
		path: '/news/:routeName',
		data: function(){
			return News.findOne({routeName: this.params.routeName});
		}
	});

	// Admin routes
	this.route('adminHome', {
		path: '/admin'
	});
	this.route('adminMembers', {
		path: '/admin/members/'
	});
	this.route('adminMemberNew',{
		path: '/admin/member/new'
	});
	this.route('adminNews');
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
		path: '/groups/:groupName',
		data: function() { 
			return Groups.findOne({groupName: this.params.groupName});
		}
	});
	this.route('newGroup', {
		path: '/admin/newgroup'
	});


});

var requireLogin = function() { 
	if (! Meteor.user()) {
		if(Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDenied');

		pause();
	}
};

// this function checks to see if users are logged in.
var loggedIn = function(){
	if (Meteor.user()) {
		this.render('signIn');
	pause();
	}
};

// this function checks to see if a user has admin privileges 
var isAdmin = function(){
	var user = Meteor.user();
	if (Meteor.user()) {
		Meteor.call('isAdmin', user, function(error, id){
			if(error){
				throwError(error.reason);
				Router.go('home');
			} 
			else
			pause();
		});

	} else {
		this.render('accessDenied');
	}
};

Router.onBeforeAction(isAdmin, {only: ['adminHome', 'adminMemberEdit', 'adminMemberNew', 'adminMembers']});
Router.onBeforeAction(loggedIn, {only: 'signUp'});
Router.onBeforeAction(requireLogin, {only: ['memberEdit', 'memberNew', 'adminHome']});
Router.onBeforeAction(function() { 
	clearErrors();
});