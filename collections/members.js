

// see ownsProfile and adminUser functions in lib/permissions.js
// This allows client side editing and deleting of member profiles
Members.allow({
	update: ownsProfile,
	remove: ownsProfile
});

Members.allow({
	update: adminUser,
	remove: adminUser
})

// this restricts client side editing of fields not on this list.
// It uses _.without to return an array of any updates to fields not listed.
// Then it checks to see if that array is > 0.
Members.deny({
	update: function(userId, member, fieldNames) {
		//may only edit the following fields:
		return (_.without(fieldNames, 'user_id', 'email2','riKeywords','routeName', 'firstname', 'lastname', 'suffix', 'prefix', 'institution1', 'institution2', 'institution3', 'labName', 'labAddress1', 'email', 'title', 'labAddress2', 'city', 'state', 'zip', 'labPhone', 'country', 'imageUrl', 'labAssociates').length > 0);
	}
});

Meteor.methods({
	member: function(memberAttributes) {
		var user = Meteor.user(),
		memberWithSameEmail = Members.findOne({ email: memberAttributes.email });

		var trimInput = function(val) {
        	return val.replace(/\s+/g,'');
      	}
      	var trimRouteName = trimInput(memberAttributes.routeName);

      	var uniqueRouteName = Members.findOne({routeName: trimRouteName});
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to Create a New Member Profile");
		if(!memberAttributes.routeName)
			throw new Meteor.Error(422, "Please Enter a route name.")
		// ensure members have names
		if (!memberAttributes.firstname)
			throw new Meteor.Error(422, 'Please fill in the first name field.');

		if (!memberAttributes.lastname)
			throw new Meteor.Error(422, 'Please fill in the last name field.');

		if(uniqueRouteName)
			throw new Meteor.Error(301, 'The route name ' + memberAttributes.routeName + " already exists.")
		
		// check that there are no current members with same email
		if (memberAttributes.email && memberWithSameEmail) {
			throw new Meteor.Error(302, 
				'A profile is already associated with this email.',
				memberWithSameEmail._id);
		}
		var member = _.extend(_.pick(memberAttributes, 'email2','user_id', 'email', 'firstname', 'lastname', 'suffix', 'prefix', 'institutions', 'associations', 'labName', 
				'labAddress1', 'title', 'labAddress2', 'city', 'state', 'zip', 'labPhone', 'country', 'imageUrl','riKeywords', 'labAssociates' ), {
			submitted: new Date().getTime(),
			routeName: trimRouteName
		});

		var memberId = Members.insert(member);

		return memberId;
	},

	memberExists: function(user_id) {
		var user = Meteor.user(),
		memberWithSameId = Members.findOne({user_id: user_id});
		if(memberWithSameId && user_id){
			return memberWithSameId._id;
		} else {
			throw new Meteor.Error(404, 'No Profile exists for this user');
		}	
	},

	memberUpdate: function(memberProperties, currentMemberId, currentMemberRoute) {
		var user = Meteor.user();
		var ownsProfile = function(userId, doc){
			return doc && doc.user_id === userId;
		}
		var memberObj = Members.findOne({_id: currentMemberId});
		var email2 = memberProperties.email2;
		var correctUser = ownsProfile(user._id, memberObj);

		var admin = Roles.userIsInRole(user, 'admin');

		if(!correctUser && !admin)
			throw new Meteor.Error(403, "You are not authorized to edit this profile.");
		if(correctUser || admin){
			Members.update(currentMemberId, {$set: memberProperties}, function(error) {
				if (error) {
					return error;
				}
				else
					return currentMemberRoute;
			});
		}

	}
});
