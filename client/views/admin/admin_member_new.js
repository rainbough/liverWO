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
			institutions: getArray('institutions'),
			email: $(e.target).find('[name=email]').val(),
			labPhone: $(e.target).find('[name=phone]').val(),
			labName: $(e.target).find('[name=labName]').val(),
			labAddress1: $(e.target).find('[name=address1]').val(),
			labAddress2: $(e.target).find('[name=address2]').val(),
			city: $(e.target).find('[name=city]').val(),
			state: $(e.target).find('[name=state]').val(),
			zip: $(e.target).find('[name=zip]').val(),
			country: $(e.target).find('[name=country]').val(),
			riKeywords: $(e.target).find('[name=riKeywords]').val(),
			associations: getArray('associations'),
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
	},
	// These add input fields for additional associations, associatiates, institutions
	'click #add_institutions': function(e){
		e.preventDefault();
		$('.institution_group').append('<input name="institutions" class="institutions" type="text" value="" placeholder="organization name" />');
	},
	'click #add_associates': function(e){
		e.preventDefault();
		$('.associates_group').append('<input class="associates" name="labAssociates" type="text" value="" placeholder="associate name" />');

	},
	'click #add_associations': function(e){
		e.preventDefault();
		$('.associations_group').append('<input class="associations" name="associations" type="text" value="" placeholder="association name" />');
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
