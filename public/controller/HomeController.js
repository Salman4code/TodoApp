app.controller('HomeController', function($scope, $rootScope, $state, $location, $uibModal, $window, TodoService, deletereminderService, reminderService, getNoteService, deleteNoteService, SaveNoteService, updateNoteService, changecolorService, logOutService, checkuserservice) {

  // $scope.isHidden = false;
  $scope.tommorrow = "tommorrow";
  $scope.next = "nextweek";
  $scope.today = "today";
  $scope.sidenav = true;

  $scope.color = [{
      "color": "#ffffff",
      "imgpath": "../image/whitechecked.png"
    },
    {
      "color": "#ffd180",
      // "color": "#f1c40f",
      "imgpath": "../image/yellow.png"
    },
    {
      "color": "#ffd180",
      // "color": "#9b59b6",
      "imgpath": "../image/purple.png"
    },
    {
      // #a7ffeb
      "color": "#ccff90",
      // "color": "#2ecc71",
      "imgpath": "../image/green.png"
    },
    {
      "color": "#80d8ff",
      // "color": "#3498db",
      "imgpath": "../image/blue.png"
    },
    {
      "color": "#ff8a80",
      // "color": "#e74c3c",
      "imgpath": "../image/red.png"
    }
  ];


  $rootScope.checkuser = function() {
    console.log("checkuser");
    var url = "/welcome";
    var method = "get";
    TodoService.app(url, method).then(function(response) {
      console.log("checkuser", response);
      if (response.data.status == true) {

        $state.go('home');
        // $rootScope.getnote();
      } else {
        $state.go('login');

      }
    }).catch(function(error) {
      console.log("error");
    })

  }

  $rootScope.checkuser();



  $scope.OpenPopup = function(notedata) {

    var modalInstance = $uibModal.open({
      templateUrl: '../templates/popup.html',
      controller: function($uibModalInstance) {

        var $ctrl = this;
        console.log(notedata._id);
        console.log(notedata.title)
        console.log(notedata.take_note);
        console.log("date", notedata.updatedAt);
        this.title = notedata.title;
        this.content = notedata.take_note;
        this.id = notedata._id;
        this.date = notedata.updatedAt
        this.updateNote = function() {
          console.log("update ok", notedata._id);
          updatedNoteData = {
            title: this.title,
            take_note: this.content
          }
          var url = "/update_data_notes/" + this.id + "";
          var method = "POST";
          var obj = TodoService.app(url, method, updatedNoteData);
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
          // $uibModalInstance.close({
          //   id: $ctrl.id,
          //   title: $ctrl.title,
          //   note: $ctrl.note
          // });

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
    var url = "/get_data_notes";
    var method = "POST";
    var obj = TodoService.app(url, method);
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
    if (title == "" && content == "" || title == undefined && content == undefined) {
      return;
    }

    var noteobj = {
      title: title,
      take_note: content
    }
    var url = "/data_notes";
    var method = "POST";
    var obj = TodoService.app(url, method, noteobj);
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
    var url = "/data_notes";
    var method = "POST";
    var obj = TodoService.app(url, method, notedata);
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
    var method = "POST";
    TodoService.app(url, method).then(function(data) {
      console.log(data.data.status);
      // $location.path('/login');
      $state.go('login');
    }).catch(function(error) {
      console.log(error);
    })
  }

  $scope.deletenote = function(id) {
    var url = "/delete_data_notes/" + id + "";
    var method = "POST";
    TodoService.app(url, method).then(function(data) {
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
    }
    if ($scope.remindertime == "tommorrow") {
      var today = new Date(date);
      today.setDate(today.getDate() + 1)
      $scope.reminder_at = new Date(today)
      console.log("tommorrow date", $scope.reminder_at);
    }
    if ($scope.remindertime == "nextweek") {
      var today = new Date(date);
      today.setDate(today.getDate() + 7)
      $scope.reminder_at = new Date(today)
      console.log("nextweek", $scope.reminder_at);
    }
    console.log(id);
    var data = {
      reminder: $scope.reminder_at
    };
    var url="/reminder/" + id + "";
    var method="POST";
    var obj = TodoService.app(url,method, data);
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
    var url="/deletereminder/" + note_id + "";
    var method="POST";
    TodoService.app(url,method).then(function(data) {
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
    var url="/changebgcolor/" + note_id + "";
    var method="POST";
    TodoService.app(url,method, backgroundcolor).then(function(data) {
      console.log(data.data.status);
      $rootScope.getnote();

    }).catch(function(error) {
      console.log(error);
    })

  }


});
