app.controller('HomeController', function($scope, $rootScope, $state, $location, $uibModal, $window, $timeout, TodoService) {
  $scope.reminderdisplay = true;
  // $scope.isHidden = false;
  $scope.booleanvalue = true;

  var user = [];
  $scope.tommorrow = "tommorrow";
  $scope.next = "nextweek";
  $scope.today = "today";
  $scope.sidenav = false;

  $scope.color = [{
      "color": "#ffffff",
      "tooltip": "white"
    },
    {
      "color": "#ff8a80",
      "tooltip": "red"
    },
    {
      "color": "#ffd180",
      "tooltip": "orange"
    },
    {
      "color": "#ffff8d",
      "tooltip": "yellow"
    },
    {
      "color": "#cfd8dc",
      "tooltip": "gray"
    },
    {
      "color": "#80d8ff",
      "tooltip": "blue"
    },
    {
      "color": "#a7ffeb",
      "tooltip": "teal"
    },
    {
      "color": "#ccff90",
      "tooltip": "green"
    }


  ];


  $rootScope.checkuser = function() {
    console.log("checkuser");
    var url = "/welcome";
    var action = "get";
    TodoService.app(url, action).then(function(response) {
      console.log("checkuser", response);
      // console.log(response.data.status);
      // $rootScope.username=response.data.userprofile.userName;
      // $rootScope.userId=response.data.userprofile._id;
      $rootScope.userProfile = response.data.userprofile;
      if (response.data.status == true) {
        // $state.go('home');

        $scope.user = response.data.userprofile;
        console.log(user);
        // $rootScope.getnote();
      } else {
        $state.go('login');

      }
    }).catch(function(error) {
      console.log("error");
    })

  }

  // $rootScope.checkuser();

  $scope.Openprofilemodal = function() {
    var modalInstance = $uibModal.open({
      templateUrl: '../templates/profilePopup.html',
      controller: 'profilepopupController',
      // resolve: {
      //   object: function() {
      //
      //   }
      // }

    });
    modalInstance.result.catch(function(error) {
      console.log("err", error);
      // $uibModalInstance.dismiss('close');
    });
  }

  $scope.OpenPopup = function(notedata) {

    var modalInstance = $uibModal.open({
      templateUrl: '../templates/popup.html',
      controller: function($uibModalInstance) {

        var $ctrl = this;
        console.log(notedata._id);
        console.log(notedata.title)
        console.log("color", notedata.bgcolor);
        console.log("date", notedata.updatedAt);
        this.title = notedata.title;
        this.content = notedata.content;
        this.id = notedata._id;
        this.date = notedata.updatedAt
        this.bgcolor = notedata.bgcolor;
        this.updateNote = function() {
          console.log("update ok", notedata._id);
          updatedNoteData = {
            title: this.title,
            content: this.content
          }
          var url = "/updateNote/" + this.id + "";
          var action = "POST";
          var obj = TodoService.app(url, action, updatedNoteData);
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


        };

        this.cancel = function() {
          console.log("update cancel");
          $uibModalInstance.dismiss('cancel');
        };
      },

      controllerAs: "$ctrl"
    });

    modalInstance.result.catch(function(error) {
      console.log("err", error);

    }).then(function(data) {
      if (data) {
        console.log(data);
        // $scope.toDoList.splice(index, 1, data);
        // $scope.updateNote(data);
      }
      // this.close('dismiss');
    });


  }


  $rootScope.getnote = function() {
    var url = "/getNotes";
    var action = "POST";

    var obj = TodoService.app(url, action);
    obj.then(function(data) {
      console.log("notedata",data);
      if (data.data.status == true) {
        // $scope.records = data.data.note_data;
        // noteArr;
        var flag = 0;
        var noteArr = [];
        for (var i = data.data.note_data.length - 1; i >= 0; i--) {
          noteArr[noteArr.length] = data.data.note_data[i];
          if (data.data.note_data[i].pin_note == true) {
            flag++;
          }
        }
        console.log(flag);
        // pinArr=noteArr
        if (flag != 0) {
          $scope.pin = true;
          $scope.other = true;
        } else {
          $scope.pin = false;
          $scope.other = false;
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

  // $scope.pinup = noteArr;


  $scope.savenote = function() {
    $scope.note1 = true;
    $scope.note2 = false;

    var title = $scope.title;
    var content = $scope.content;
    console.log(title);
    console.log(content);
    if (title == "" && content == "" || title == undefined && content == undefined) {
      return;
    }

    var noteobj = {
      title: title,
      content: content
    }
    var url = "/saveNote";
    var action = "POST";
    var obj = TodoService.app(url, action, noteobj);
    obj.then(function(data) {
      console.log(data.data.status);
      if (data.data.status == true) {
        $scope.title = "";
        $scope.content = "";
        console.log(data.data.message);
        $rootScope.getnote();
      } else {
        console.log(data.data.message);
      }

    }).catch(function(error) {
      console.log("error");
    })
  }

  $scope.copyNote = function(notedata) {
    var url = "/saveNote";
    var action = "POST";
    var obj = TodoService.app(url, action, notedata);
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
    var url = "/logout";
    var action = "POST";
    TodoService.app(url, action).then(function(data) {
      console.log(data.data.status);
      // $location.path('/login');
      $state.go('login');
    }).catch(function(error) {
      console.log(error);
    })
  }

  $scope.deletenote = function(id, index) {
    var url = "/deleteNote/" + id + "";
    var action = "POST";
    TodoService.app(url, action).then(function(data) {
      console.log(data.data.status);
      if (data.data.status == true) {
        // noteArr.splice(index,1);
        $rootScope.getnote();
      } else {
        alert("data.data.message");
      }
    }).catch(function(error) {
      console.log(error);
    })
  }

  $scope.listview = function() {

    $scope.liststyle = {
      'display': 'none'
    }
    $scope.gridstyle = {
      'display': 'block'
    }
    $scope.leavespace = "col-lg-3 col-md-3 col-sm-3";
    $scope.allocatespace = "col-lg-6 col-md-6 col-sm-6 col-xs-12";
    $scope.changeview = "cards";
    $scope.boxsize = "col-lg-12 col-md-12 col-sm-12 col-xs-12 box1 dragCard"
    localStorage.setItem("view", "list");
  }
  $scope.gridview = function() {

    $scope.liststyle = {
      'display': 'block'
    }
    $scope.gridstyle = {
      'display': 'none'
    }
    $scope.leavespace = "col-lg-2 col-md-2 col-sm-2";
    $scope.allocatespace = "col-lg-8 col-md-8 col-sm-8 col-xs-12";

    $scope.changeview = "cards";
    $scope.boxsize = "col-lg-4 col-md-6 col-sm-6 col-xs-12 box dragCard"
    localStorage.setItem("view", "grid");
  }


  if (localStorage.getItem("view") == "grid") {
    console.log("gridview");
    $scope.gridview();

  } else {
    console.log("listview");

    $scope.listview();

  }

  $scope.slidemenubar = function() {
    console.log("sidebar click");
    console.log($scope.sidenav);
    if (window.innerWidth > 600) {
      if (!$scope.sidenav) {
        $scope.pagecontent = {
          "margin-left": "100px",
          "transition": "all 0.5s ease"
        }
      }
      if ($scope.sidenav) {
        $scope.pagecontent = {
          "margin-left": "0px",
          "transition": "all 0.5s ease"
        }
      }
    }
  }


  $scope.reminder = function(id, remindertime) {
    // $scope.reminder_date=true;
    console.log("reminder");
    var date = new Date();
    $scope.remindertime = remindertime;
    if ($scope.remindertime == "today") {
      var today = new Date(date);
      today.setHours(21, 00, 00)
      $scope.reminder_at = new Date(today)
      console.log("today", $scope.reminder_at);
    } else if ($scope.remindertime == "tommorrow") {
      var today = new Date(date);
      today.setDate(today.getDate() + 1)
      $scope.reminder_at = new Date(today)
      console.log("tommorrow date", $scope.reminder_at);
    } else if ($scope.remindertime == "nextweek") {
      var today = new Date(date);
      today.setDate(today.getDate() + 7)
      $scope.reminder_at = new Date(today)
      console.log("nextweek", $scope.reminder_at);
    } else {
      $scope.reminder_at = new Date(remindertime);
    }
    console.log(id);
    var data = {
      reminder: $scope.reminder_at
    };
    var url = "/reminder/" + id + "";
    var action = "POST";
    var obj = TodoService.app(url, action, data);
    obj.then(function(data) {
      if (data.data.status == true) {
        console.log(data);
        $rootScope.getnote();

      } else {
        console.log(data.data.status);
        return;
      }
    }).catch(function(error) {
      console.log("error");
    })

  }

  $scope.deletereminder = function(note_id) {
    var url = "/deleteReminder/" + note_id + "";
    var action = "POST";
    TodoService.app(url, action).then(function(data) {
      console.log(data.data.status);
      $rootScope.getnote();

    }).catch(function(error) {
      console.log(error);
    })

  }
  $scope.selectcolor = function(color, note_id, ) {
    console.log(color);

    var backgroundcolor = {
      bgcolor: color
    };
    var url = "/changebgcolor/" + note_id + "";
    var action = "POST";
    TodoService.app(url, action, backgroundcolor).then(function(data) {
      console.log(data.data.status);
      $rootScope.getnote();

    }).catch(function(error) {
      console.log(error);
    })

  }
  $scope.archive_notes = function(note_id, archiveval, pinvalue) {
    var url = "/archive/" + note_id + "";
    var action = "POST";

    var data = {
      value: archiveval,
      pin: pinvalue

    }
    TodoService.app(url, action, data).then(function(data) {
      console.log(data.data.status);
      $rootScope.getnote();
    }).catch(function(error) {
      console.log(error);
    })
  }



  $scope.pin_note = function(note_id, pinval, archiveval) {
    console.log("inside pin function");

    var url = "/pinned/" + note_id + "";
    var action = "POST";
    var data = {
      value: pinval,
      removearchive: archiveval
    }
    TodoService.app(url, action, data).then(function(data) {
      console.log(data.data.status);
      $rootScope.getnote();
    }).catch(function(error) {
      console.log(error);
    })
  }

});