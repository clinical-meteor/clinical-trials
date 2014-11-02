Session.setDefault('isStaleUserRecord', false);
Session.setDefault('isStalePassword', false);
Session.setDefault('modalReturnRoute', false);

Session.setDefault('passwordConfirmed', false);
Session.setDefault('selectedUser', false);
Session.setDefault('selectedSponsorId', false);
Session.setDefault('functionPassing', null);

Session.setDefault('updatePasswordIsSuccessful', false);
Session.setDefault('defaultUserProfileCard', 'basicInfoCard');

Session.setDefault('selectedSponsor', false);
Session.setDefault('selectedRole', false);


//------------------------------------------------------------------------------
// ROUTER

Router.map(function(){
  this.route('editProfileRoute', {
    path: '/user/edit/:id',
    template: 'userEditPage',
    onBeforeAction: function(){
      Session.set('selectedUser', this.params.id);
    },
    waitOn: function(){
      return Meteor.subscribe('userDirectory');
      //return Meteor.subscribe('userProfile');
    },
    data: function () {
      //console.log('this.params.id',this.params.id);
      return Meteor.users.findOne({_id: this.params.id});
    },
    onAfterAction:function(){
      Session.set('selectedSponsor', false);
      Session.set('selectedRole', false);
    }
  });
  this.route('newUserRoute', {
    path: '/user/new',
    template: 'userEditPage',
    onBeforeAction: function(){
      setPageTitle("New User");
      Session.set('defaultUserProfileCard', 'basicInfoCard');
    },
    waitOn: function(){
      return Meteor.subscribe('userDirectory');
    },
    data: function () {
      return {};
    },
    onAfterAction: function() {
      Session.set('isOnListPage', false);
      Session.set('selectedSponsor', false);
      Session.set('selectedRole', false);
    }
  });
});


UI.registerHelper('isStaleUserRecord', function(){
  if(Session.get('isStaleUserRecord')){
    return "visible";
  }else{
    return "hidden";
  }
});

//-------------------------------------------------------------
// USER EDIT PAGE

Template.userEditPage.helpers({
  user: function(){
    if(this){
      return this;
    }else{
      return {
        profile:{
          role:"User"
        }
      };
    }
  },
  newOrEditUser: function(){
    if(this._id){
      return "Edit User";
    }else{
      return "New User";
    }
  }

  // showSecurityCard:function(){
  //   if(Session.get('defaultUserProfileCard') === 'securityCard'){
  //     Session.set('updatePasswordIsSuccessful', false);
  //     return true;
  //   }else{
  //     return false;
  //   }
  // },
  // showPreferencesCard:function(){
  //   if(Session.get('defaultUserProfileCard') === 'preferencesCard'){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
});

Template.userEditPage.events({
  'click #showBasicInfoCard':function(){
    Session.set('defaultUserProfileCard', 'basicInfoCard');
  },
  'click #showSecurityCard':function(){
    Session.set('defaultUserProfileCard', 'securityCard');
  },
  'click #showPreferencesCard':function(){
    Session.set('defaultUserProfileCard', 'preferencesCard');
  }
});



//-------------------------------------------------------------
// CARDS - BASIC INFO

Template.userBasicInfoCard.helpers({
  basicInfoCardVisible:function(){
    if(Session.get('defaultUserProfileCard') === 'basicInfoCard'){
      return "visible";
    }else{
      return "hidden";
    }
  },
  isStaleUserRecord: function(){
    if(Session.get('isStaleUserRecord')){
      return "visible";
    }else{
      return "hidden";
    }
  },
  createOrSaveText: function(){
    if(this._id){
      return "Save Changes";
    }else{
      return "Create User";
    }
  },
  getUsername: function(){
    if(this.username){
      return this.username;
    }else{
      return "";
    }
  },
  getEmail: function(){
    if(this.emails){
      return this.emails[0].address;
    }else{
      return "";
    }
  },
  getName: function(){
    if(this.profile){
      return this.profile.name;
    }else{
      return "";
    }
  },
  getTitle: function(){
    if(this.profile){
      return this.profile.title;
    }else{
      return "";
    }
  },
  getRoles: function(){
    console.log("Template.userEditPage.getRoles");

    var user = Meteor.users.findOne({_id: Session.get('selectedUser')});
    if(user && user.profile){
      if(user.profile.roles){
        //console.log("this.profile.role", user.profile.roles);
        return user.profile.roles;
      }else{
        return "No role set.";
      }
    }else{
      if(Session.get('selectedRole') && Session.get('selectedRole').name && (Session.get('selectedRole').name !== "---")){
        return Session.get('selectedRole').name;
      }else{
        return "Please select a user role.";
      }
    }
  },
  getSponsor: function(){

    var user = Meteor.users.findOne({_id: Session.get('selectedUser')});
    if(user && user.profile){
      if(user.profile.sponsor){
        console.log("this.profile.sponsor: " + user.profile.sponsor);
        return user.profile.sponsor;
      }else{
        return "No sponsor organization defined in profile.";
      }
    }else{
      console.log('selectedSponsor', Session.get('selectedSponsor'));
      if(Session.get('selectedSponsor') && (Session.get('selectedSponsor').name !== "---")){
        return Session.get('selectedSponsor').name;
      }else{
        return "Please select a sponsor to be associated with.";
      }
    }
  },
  getPhone: function(){
    if(this.profile){
      return this.profile.phone;
    }else{
      return "";
    }
  },
  getWebsite: function(){
    if(this.profile){
      return this.profile.website;
    }else{
      return "";
    }
  }
})


