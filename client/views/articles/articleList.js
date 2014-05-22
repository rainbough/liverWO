/// articleList ///
Template.articleList.rendered = function(){
    Meteor.call('refreshFeed', function(err, id){
        if(err)
            throwError(err.reason);
    });
};

Template.articleList.events({
	"click #editFeed": function(e){
		e.preventDefault();

		var newUrl = $(e.target).find('#feedUrl').val();

		Meteor.call('editFeed', newUrl, function(err, id){
			if(err){
				throwError(err.reason);
			}else{
				Meteor.call('refreshFeed', function(err, id){
		        	if(err)
		           		 throwError(err.reason);
		    		});
			}
		});
	}
});