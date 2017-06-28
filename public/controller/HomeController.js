app.controller('HomeController', function($scope, $rootScope, $state, $location, $uibModal, $window, $timeout, $auth, toastr, TodoService) {
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

  $rootScope.checkUser = function() {
    console.log("checkuser");
    var url = "/userProfile";
    var action = "get";
    TodoService.app(url, action).then(function(response) {
      $rootScope.userProfile = response.data.userprofile;
      console.log(response.data.userProfile);
      if (response.data.status == true) {
        // $state.go('home');
        $scope.user = response.data.userprofile;
        var hash = window.location.hash.split("/");
        if (hash[1] == "activity") {
          console.log("userActivity", response.data.userprofile._id);
          $state.go('userActivity')
          $rootScope.activityLogger(response.data.userprofile._id);
        }

      } else {
        $state.go('login');

      }
    }).catch(function(error) {
      console.log(error);
    })

  }

  $rootScope.checkUser();

  //function for profilePopup and profilepicture operation
  $scope.openProfilemodal = function() {
    var modalInstance = $uibModal.open({
      templateUrl: '../templates/profilePopup.html',
      controller: 'profilepopupController',
    });
    modalInstance.result.catch(function(error) {
      console.log("err", error);
      // $uibModalInstance.dismiss('close');
    });
  }

  //function updateNote in modalInstance operation
  $scope.openPopup = function(notedata) {
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
        this.scrapeImageurl = notedata.scrapeImageurl;
        this.scrapeTitle = notedata.scrapeTitle;
        this.scrapeLinkurl = notedata.scrapeLinkurl;
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
              $rootScope.getNote();
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

  //function for getNote/Retrieve note operation
  $rootScope.getNote = function() {
    var url = "/getNotes";
    var action = "POST";

    var obj = TodoService.app(url, action);
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
      }

    }).catch(function(error) {
      console.log("error");
    })

  }
  $rootScope.getNote();


  //function for saveNote operation
  $scope.saveNote = function() {
    $scope.note1 = true;
    $scope.note2 = false;

    var title = $scope.title;
    var content = $scope.content;
    // console.log(title);
    // console.log(content);

    var scrapurl = content.match(/\bhttps?:\/\/\S+/gi);
    console.log(scrapurl);
    // var a=url.replace("<div>","");
    // console.log("matches->",url);

    if (title == "" && content == "" || title == undefined && content == undefined) {
      return;
    }
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
    var obj = TodoService.app(url, action, noteobj);
    obj.then(function(data) {
      if (data.data.status == true) {
        $scope.title = "";
        $scope.content = "";
        $rootScope.getNote();
      } else {
        console.log(data.data.message);
      }

    }).catch(function(error) {
      console.log("error");
    })
  }

  //function for copyNote operation
  $scope.copyNote = function(notedata) {
    var url = "/saveNote";
    var action = "POST";
    var obj = TodoService.app(url, action, notedata);
    obj.then(function(data) {
      if (data.data.status == true) {
        $rootScope.getNote();
      } else {
        console.log(data.data.message);
      }

    }).catch(function(error) {
      console.log("error");
    })

  }

  //function for logout operation
  $scope.logout = function() {
    var url = "/logout";
    var action = "POST";
    TodoService.app(url, action).then(function(data) {
      if (data.data.status = true) {
        $state.go('login');
      }
    }).catch(function(error) {
      console.log(error);
    })
    //use for logout the social login
    if (!$auth.isAuthenticated()) {
      return;
    }
    $auth.logout()  //logout the facebook or google
      .then(function() {
        toastr.info('You have been logged out');
        $state.go('login');
      });
  }

//function for delete single note
  $scope.deleteNote = function(id, trashNote) {
    var url = "/deleteNote/" + id + "";
    var action = "POST";
    var obj = {
      'noteValue': trashNote
    }
    TodoService.app(url, action, obj).then(function(data) {
      if (data.data.status == true) {
        toastr.info('note deleted');
        $rootScope.getNote();
      } else {
        toastr.error(data.data.message);
      }
    }).catch(function(error) {
      console.log(error);
    })
  }

