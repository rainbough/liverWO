Package.describe({
    summary: "Redactor html editor for Meteor."
});

Package.on_use(function (api) {
    api.use('jquery', 'client'); // Of course the client needs to have this first
    api.use('templating', 'client');

    api.add_files(['redactor.min.js', 'redactor.css'], 'client');
});