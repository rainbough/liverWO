// Allow admin to edit and remove news posts from admin page.

News.allow({
	update: adminUser,
	remove: adminUser
});

Meteor.methods({
	news: function(newsAttributes) {
		
		var trimInput = function(val) {
        	return val.replace(/\s+/g,'');
      	}
      	var trimRouteName = trimInput(newsAttributes.title);

      	var uniqueRouteName = News.findOne({routeName: trimRouteName});

		if(!newsAttributes.title)
			throw new Meteor.Error(422, "Please Enter a title.")

		if (!newsAttributes.content)
			throw new Meteor.Error(422, 'Please enter some content for this news item.');

		if(uniqueRouteName)
			throw new Meteor.Error(301, 'The route name ' + trimRouteName + " already exists.");
		
		var newsItem = _.extend(_.pick(newsAttributes, 'title', 'content', 'imageUrl'), {
			submitted: new Date().getTime(),
			routeName: trimRouteName
		});

		var newsId = News.insert(newsItem);

		return newsId;
	}
});