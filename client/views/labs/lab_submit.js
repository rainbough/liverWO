Template.newLab.events({
	'submit form': function(e){
		e.preventDefault();
		//use jquery to pull data from form
		var lab = {
			labName: $(e.target).find("[name=labName]").val(),
			user: $(e.target).find("[name=user]").val(),
			user: getArray('users')
		}

		Meteor.call('newLab', lab, function(error, id){
			if (error) {
				throwError(error.reason);
				// redirect if lab already exists
				if (error.error === 302)
					Router.go('labPage', {labName: error.details})
				} else {
					var newLab = Labs.findOne({_id: id});
					var newLabName = newLab.labName;
					Router.go('labPage', {labName: newLabName});
				}

		});
	},
	'click #getUsers': function(e){
		e.preventDefault();


		 var allUsers = Meteor.users.find();
		 console.log(allUsers);
		// Meteor.call('returnUsers', function(error, result){
		// 	if(error) {
		// 		throwError(error.reason);
		// 	}else{
		// 		console.log(result);
		// 	}
		// });
	}
});

var getArray = function(class_name){
	var input_array = [];
	$('.'+ class_name).each(function(){
		input_array.push($(this).val());
	});
	console.log(input_array);
	return input_array;
}