//function for changing the view of note to list
  $scope.listview = function() {
    $scope.liststyle = {
      'display': 'none'
    }
    $scope.gridstyle = {
      'display': 'block'
    }
    //changing class of div for displaying list view
    $scope.leavespace = "col-lg-3 col-md-3 col-sm-3";
    $scope.allocatespace = "col-lg-6 col-md-6 col-sm-6 col-xs-12";
    $scope.changeview = "cards";
    $scope.boxsize = "col-lg-12 col-md-12 col-sm-12 col-xs-12 box1 dragCard"
    localStorage.setItem("view", "list"); //setting the view in localStorage for checking note cards are in grid or list
  }

  //function for changing the view of note to grid
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
  //function for slide sidenav operation
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

  //function for reminder operation
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
    var obj = TodoService.app(url, action, data);
    obj.then(function(data) {
      if (data.data.status == true) {
        $rootScope.getNote();
      } else {
        console.log(data.data.status);
        return;
      }
    }).catch(function(error) {
      console.log("error");
    })

  }
  //function for deleteReminder from note operation
  $scope.deleteReminder = function(note_id) {
    var url = "/deleteReminder/" + note_id + "";
    var action = "POST";
    TodoService.app(url, action).then(function(data) {
      if(data.data.status==true){
        toastr.info('Reminder Deleted');
        $rootScope.getNote();
      }
    }).catch(function(error) {
      console.log(error);
    })

  }
  //function for selecting color and updating color of note
  $scope.selectColor = function(color, note_id) {
    var backgroundcolor = {
      bgcolor: color
    };
    var url = "/changebgcolor/" + note_id + "";
    var action = "POST";
    TodoService.app(url, action, backgroundcolor).then(function(data) {
      if(data.data.status==true){
        $rootScope.getNote();
      }
    }).catch(function(error) {
      console.log(error);
    })

  }
    //function for archive & UnArchived note operation
  $scope.archiveNote = function(note_id, archiveNote) {
    var url = "/archive/" + note_id + "";
    var action = "POST";
    var data = {
      archiveval: archiveNote
    }
    TodoService.app(url, action, data).then(function(data) {
      if(data.data.status==true){
        toastr.info('Note Archieved Successfully');
        $rootScope.getNote();
      }


    }).catch(function(error) {
      console.log(error);
    })
  }
    //function for removing scrape content from note
  $scope.removeScrapcontent = function(noteId) {
    var url = "/removeScrapcontent/" + noteId;
    action = "post";
    console.log(noteId);
    TodoService.app(url, action).then(function(data) {
      if(data.data.status==true){
        // toastr.info('Note Pinned Successfully');
        $rootScope.getNote();
      }
    }).catch(function(error) {
      console.log(error);
    })
  }

  //function for perform pinned and unpin operation for note
  $scope.pinNote = function(noteId, pinval) {

    var url = "/pinned/" + noteId + "";
    var action = "POST";
    var data = {
      'pinValue': pinval
    }
    TodoService.app(url, action, data).then(function(data) {
      if(data.data.status==true){
        // toastr.info('Note Pinned Successfully');
        $rootScope.getNote();
      }
    }).catch(function(error) {
      console.log(error);
    })
  }


  $scope.facebookshare = function(todo) {
    console.log("facebook share")
    FB.init({
      appId: '463897587277156',
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
            /*'og:image': 'http://example.com/link/to/your/image.jpg'*/
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



  // $(window).on("load",function(){
  // $(document).ready(function(){
  // // function extractUrl(){
  //    links = [];
  //   var comment = $('#comment');
  //   $('#content').keyup(function () {
  //       checkForLinks($(this));
  //   }).blur(function () {
  //       checkForLinks($(this), true);
  //   });
  //   // });
  //   function checkForLinks(elem, isBlur) {
  //       var text = elem.html();
  //       var urlCheckString = '((?:http[s]?:\\/\\/(?:www\\.)?|www\\.){1}(?:[0-9A-Za-z\\-%_]+\\.)+[a-zA-Z]{2,}(?::[0-9]+)?(?:(?:/[0-9A-Za-z\\-\\.%_]*)+)?(?:\\?(?:[0-9A-Za-z\\-\\.%_]+(?:=[0-9A-Za-z\\-\\.%_\\+]*)?)?(?:&amp;(?:[0-9A-Za-z\\-\\.%_]+(?:=[0-9A-Za-z\\-\\.%_\\+]*)?)?)*)?(?:#[0-9A-Za-z\\-\\.%_\\+=\\?&;]*)?)'; //full url
  //       if (isBlur) {
  //           var regex = new RegExp(urlCheckString, 'gi');
  //       } else {
  //           var regex = new RegExp(urlCheckString + '(?!<br>)[^0-9A-Za-z\-\.%_\+\/=&\?;#]', 'gi');
  //       }
  //
  //       //console.log("Text: " + text);
  //       var newText = text;
  //       // newText = newText.replace(new RegExp('<p class="link">([^<]*)</p>', 'gi'), '$1');
  //       // newText = newText.replace(new RegExp('<p class="link">([^<]*<br>[^<]*)</p>', 'gi'), '$1');
  //       newText = newText.replace(new RegExp('<p></p>', 'gi'), '');
  //       newText = newText.replace(new RegExp('<a[^>]*>([^<]*)</a>', 'gi'), '$1'); //change back the IE	autochange
  //       // console.log("newText: " + newText);
  //
  //       newText = newText.replace(regex, function (match, link, offset, string) {
  //           var trailingChar = match.substr(link.length);
  //           if (!links[link]) {
  //               links[link] = link;
  //               linkDetected(link);
  //                 // $scope.linkDetected(link);
  //
  //           }
  //           // return;
  //           console.log(link);
  //           return '<p class="link">' + link + '</p>' + trailingChar;
  //       });
  //
  //       //console.log("newTextafter: " + newText);
  //       if (text.localeCompare(newText) != 0) {
  //           elem.html(newText);
  //       }
  //   }


  // function linkDetected(linkString) {
  // $scope.linkDetected=function(linkString) {

  // console.log(linkString);
  // var url = "/scrape";
  // var action = "post";
  // var data = {
  //   url: linkString
  // };
  // var obj = TodoService.app(url,action,data);
  // obj.then(function(data) {
  //   console.log("linkDetected",data.data.status);
  //   if (data.data.status == true) {
  //     $scope.title = "";
  //     $scope.content = "";
  //     console.log(data.data.message);
  //     $rootScope.getNote();
  //   } else {
  //     console.log(data.data.message);
  //   }
  //
  // }).catch(function(error) {
  //   console.log("error");
  // })
  // }

  // });
  // }

});