Template.userBasicInfoCard.events({
  'click #saveBasicInfoButton':function(){

    var input = {
      _id: this._id,
      username: $('#profileUsernameInput').val(),
      address: $('#profileEmailInput').val(),
      password: Math.random().toString(36).slice(2,9),
      //password: $('#profilePasswordInput').val(),
      profile:{
        name: $('#profileNameInput').val(),
        title: $('#profileTitleInput').val(),
        avatar: $('#profileAvatarInput').val(),
        roles: [],
        phone: $('#profilePhoneInput').val(),
        website: $('#profileWebsiteInput').val(),
        address: $('#profileAddressInput').val(),
        city: $('#profileCityInput').val(),
        state: $('#profileStateInput').val(),
        zip: $('#profileZipInput').val()
      }
    };


    console.log('selectedSponsor', Session.get('selectedSponsor'));
    if(Session.get('selectedSponsor')){
      input.profile.sponsor = Session.get('selectedSponsor').name;
      input.profile.sponsor_id = Session.get('selectedSponsor')._id;
    }else{
      input.profile.sponsor = this.employer;
      input.profile.sponsor_id =  this.employer_id;
    }

    console.log('selectedRole', Session.get('selectedRole'));
    if(Session.get('selectedRole') && (Session.get('selectedRole').name !== "---")){
      input.profile.roles.push(Session.get('selectedRole').name);
    }else{
      input.profile.roles.push('Data Entry');
    }

    if(this._id){
      Meteor.call('updateUser', input, function(error, result){
        if(error){
          console.error(error);
        }
        if(result){
          console.log('updated user:' + result);
          Session.set('isStaleUserRecord', false);
        }
      });
    }else{
      Meteor.call('createNewUser', input, function(error, result){
        if(error){
          console.error(error);
        }
        if(result){
          console.log('created user :' + result);
          Session.set('defaultUserProfileCard', 'securityCard');
          Router.go('/user/edit/' + result);
        }
      });
    }
    Session.set('isStaleUserRecord', false);
  },
  'click #findSponsorButton':function(){
    // we're going to have some funky scoping
    // so grab the data context so 'this' can be reused
    var self = this;

    Session.set('selectedUser', this._id);
    Session.set('showEmptyRecord', true);

    $('#sponsorSearchModal').modal("show");

    $('#sponsorSearchModal').on('hidden.bs.modal', function (e) {
      var sponsor = Session.get('selectedSponsor');

      if(sponsor){
        if(self._id){
          sponsor.user_id = self._id;
          console.log("Sponsor", sponsor);

          Meteor.call('setUserSponsor', sponsor, function(error, result){
            if(error){
              console.error(error);
            }
            if(result){
              console.log('updated user employer:' + result);
              Session.set('selectedSponsor', null);
              //Session.set('isStaleUserRecord', true);
            }
          });
        }else{
          // if this is a new user, we want to update the DOM form element
          $('#findSponsorButton').html(Session.get('selectedSponsor').name);
          Session.set('isStaleUserRecord', true);
        }

      }
      // setting the record dirty may not be needed, if we want to save things right away
      // but we set it just to be safe
      Session.set('isDirtyRecord', true);
    });

  },
  'click #findRoleButton': function(){
    // we're going to have some funky scoping
    // so grab the data context so 'this' can be reused
    var self = this;

    // trigger our modal dialog
    $('#selectRoleModal').modal("show");

    // this is stuff we do when the modal closes
    $('#selectRoleModal').on('hidden.bs.modal', function (e) {

      // we only do the following if they actually selected a role
      // and didn't cancel
      var role = Session.get('selectedRole');
      console.log('selectedRole', role);

      if(role){
        // if this is editing an existing user
        if(self._id){

          //we call a server side method to update the record for us
          Meteor.call('setUserRole', self._id, role.name, function(error, result){
            if(error){
              console.error(error);
            }
            if(result){
              console.log('updated role :' + result);
            }
          });
        }else{
          // if this is a new user, we want to update the DOM form element
          $('#findRoleButton').html(Session.get('selectedRole').name);
          Session.set('isStaleUserRecord', true);
        }
      }

      // regardless of whether they selected a role or canceled
      // we now want to reset variables and clean up after ourselves
      //Session.set('isStaleUserRecord', true);
      //Session.set('selectedRole', null);
    });

  },
  'keydown #profileUsernameInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileEmailInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileNameInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileTitleInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileCompanyInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileAvatarInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profilePhoneInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileWebsiteInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileAddressInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileCityInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileStateInput':function(){
    Session.set('isStaleUserRecord', true);
  },
  'keydown #profileZipInput':function(){
    Session.set('isStaleUserRecord', true);
  }
});



