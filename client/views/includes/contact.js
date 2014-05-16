Template.contact.events({
	"click button#contact-submit": function(e) {
		e.preventDefault();

		var contactEmail = {
			senderName: $(e.target).find('[name=senderName]').val(),
			email: $(e.target).find('[name=email]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		Meteor.call("sendContactEmail", contactEmail ,function(error, result){

			if(error){
				throwError(error.reason);
			}
			else
				// alertsuccess("Your contact email has been sent!");
				Router.go('home');
		
			
		});
	}
});