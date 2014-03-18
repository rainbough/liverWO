// var users = [
//       {name:"Normal User",email:"normal@example.com",roles:[]},
//       {name:"Austin-UT Group",email:"austin-ut@example.com",roles:['austinUT-group']},
//       {name:"Chicago Group",email:"chicago@example.com",roles:['chigago-group']},
//       {name:"Liver.WO Admin",email:"admin@700forscience.com",roles:['admin']}
//     ];

//   _.each(users, function (user) {
//     var id;

//     id = Accounts.createUser({
//       email: user.email,
//       password: "apple1",
//       profile: { name: user.name }
//     });

//     if (user.roles.length > 0) {
//       Roles.addUsersToRoles(id, user.roles);
//     }

//   });