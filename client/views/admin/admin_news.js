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
	}
});