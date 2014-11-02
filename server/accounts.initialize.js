//-------------------------------------------------------------------------
// USER ACCOUNTS

if (Meteor.users.find().count() === 0) {
  console.log("Running on localhost and no users found.  Lets create some.");

  var users = [{
      email: "sysadmin@clinical-trials.meteor.com",
      username: "sysadmin",
      name: "System Administrator",
      password: "sysadmin321$",
      roles: ["SysAdmin"],
      sponsor: "clinical-trials.meteor.com"
      // roles: ["employee", "sysadmin", "coordinator", "reviewer", "builder"]
    }, {
      email: "janedoe@acme.com",
      username: "janedoe",
      name: "Jane Doe",
      password: "janedoe123",
      roles: ["Data Entry"],
      sponsor: "ACME Pharmaceuticals"
    },{
      email: "johndoe@acme.com",
      username: "johndoe",
      name: "John Doe",
      password: "johndoe123",
      roles: ["Reviewer"],
      sponsor: "ACME Pharmaceuticals"
    }
  ];

  users.forEach(function(user){
    console.log('----------------------------')
    console.log('newUser: ', user);
    var id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
            name: user.name,
            roles: [user.roles],
            sponsor: user.sponsor
        },
        username: user.username
    });

    if(user.roles.length > 0){
      Roles.addUsersToRoles(id, user.roles);
    }

    console.log('createdUser: ', Meteor.users.findOne({_id: id}));
  });

  console.log("Users created: " + Meteor.users.find().count());
}


//-------------------------------------------------------------------------
// SPONSORS
