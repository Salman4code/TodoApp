// var app = angular.module('myApp', ['ngRoute']);


app.controller('HomeController', function($scope, $rootScope, $state, $location, $uibModal, getNoteService, deleteNoteService, SaveNoteService, logOutService, checkuserservice) {




  $rootScope.checkuser = function() {
    console.log("checkuser");
    checkuserservice.app().then(function(response) {
      console.log(response);
      if (response.data.status == true) {

        // $location.path('/welcomepage');
        $state.go('home');
        // $rootScope.getnote();
      } else {
        // $location.path('/login');
        $state.go('login');

      }
    })
  }

  $rootScope.checkuser();

  $scope.OpenPopup = function(title) {
    var modalInstance = $uibModal.open({
      templateUrl: '../templates/popup.html',
      controller: 'popupController',
      resolve: {
        title: function() {
          return title;
        }
      }

    })

  }
  $rootScope.getnote = function() {
    var obj = getNoteService.app();
    obj.then(function(data) {
      console.log("notedata", data.data.note_data);
      if (data.data.status == true) {
        // $scope.records = data.data.note_data;
        var noteArr = [];
        for (var i = data.data.note_data.length - 1; i >= 0; i--) {
          noteArr[noteArr.length] = data.data.note_data[i];
        }
        $scope.records = noteArr;
      } else {
        console.log(data.data.message);
      }

    }).catch(function(error) {
      console.log("error");
    })

  }
  $rootScope.getnote();
  $scope.savenote = function() {
    $scope.note1 = true;
    $scope.note2 = false;

    var title = $scope.title;
    var content = $scope.content;
    console.log(title);
    console.log(content);
    if (title == " " && content == " " || title == undefined && content == undefined) {
      return;
    }

    var noteobj = {
      title: title,
      take_note: content
    }

    var obj = SaveNoteService.app(noteobj);
    obj.then(function(data) {
      console.log(data.data.status);
      if (data.data.status == true) {
        console.log(data.data.message);
        $rootScope.getnote();
      } else {
        console.log(data.data.message);
      }

    }).catch(function(error) {
      console.log("error");
    })
  }
  $scope.logout = function() {
    logOutService.app().then(function(data) {
      console.log(data.data.status);
      // $location.path('/login');
      $state.go('login');
    }).catch(function(error) {
      console.log(error);
    })
  }

  $scope.deletenote = function(id) {
    deleteNoteService.app(id).then(function(data) {
      console.log(data.data.status);
      // $location.path('/login');
      $rootScope.getnote();

    }).catch(function(error) {
      console.log(error);
    })
  }

  $scope.listview = function() {
    $scope.list = true;
    $scope.grid = false;
    $scope.liststyle = {
      'display': 'none'
    }
    $scope.gridstyle = {
      'display': 'block'
    }
    localStorage.setItem("view", "list");
  }
  $scope.gridview = function() {
    $scope.list = false;
    $scope.grid = true;
    $scope.liststyle = {
      'display': 'block'
    }
    $scope.gridstyle = {
      'display': 'none'
    }
    localStorage.setItem("view", "grid");
  }


  if (localStorage.getItem("view") == "grid") {
    console.log("gridview");
    $scope.gridview();

  } else {
    console.log("listview");

    $scope.listview();
  }




})
// .service('getNoteService', function($http) {
//
//   this.app = function() {
//     return $http({
//       url: "/get_data_notes",
//       method: "POST",
//       dataType: 'JSON'
//     });
//   }
// }).service('SaveNoteService', function($http) {
//
//   this.app = function(noteobj) {
//     return $http({
//       url: "/data_notes",
//       method: "POST",
//       dataType: 'JSON',
//       data: noteobj
//     });
//   }
// }).service('logOutService', function($http) {
//
//   this.app = function() {
//     return $http({
//       url: "/logout",
//       method: "POST"
//     });
//   }
// }).service('checkuserservice', function($http) {
//   this.app = function() {
//     return $http({
//       url: "/welcome",
//       method: "get",
//     });
//   }
//   //
// });
