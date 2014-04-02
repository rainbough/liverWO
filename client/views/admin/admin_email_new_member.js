Template.adminEmailNewMember.events({
	'click #send_email': function(e){
		e.preventDefault();

		var member_name = this.prefix + " " + this.firstname + " " + this.lastname + " " + this.suffix;

		var email_attributes = {
			email_recipient: $('#recipient').val(),
			member_name: member_name,
			routeName: this.routeName

		}

		console.log(email_attributes);
		Meteor.call('sendMemberSignUp', email_attributes, function(error, id){
			if (error) {
				throwError(error.reason);
			}
			else
				alert("email sent");

		});
	}
});