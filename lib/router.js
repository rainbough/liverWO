// This code loads html into ie8 browsers.

if(Meteor.isClient){
	Meteor.startup(function() {
	 	if($('html').hasClass('no-history')){
	   		$('body').html("<!--[if lte IE 8 ]><div class='container'><br><img src='/images/liverlogo.png' alt='The Whole Liver Research Consortium' class='hidden-sm'><h3>Sorry, this is an unsupported browser.</h3><p>This website requires IE 9 or higher, or any other <a href='http://browsehappy.com/'>modern web browser</a>.</p></div><![endif]-->");
	   	}
	});
}

Router.configure({ 
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return [Meteor.subscribe('members'), Meteor.subscribe('users'), Meteor.subscribe('articles'), Meteor.subscribe('labs'), Meteor.subscribe('news')]; 
	}
});


// Most of this controls the allows for the "load more"/numbered routes functionality on the articles page.
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
	this.route('home', {
		path: '/'
	});
	this.route('latestPapers');
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
	this.route("contact", {
		path: '/contactus'
	});

	this.route("news");
	this.route("newsPage", {
		path: '/news/:routeName',
		data: function(){
			return News.findOne({routeName: this.params.routeName});
		}
	});
	this.route('accessDenied');
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
	this.route('adminNewsEdit', {
		path: '/admin/news/:routeName',
		data: function(){
			return News.findOne({routeName: this.params.routeName});
		}
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
	this.route('labList', {
		path: '/labs'
	});
	this.route('labPage', {
		path: '/labs/:labName',
		data: function() { 
			return Labs.findOne({labName: this.params.labName});
		}
	});
	this.route('newLab', {
		path: '/admin/newlab'
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
	this.stop;
	}
};

// this function checks to see if a user has admin privileges 
var isAdmin = function(){
	var user = Meteor.user();
	if(!Roles.userIsInRole(user, 'admin')){
		Router.go('home');
	} else {
		this.stop;
	}
};

Router.onBeforeAction(isAdmin, {only: ['adminHome', 'adminMemberEdit', 'adminMemberNew', 'adminMembers']});
Router.onBeforeAction(loggedIn, {only: 'signUp'});
Router.onBeforeAction(requireLogin, {only: ['memberEdit', 'memberNew', 'adminHome']});
Router.onBeforeAction(function() { 
	clearErrors();
});