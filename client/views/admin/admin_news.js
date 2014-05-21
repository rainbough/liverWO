// Template.adminNews.rendered = function(){
// 	$('#content').redactor();
// };


// Template.adminNewsEdit.events({
// 	"click #edit": function(e){
// 		e.preventDefault();
// 		$('#redactor_content').redactor({
//         	focus: true
//     	});
// 	},
// 	"click #save": function(e){

// 		alert("You Clicked SAVE");
// 	}

// });
// function exampleClickToSave()
// {
//     // save content if you need
//     var html = $('#redactor_content').redactor('get');

//     // destroy editor
//     $('#redactor_content').redactor('destroy');
// }


Template.adminNewsEdit.events({
	'click #wht_news_edit': function(){
		$('#edit_news').editable({
			imageUpload: true,
			textNearImage: true,
			editorClass: "news_content"
		});
	},
	'submit form': function(e){
		e.preventDefault();
		
		if($('div').hasClass('news_content')){
			content = $(e.target).find('.news_content').html();
		}else{
			content = this.content;
		}
		var newsId = this._id;
		var news = {
			routeName: this.routeName,
			title: $(e.target).find('[name=title]').val(),
			content: content,
			imageUrl: $(e.target).find('[name=imageUrl]').val()
		}

		console.log(news);
		Meteor.call('editNewsItem', news, newsId, function(error, route){
			if(error){
				throwError(error.reason);
			}else{
				alert("This news item has been updated!");
				console.log(route);
				Router.go('newsPage', {routeName: route});
			}
		});
	}

});

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

Template.newsItem.events({
	'click #edit': function(e){
		alert("You clicked Edit!");
		Router.go('adminNewsEdit', {routeName: this.routeName});
	}
});

Template.newsItem.events({
	'click #delete': function(e){
		alert("You clicked Delete!");
	}
});