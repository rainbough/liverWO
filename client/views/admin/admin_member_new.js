Template.adminMemberNew.events({
	'submit form': function(e) {
		e.preventDefault();
		// Each one of these attributes should have an associated form input on admin_member_new.html
		// Try to keep them in the same order they appear on html form

		var member = {
			routeName: $(e.target).find('[name=routeName]').val(),
			imageUrl: $(e.target).find('[name=image_url]').val(),
			email2: $(e.target).find('[name=email2]').val(),
			title: $(e.target).find('[name=title]').val(),
			prefix: $(e.target).find('[name=prefix]').val(),
			firstname: $(e.target).find('[name=firstname]').val(),
			lastname: $(e.target).find('[name=lastname]').val(),
			suffix: $(e.target).find('[name=suffix]').val(),
			institution1: $(e.target).find('[name=institution1]').val(),
			institution2: $(e.target).find('[name=institution2]').val(),
			institution3: $(e.target).find('[name=institution3]').val(),
			email: $(e.target).find('[name=email]').val(),
			labPhone: $(e.target).find('[name=phone]').val(),
			labName: $(e.target).find('[name=labName]').val(),
			labAddress1: $(e.target).find('[name=address1]').val(),
			labAddress2: $(e.target).find('[name=address2]').val(),
			city: $(e.target).find('[name=city]').val(),
			state: $(e.target).find('[name=state]').val(),
			zip: $(e.target).find('[name=zip]').val(),
			country: $(e.target).find('[name=country]').val(),
			RIkeywords: $(e.target).find('[name=RIkeywords]').val(),
			newitem: $(e.target).find('[name=newitem]').val(),
			newitem2: $(e.target).find('[name=newitem2]').val(),
			labAssociates: getArray('associates')
		}
	
			
// This calls a method in collections/members.js
		Meteor.call('member', member, function(error, id) { 
			if (error) {
				throwError(error.reason);
				
				if (error.error === 302)
					Router.go('memberPage', {_id: error.details})
			} else {
				var newMember = Members.findOne({_id: id});
				var newMemberRoute = newMember.routeName;
				Router.go('adminEmailNewMember', {routeName: newMemberRoute});
			}
		});
	}
});

// This returns an array of values for inputs with an associated class
var getArray = function(class_name){
	var input_array = [];
	$('.'+ class_name).each(function(){
		input_array.push($(this).val());
	});
	return input_array

}
