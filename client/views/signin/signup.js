Template.signUp.events({

    'submit form' : function(e){
        e.preventDefault();
        // retrieve the input field values
        var user = {
            email: $(e.target).find('[name=email]').val(),
            password: $(e.target).find('[name=password]').val(),
            password2: $(e.target).find('[name=password2]').val()
        }

        Meteor.call('user', user, function(error) { 
            // If validation passes, supply the appropriate fields to the
            // Meteor.loginWithPassword() function.
            if (error) {
                throwError(error.reason);
            } else {
                Meteor.loginWithPassword(user.email, user.password);
                Router.go('memberNew');
            }
            
        });

    },

    'click #logout': function(){
        Meteor.logout();
    }
});