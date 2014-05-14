Template.adminNews.rendered = function(){
	$('#content').redactor();
};

Template.adminNews.events({
	'submit form': function(e){
		e.preventDefault();

		var news = {
			title: $(e.target).find('[name=title]').val(),
			content: $(e.target).find('#content').val(),
			imageUrl: $(e.target).find('[name=imageUrl]').val()
		}

		console.log(news.content);

		Meteor.call('news', news, function(error, id) { 
			if (error) {
				throwError(error.reason);
			} else {
				var newNews = News.findOne({_id: id});
				var newNewsRoute = newNews.routeName;
				Router.go('newsPage', {routeName: newNewsRoute});
			}
		});
	}
});