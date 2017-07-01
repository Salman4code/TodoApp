app.controller('HomeController', function($scope, $rootScope, $state, $location, $uibModal, $window, $timeout, $auth, toastr, todoService) {
  $scope.reminderdisplay = true;
  // $scope.isHidden = false;
  $scope.activityLog = true;
  $scope.booleanvalue = true;
  $scope.trashDisplay = true;
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



  // $scope.move = function() {
  // 		if($scope.visible){
  // 			$scope.move = {"margin-left":"10%","transition":"0.4s ease"}
  // 		}
  // 		else {
  // 			$scope.move = {"margin-left":"0px","transition":"0.4s ease"}
  // 		}
  //
  // 	}



  /**
   * checkUser - function will check for valid user if valid user the provide userProfile
   *
   * @return {type}  description
   */
  $rootScope.checkUser = function() {
    var url = "/userProfile";
    var action = "get";

    todoService.app(url, action).then(function(response) {
      $rootScope.userProfile = response.data.userprofile;
      console.log(response.data.userProfile);
      if (response.data.status == true) {
        // $state.go('home');
        $scope.user = response.data.userprofile;
        var hash = window.location.hash.split("/");
        if (hash[1] == "activity") {
          $state.go('userActivity')
          $rootScope.activityLogger(response.data.userprofile._id);
        }

      } else {
        $state.go('login');

      }
    }).catch(function(error) {
      console.log(error);
      toastr.info("Server Error please contact Administration");
    })

  }

  $rootScope.checkUser();



  /**
   * openProfilemodal -  function for profilePopup and profilepicture operation
   *
   */
  $scope.openProfilemodal = function() {
    var modalInstance = $uibModal.open({
      templateUrl: '../templates/profilePopup.html',
      controller: 'profilepopupController',
    });
    modalInstance.result.catch(function(error) {
      console.log("err", error);
      toastr.info(error);
      // $uibModalInstance.dismiss('close');
    });
  }

  //
  /**
   * openPopup - function for updation of note
   *
   * @param  {Object} notedata description
   *
   */
  $scope.openPopup = function(notedata) {
    var modalInstance = $uibModal.open({
      templateUrl: '../templates/popup.html',
      controller: function($uibModalInstance) {

        var $ctrl = this;
        this.note = notedata;
        this.scrape = notedata.scrape;

        /**
         * updateNote -  function for updation of note
         *
         */
        this.updateNote = function() {
          updatedNoteData = {
            title: this.note.title,
            content: this.note.content
          }
          var url = "/updateNote/" + this.note._id + "";
          var action = "POST";
          var obj = todoService.app(url, action, updatedNoteData);
          obj.then(function(data) {
            if (data.data.status == true) {
              toastr.info(data.data.message)
              $rootScope.getNote();
            } else {
              toastr.error("Note note Updated, Please try again");
            }

          }).catch(function(error) {
            toastr.error("Server Error Please contact Administrators")
          })


        };

        this.cancel = function() {
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


  /**
   * getNote -function for getNote/Retrieve note operation
   *
   */
  $rootScope.getNote = function() {
    var url = "/getNotes";
    var action = "POST";

    var obj = todoService.app(url, action);
    obj.then(function(data) {
      console.log("notedata", data);
      if (data.data.status == true) {
        // $scope.records = data.data.note_data;
        // noteArr;
        var flag = 0;
        var noteArr = [];
        for (var i = data.data.note_data.length - 1; i >= 0; i--) {
          noteArr[noteArr.length] = data.data.note_data[i];
          console.log(data.data.note_data[i].content);

          // var a = document.createElement('a');
          // a.href = data.data.note_data[0].content;
          // a.target = '_blank';
          // a.appendChild(document.createTextNode(data.data.note_data[i].content));
          // document.getElementById('link').appendChild(a);

          // var mydiv = document.getElementById("link");
          // var aTag = document.createElement('a');
          // aTag.setAttribute('href',data.data.note_data[i].scrapeLinkurl);
          // aTag.innerHTML = "link text";
          // mydiv.appendChild(aTag);
          // var a = document.createElement('a');
          // var linkText = document.createTextNode("link");
          // a.appendChild(linkText);
          // a.title = "data.data.note_data[i].content";
          // a.href = "data.data.note_data[i].content";
          // document.body.appendChild(a);


          if (data.data.note_data[i].isPinned == true) {
            flag++;
          }
        }
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
        toastr.error(data.data.message)
      }

    }).catch(function(error) {
      console.log("error");
      toastr.error(error)
    })

  }
  $rootScope.getNote();



  /**
   * saveNote -   function for saveNote operation
   *
   */
  $scope.saveNote = function() {
    $scope.note1 = true;
    $scope.note2 = false;

    var title = $scope.title;
    var content = $scope.content;

    if (title == "" && content == "" || title == undefined && content == undefined) {
      return;
    }

    var arr = [];
    var data = content.replace(/(<div>)|(<\/div>)|(<br>)/g, " ");
    var scrapurl = data.match(/\bhttps?:\/\/\S+/gi);
    console.log(scrapurl);

    if (scrapurl) {
      var noteobj = {
        title: title,
        content: content,
        url: scrapurl
      }
    } else {
      var noteobj = {
        title: title,
        content: content
      }
    }
    var url = "/saveNote";
    var action = "POST";
    var obj = todoService.app(url, action, noteobj);
    obj.then(function(data) {
      if (data.data.status == true) {
        $scope.title = "";
        $scope.content = "";
        $rootScope.getNote();
        toastr.info(data.data.message)
      } else {
        // console.log(data.data.message);
        toastr.error(data.data.message)
      }

    }).catch(function(error) {
      // console.log("error");
      toastr.error(error)
    })
  }


  /**
   * copyNote -  function for copyNote operation
   *
   * @param  {Object} notedata contain note detail for copy the note
   *
   */
  $scope.copyNote = function(notedata) {
    var url = "/saveNote";
    var action = "POST";
    var obj = todoService.app(url, action, notedata);
    obj.then(function(data) {
      if (data.data.status == true) {
        $rootScope.getNote();
        toastr.info(data.data.message)
      } else {
        // console.log(data.data.message);
        toastr.error(data.data.message)
      }

    }).catch(function(error) {
      // console.log("error");
      toastr.error(data.data.message)
    })

  }


  /**
   * logout -  function for logout operation
   *
   */
  $scope.logout = function() {
    var url = "/logout";
    var action = "POST";
    todoService.app(url, action).then(function(data) {
      if (data.data.status = true) {
        $state.go('login');
        // toastr.info("logout Successfully")
      }
    }).catch(function(error) {
      // console.log(error);
      toastr.error(error);
    })
    //use for logout the social login
    if (!$auth.isAuthenticated()) {
      return;
    }
    $auth.logout() //logout the facebook or google
      .then(function() {
        toastr.info('You have been logged out');
        $state.go('login');
      });
  }


  /**
   * deleteNote - function for delete single note
   *
   * @param  {Object} id       contain noteId to perform some operations
   * @param  {type} trashNote  contain trashNote string for checking purpose
   *
   */
  $scope.deleteNote = function(id, trashNote) {
    var url = "/deleteNote/" + id + "";
    var action = "POST";
    var obj = {
      'noteValue': trashNote
    }
    todoService.app(url, action, obj).then(function(data) {
      if (data.data.status == true) {
        toastr.info('Note Trashed Successfully');
        $rootScope.getNote();
      } else {
        toastr.error(data.data.message);
      }
    }).catch(function(error) {
      // console.log(error);
      toastr.error(error)
    })
  }



  /**
   * listview - function for changing the view of note to list
   *
   * @return {type}  description
   */
  $scope.listview = function() {
    $scope.liststyle = {
      'display': 'none'
    }
    $scope.gridstyle = {
      'display': 'block'
    }
    /**
     *    changing class of div for displaying list view
     */
    $scope.leavespace = "col-lg-3 col-md-3 col-sm-3";
    $scope.allocatespace = "col-lg-6 col-md-6 col-sm-6 col-xs-12";
    $scope.changeview = "cards";
    $scope.boxsize = "col-lg-12 col-md-12 col-sm-12 col-xs-12 box1 dragCard"
    localStorage.setItem("view", "list");

    /**
     *   setting the view in localStorage for checking note cards are in grid or list
     */

  }


  /**
   * gridview - function for changing the view of note to grid
   */

  $scope.gridview = function() {
    $scope.liststyle = {
      'display': 'block'
    }
    $scope.gridstyle = {
      'display': 'none'
    }
    //changing class of div for displaying grid view
    $scope.leavespace = "col-lg-2 col-md-2 col-sm-2";
    $scope.allocatespace = "col-lg-8 col-md-8 col-sm-8 col-xs-12";
    $scope.changeview = "cards";
    $scope.boxsize = "col-lg-4 col-md-6 col-sm-6 col-xs-12 box dragCard"
    localStorage.setItem("view", "grid"); //set the view in localStorage for check note are in grid or list
  }

  // if localStorage view contain grid then gridview function call else listview function call
  if (localStorage.getItem("view") == "grid") {
    $scope.gridview();
  } else {
    $scope.listview();

  }

  /**
   * slidemenubar - function for slide sidenav operation
   *
   *
   */
  $scope.slidemenubar = function() {
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

  /**
   * reminder - function for reminder operation
   *
   * @param  {String} id          contain noteId of particular note
   * @param  {type} remindertime  contain remindertime and date selected by user
   *
   */
  $scope.reminder = function(id, remindertime) {
    // $scope.reminder_date=true;
    var date = new Date();
    $scope.remindertime = remindertime;
    if ($scope.remindertime == "today") {
      var today = new Date(date);
      today.setHours(21, 00, 00)
      $scope.reminder_at = new Date(today)
    } else if ($scope.remindertime == "tommorrow") {
      var today = new Date(date);
      today.setDate(today.getDate() + 1)
      $scope.reminder_at = new Date(today)
    } else if ($scope.remindertime == "nextweek") {
      var today = new Date(date);
      today.setDate(today.getDate() + 7)
      $scope.reminder_at = new Date(today)
    } else {
      $scope.reminder_at = new Date(remindertime);
    }
    var data = {
      reminder: $scope.reminder_at
    };
    var url = "/reminder/" + id + "";
    var action = "POST";
    var obj = todoService.app(url, action, data);
    obj.then(function(data) {
      if (data.data.status == true) {
        $rootScope.getNote();
        toastr.info(data.data.message)
      } else {
        toastr.error(data.data.message)
        return;
      }
    }).catch(function(error) {
      toastr.error(error)
    })

  }


  /**
   * deleteReminder - function for deleteReminder from note operation
   *
   * @param  {String} noteId       contain noteId of particular note
   *
   */
  $scope.deleteReminder = function(noteId) {
    var url = "/deleteReminder/" + noteId + "";
    var action = "POST";
    todoService.app(url, action).then(function(data) {
      if (data.data.status == true) {
        toastr.info(data.data.message);
        $rootScope.getNote();
      } else {
        toastr.error(data.data.message)
      }
    }).catch(function(error) {
      // console.log(error);
      toastr.error(error)
    })

  }

  /**
   * selectColor - function for selecting color and updating color of note
   *
   * @param  {String} color        contain color code for changing color of note
   * @param  {String} noteId       contain noteId of particular note
   *
   */
  $scope.selectColor = function(color, noteId) {
    var backgroundcolor = {
      bgcolor: color
    };
    var url = "/changebgcolor/" + noteId + "";
    var action = "POST";
    todoService.app(url, action, backgroundcolor).then(function(data) {
      if (data.data.status == true) {
        $rootScope.getNote();
      } else {
        toastr.error(data.data.message)
      }
    }).catch(function(error) {
      // console.log(error);
      toastr.error(error)
    })

  }


  /**
   * archiveNote - function for archive & UnArchived note operation
   *
   * @param  {String} noteId    contain noteId of particular note
   * @param  {type} archiveNote description
   *
   */
  $scope.archiveNote = function(noteId, archiveNote) {
    var url = "/archive/" + noteId + "";
    var action = "POST";
    var data = {
      archiveval: archiveNote
    }
    todoService.app(url, action, data).then(function(data) {
      if (data.data.status == true) {
        toastr.info('Note ' + archiveNote + 'Successfully');
        $rootScope.getNote();
      }


    }).catch(function(error) {
      console.log(error);
    })
  }


  /**
   * removeScrapcontent - function for removing scrape content from note
   *
   * @param  {String} noteId  contain noteId of particular note
   * @param  {String} scrape  contain the scrape content details
   *
   */
  $scope.removeScrapcontent = function(noteId, scrape) {
    var url = "/removeScrapcontent/" + noteId;
    action = "post";
    var data = {
      scrapeId: scrape._id
    }
    console.log(scrape);
    todoService.app(url, action, data).then(function(data) {
      if (data.data.status == true) {
        // toastr.info('Note Pinned Successfully');
        $rootScope.getNote();
      }
    }).catch(function(error) {
      console.log(error);
    })
  }



  /**
   * pinNote - function for perform pinned and unpin operation for note
   *
   * @param  {String} noteId  contain noteId of particular note
   * @param  {String} pinval  contain the some String of pin note
   *
   */
  $scope.pinNote = function(noteId, pinval) {

    var url = "/pinned/" + noteId + "";
    var action = "POST";
    var data = {
      'pinValue': pinval
    }
    todoService.app(url, action, data).then(function(data) {
      if (data.data.status == true) {
        // toastr.info('Note Pinned Successfully');
        $rootScope.getNote();
      }
    }).catch(function(error) {
      console.log(error);
    })
  }



  /**
   * facebookshare - function for sharing note on facebook
   *
   * @param  {object} todo contain the object with detail of notes
   *
   */
  $scope.facebookshare = function(todo) {
    console.log("facebook share")
    FB.init({
      appId: '463897587277156', //facebook client Id
      status: true,
      xfbml: true
    });
    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object: {
            // your url to share
            'og:title': todo.title,
            'og:description': todo.content,
            'og:image': todo.scrapeImageurl
          }
        })
      },
      // callback
      function(response) {

        if (response && !response.error_message) {
          // then get post content
          alert('successfully posted. Status id : ' + response.post_id);
        } else {
          alert('Something went error.');
        }
      });
  };
});