//-------------------------------------------------------------
// CARDS - SECURITY

Template.userSecurityCard.helpers({
  securityCardVisible:function(){
    if(Session.get('defaultUserProfileCard') === 'securityCard'){
      return "visible";
    }else{
      return "hidden";
    }
  },
  // passwordIsValid: function(){
  //   return Session.get('passwordConfirmed');
  // },
  isValidated: function(){
    //if($("#newPasswordInput").val() === ""){
    //  return "";
    //}else{
      if(Session.get('passwordConfirmed')){
        return "has-success";
      }else{
        return "has-error";
      }
    //}
  },
  showSuccessMessage: function(){
    return Session.get('updatePasswordIsSuccessful');
  }
});

Template.userSecurityCard.events({
  'keyup #profilePasswordInput':function(){
    if($('#newPasswordInput').val() === $('#confirmPasswordInput').val()){
      if($('#newPasswordInput').val() !== ""){
        Session.set('passwordConfirmed', true);
      }else{
        Session.set('passwordConfirmed', false);
      }
    }else{
      Session.set('passwordConfirmed', false);
    }
    console.log('passwordConfirmed', Session.get('passwordConfirmed'));
  },
  'keyup #profilePasswordConfirmInput':function(){
    if($('#newPasswordInput').val() === $('#confirmPasswordInput').val()){
      Session.set('passwordConfirmed', true);
    }else{
      Session.set('passwordConfirmed', false);
    }
  },
  // 'keydown #profilePasswordInput':function(){
  //   Session.set('isStalePassword', true);
  // },
  // 'keydown #profilePasswordConfirmInput':function(){
  //   Session.set('isStalePassword', true);
  // },
  'click #updatePasswordButton':function(){
    if($('#newPasswordInput').val() === $('#confirmPasswordInput').val()){
      console.log('settingUserPassword...');
      return foo = Meteor.call('setUserPassword',{_id: this._id, password: $('#newPasswordInput').val() },function(error,result){
        if(error){
          Session.set('updatePasswordIsSuccessful', false);
          Session.set('errorMessage', error);
          Session.set('showErrorMessage', true);
          console.error(error);
        }
        if(result){
          Session.set('passwordConfirmed', false);
          Session.set('updatePasswordIsSuccessful', true);
          console.log('updatePasswordIsSuccessfulInner', Session.get('updatePasswordIsSuccessful'));
          $('#newPasswordInput').val('');
          $('#confirmPasswordInput').val('');
          console.log(result);
        }
      });
    }
    console.log('updatePasswordIsSuccessfulOuter', Session.get('updatePasswordIsSuccessful'));
    //event.preventDefault();
  }
});


//-----------------------------------------
Template.userPreferencesCard.helpers({
  preferencesCardVisible:function(){
    if(Session.get('preferencesCardVisible') === 'preferencesCard'){
      return "visible";
    }else{
      return "hidden";
    }
  }
});
