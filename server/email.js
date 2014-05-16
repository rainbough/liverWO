Meteor.methods({
	sendContactEmail:function(emailAttributes){
		Email.send({
			from: emailAttributes.email,
			to: ["rainbough@landesbioscience.com", "asaffer@sosorgans.com"]
			subject: "LIVER Contact Email: "+ emailAttributes.senderName,
			text: emailAttributes.message
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


