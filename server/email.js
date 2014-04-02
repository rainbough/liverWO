Meteor.methods({
	sendContactEmail:function(email_body,sender_email,sender_name){
		Email.send({
			from: sender_email,
			to: "contact@WholeOrgan.org",
			subject: "Liver.WholeOrgan.org Contact Email: "+sender_name,
			text: email_body
		});
	}
});

Meteor.methods({
	sendMemberSignUp: function(email_attributes){
		var email_link = "http://liver.herokuapp.com/member/" + email_attributes.routeName + "/signup";
		Email.send({
			from: 'contact@WholeOrgan.org',
			to: email_attributes.email_recipient,
			subject: "Testing... New Member Request",
			html: "<p>Hi " + email_attributes.member_name + " Please follow " + "<a href='"+ email_link +"'>this link</a> to complete sign up with WholeOrgan.org.</p>"
		});
	}
});