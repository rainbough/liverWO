Template.footer.events({
	"click #mailchimp-subscribe-btn": function(e){
		e.preventDefault();
		var sub_email = $("#email-address").val();
		Meteor.call("subscribeMailchimp",sub_email,function(err,res){
			if(err){alert("Error!\n"+err.reason);}
			else {alert("Success!\nYou will receive a confirmation email shortly.");}
		});
	}
});
