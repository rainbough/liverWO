Template.static_contact.events({
	"click button#contact-submit": function(e) {
		e.preventDefault();
		var fdata = $("form.contact").serializeFormToObj();
		Meteor.call("sendContactEmail",fdata.message,fdata.email,fdata.first_name,function(err){
		});
	}
});