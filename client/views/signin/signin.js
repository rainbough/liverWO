Template.signIn.events({

    'submit form' : function(e){
        e.preventDefault();

        // retrieve the input field values
        var email = $(e.target).find('[name=email]').val();
        var password= $(e.target).find('[name=password]').val();

        // Trim and validate your fields:
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }

        email = trimInput(email);

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(error) { 
            if (error) {
                throwError(error.reason);
            } else {
                Router.go('home');
            }
        });
    },

    'click #logout': function(){
        Meteor.logout();
    },

    'click #profile': function(){
        var user = Meteor.user();
        // username is the associated member id.
        var userId = user._id;
        Meteor.call('memberExists', userId, function(error, id){
            if (error) {
                throwError(error.reason);

            } else {
                var currentMemberRoute = this.routeName;
                Router.go('memberEdit', {routeName: currentMemberRoute });
            }
        });
    }
});



