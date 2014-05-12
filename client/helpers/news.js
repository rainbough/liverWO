Template.news.helpers({
	news: function() {
		return News.find(); 
	}
});

Template.adminNews.helpers({
	news: function() {
		return News.find();
	}
});