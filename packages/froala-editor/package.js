Package.describe({
 	summary: "Froala - a Modern jquery-based html editor, repackaged for meteor."
});

Package.on_use(function (api, where) {
	api.use(['jquery', 'font-awesome'], 'client');
	api.add_files(['froala_editor.min.js', 'froala_editor.min.css'], 'client');
});

Package.on_test(function (api) {
 	api.use('froala-editor');

 	api.add_files('froala-editor_tests.js', 'client');
});
