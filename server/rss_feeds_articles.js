var request = Npm.require('request')
	, fs = Npm.require('fs')
	, Fiber = Npm.require('fibers');


done = function(err, result){
	if(err){
		console.log(err);
	} else if(result){
		console.log(result);
	};
};

var cheerio = Meteor.require('cheerio');

// Adds a new feed.
function addFeed(url, done){
	request(url)
		.pipe(new Feedparser([]))
		.on('meta', function(meta){
				Fiber(function(){
					Feeds.insert({
						title: meta.title,
						url: url,
						userId: userId,
						unread: 0
					}, function(err, feedId){
						if(feedId) {
							readFeed(Feeds.findOne({_id: feedId}));
						}
					});
				}).run();
			})
			.on('error', function(error){
				console.log(error);
			});
		return "Added feed " + url;
};

function domParseFeed(article){
	$ = cheerio.load(article);
	var source = $('a').attr('href');
	var relatedHTML = $('td').next().html();
	rH = cheerio.load(relatedHTML);
	var related = rH('a').attr('href');
	var pubInfo = $('p').next().html();
	var authors = $('p').next().next().html();
	var content = $('p').next().next().next().html();
	var pmID = $('p').next().next().next().next().html();
	var pubLogo = $('img').attr('src');

	var data = {
		related: related,
		sourceLink: source,
		pubInfo: pubInfo,
		authorsGroup: authors,
		content: content,
		pmID: pmID,
		pubLogo: pubLogo
	}
	return data;
}

// Adds a new article to the feed.
function addArticle(article, feed, done){
	Fiber(function(){
		if(Articles.findOne({feedId: feed._id, guid: article.guid})) return false;
		var date = null;
		if (article.date){
			date = article.date;
		} else {
			date = article.pubdate;
		};
		var data = domParseFeed(article.description);
		Articles.insert({
			retrieved: new Date().getTime(),
			title: article.title,
			date: date,
			pubdate: article.pubdate,
			author: article.author,
			authorsGroup: data.authorsGroup,
			content: data.content,
			link: article.link,
			related: data.related,
			origlink: data.sourceLink,
			feedId: feed._id,
			userId: feed.userId,
			summary: article.summary,
			guid: article.guid,
			pubInfo: data.pubInfo,
			pubLogo: data.pubLogo,
			comments: article.comments,
			image: article.image,
			categories: article.categories
		});
		Feeds.update(feed._id, {$inc: {unread: 1}});
	}).run();
};

// Reads the feed and updates the articles.
var readFeed = function(feed){
	console.log("hello");
	if(Feeds.findOne({_id: feed._id})){
		request(feed.url)
			.pipe(new Feedparser([]))
			.on('error', function (error) {
			   	return error;
			})
			.on('readable', function() {
				var stream = this, item;
				while (item = stream.read()) {
					addArticle(item, feed, done);      	
			    }
	  		});
	  	return console.log("Feed updated");
	} else {
		return "Feed does not exist";
	};
};

// // Removes all articles.
// function removeAllArticles(){
// 	Articles.remove({}, function(){
// 		updateAllUnreadCount(done);
// 		return "All articles removed";
// 	});
// };

// // Updates the unread count of a feed.
// function updateUnreadCount(feed, done){
// 	var unreadCount = Articles.find({feedId: feed._id, read: false}).count();
// 	Feeds.update(feed._id, {$set: {unread: unreadCount}}, done);
// };

// // Updates the unread count of all feeds.
// function updateAllUnreadCount(done){
// 	Feeds.find({userId: this.userId}).forEach(updateUnreadCount(feed, done));
// };

// // Marks all articles in a feed as read.
// function markAllRead(feed){
// 	Articles.update({feedId: feed._id}, {$set: {read: true}}, {multi: true}, function(){
// 		updateUnreadCount(feed, done);
// 		return "Marked all read";
// 	});	
// };

// // Mark a single article as read.
// function markRead(articleId, done){
// 	var article = Articles.findOne({_id: articleId});
// 	if (!article.read) {
// 		Articles.update(article._id, {$set: {read: true}}, done);
// 		Feeds.update(article.feedId, {$inc: {unread: -1}}, done);
// 	};
// };

// // Mark a single article as unread.
// function markUnread(articleId, done){
// 	var article = Articles.findOne({_id: articleId});
// 	if (article.read){
// 		Articles.update(article._id, {$set: {read: false}}, done);
// 		Feeds.update(article.feedId, {$inc: {unread: 1}}, done);
// 	};
// };

// Remove a single feed, and all it's unstarred articles.
function editFeed(url){
	var feed = Feeds.findOne();
	Feeds.update(feed._id, {$set: url}, function(error) {
		if (error) {
			return error;
		}
		else
			console.log("feed url updated");
			return feed._id;
	});
	
};



Meteor.methods({
	addFeed: function(url) {
		return addFeed(url, done);
	},

	refreshFeed: function(){
		var feed = Feeds.findOne({});
		return readFeed(feed);
	},

	editFeed: function(url){
		return editFeed(url);
	}
});


