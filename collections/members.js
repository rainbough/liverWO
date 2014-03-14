Members = new Meteor.Collection('members');

Meteor.methods({
	member: function(memberAttributes) {
		var user = Meteor.user(),
		memberWithSameEmail = Members.findOne({ email: memberAttributes.email });

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to Create a New Member Profile");

		// ensure members have names
		if (!memberAttributes.lastname)
			throw new Meteor.Error(422, 'Please fill in the last name field.');

		if (!memberAttributes.firstname)
			throw new Meteor.Error(422, 'Please fill in the first name field.');

		// check that there are no current members with same email
		if (memberAttributes.email && memberWithSameEmail) {
			throw new Meteor.Error(302, 
				'A profile is already associated with this email.',
				memberWithSameEmail._id);
		}
		var member = _.extend(_.pick(memberAttributes, 'email', 'firstname', 'lastname'), {
			userId: user._id,
			author: user.email,
			submitted: new Date().getTime()
		});

		var memberId = Members.insert(member);

		return memberId;
	}
});