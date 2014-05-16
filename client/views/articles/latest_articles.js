Template.latestPapers.helpers({
	articles: function() {
		return Articles.find({}, {limit: 3, sort:{retrieved: -1}});
	}
});
	