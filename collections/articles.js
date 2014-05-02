


Articles.allow({
	update: function(userId, doc, fieldNames, modifier ){
		return doc.userId == userId;
	}
});

Feeds.allow({
	update: function(userId, doc, fieldNames, modifier){
		return doc.userId == userId;
	},
	remove: function(userId, doc){
		return doc.userId == userId;
	}
});