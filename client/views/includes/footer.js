Template.base.events({
	"click #mailchimp-subscribe-btn": function(e){
		e.preventDefault();
		var sub_email = $("#email-address").val();
		Meteor.call("subscribeMailchimp",sub_email);
	}
});
