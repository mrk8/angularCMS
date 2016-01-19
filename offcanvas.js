
angular
 .module('classApp', ['firebase','ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
//		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
		$stateProvider
			
			.state('home',{
				url:'/',
				templateUrl: 'templates/home.html'
			})
			.state('admin',{
				abstract: true,
				url:'/a',
				templateUrl: 'templates/admin.html'
			})
			.state('admin.settings',{
				url:'/settings',
				templateUrl: 'templates/admin-home.html'
			})
			.state('admin.settings.structure',{
				url:'/structure',
				templateUrl: 'templates/content-types.html'
			})
			.state('admin.settings.contentTypes',{
				url:'/content-types',
				templateUrl: 'templates/content-types.html'
			})
		
			.state('admin.settings.editContentType',{
				url:'/edit-content-type',
				
			
				templateUrl: 'templates/add-content-type.html'
			})


			.state('photos',{
				//parent: 'home',
				abstract: true,
				url:'/p',
				templateUrl: 'templates/photos.html'
			})
			.state('photos.details',{
				url:'/details',
				templateUrl: 'templates/photo-details.html'
			})
			.state('photos.gallery',{
				
				url:'/gallery',
				templateUrl: 'templates/photo-gallery.html'
			})
			
			
	}]); // .config

/*********************************************
// Begin Firebase factory
*********************************************/	
// Function to get schedule firebase object.
// Returns Object object	
function getTimes($firebaseObject){	
	var ref  = new Firebase("https://glowing-fire-9878.firebaseio.com/br_com/schedule");
	console.log ( "Returning $firebaseObject(ref)" );
	console.log ( $firebaseObject(ref) );
	return  $firebaseObject(ref);	
// Returns Auth object	
//	var ref  = new Firebase("https://glowing-fire-9878.firebaseio.com/products");
//	return $firebaseAuth(ref);
}
angular
 .module('classApp')
 .factory("_fb", ['$firebaseObject', getTimes ]);

/*********************************************
// Handle classes on the side menu
*********************************************/	
function handleClass(_fb, $location,$anchorScroll,$state) {
	
		this.isActive = false;
		this.activeButton = function() {
		 console.log("clicked");
		this.isActive = !this.isActive;
		 console.log(this.isActive); 
	  } 
		
		this.anchorScroll = function(id) {
			$location.hash(id);
			//$state.go('home')+id;
			//$location.url('/#/'+id)
		
			$anchorScroll();
		
			
			console.log($location);
		  };
		
		
		
	}
angular
 .module('classApp')
 .controller('classCtrl',['_fb','$location','$anchorScroll','$state', handleClass]);

/*********************************************
// Handle the booking schedule. 
*********************************************/	
 function setSchedule(_fb, $firebaseObject, $scope, $timeout, $http) {    

	 this.schedule = _fb;
	 this.schedule.$bindTo($scope, "available");

// 		Function to reset the schedule. 	 	 
	 this.reset2 = function() { 
		this.schedule.$value = {
		current:	{
		  monday: {
			name: 'Monday',
			slots: {
			  '0900': {
				time: '9:00am',
				booked: false
			  },
			  '0930': {
				time: '9:30am',
				booked: false
			  },
			  '1000': {
				time: '10:00am',
				booked: false
			  },
			  '1030': {
				time: '10:30am',
				booked: false
			  },
			  '1100': {
				time: '11:00am',
				booked: false
			  },
			  '1130': {
				time: '11:30am',
				booked: false
			  },
			  '1200': {
				time: '12:00pm',
				booked: false
			  },
			  '1230': {
				time: '12:30pm',
				booked: false
			  },
			  '1300': {
				time: '1:00pm',
				booked: false
			  },
			  '1330': {
				time: '1:30pm',
				booked: false
			  },
			  '1400': {
				time: '2:00pm',
				booked: false
			  },
			  '1430': {
				time: '2:30pm',
				booked: false
			  },
			  '1500': {
				time: '3:00pm',
				booked: false
			  },
			  '1530': {
				time: '3:30pm',
				booked: false
			  },
			  '1600': {
				time: '4:00pm',
				booked: false
			  },
			  '1630': {
				time: '4:30pm',
				booked: false
			  },
			  '1700': {
				time: '5:00pm',
				booked: false
			  },
			  '1730': {
				time: '5:30pm',
				booked: false
			  }
			}
		  }
			
/*			,
		  tuesday: {
			name: 'Tuesday',
			slots: {
			  0900: {
				time: '9:00am',
				booked: false
			  },
			  0110: {
				time: '12:00am',
				booked: false
			  }
			}
		  }*/
			
			
			//
		}
			//
		};
		this.schedule.$save();
		} // end this.reset2
	 
// 		Function to reset the schedule. 	 
	 	this.reset = function(){
			if(this.schedule.$value === null){
			this.reset2();
			}
			else {
			this.schedule.$remove().then(function(ref){
			});
			this.reset();
			}
		}; 

// 		Function to get the 'tentative' time slot and save it.	 
	 	this.getTime = function(slotKey,slotTime) { 
			this.tentKey = slotKey;
			this.tentTime = slotTime;

		};
// 		Function to confirm appointment and set 'booked' to 'true'.	 
	 	this.confirmTime = function(slotKey, form, event) { 
		  document.getElementsByClassName('modal-body').innerHTML =  "Appointment Confirmed!";
			console.log(form);
			$http({
				method: 'POST',
				url: 'sendappointmentemail.php',
				data: $.param(form),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
/*			.success(function(data) {
				console.log(data);

				if (!data.success) {
				  // if not successful, bind errors to error variables
				  this.errorName = data.errors.name;
				  this.errorSuperhero = data.errors;
				} else {
				  // if successful, bind success message to message
				  this.message = data.message;
				}
			  });*/
			
				.then(function successCallback(response) {
				    this.apptStatus = response.status;
				    this.apptData = response.data || "Request failed";
				    console.log(this.apptData);	
					
				  }, 
				  function errorCallback(response) {
				    this.apptStatus = response.status;
				    this.apptData = response.data || "Request failed";
				    console.log(this.apptData);	
				  });
				  
			this.schedule.current.monday.slots[slotKey].booked = true;
//			this.schedule.current.monday.slots[slotKey].customerName = form.name;
			this.schedule.$save();
			
			
			
			
//			Erase form values. 			
			this.confirmAppt = {};
		}
 
  }; // End setSchedule.
angular
 .module('classApp')
 .controller('ScheduleController',[ '_fb', '$firebaseObject', '$scope','$timeout', '$http', setSchedule ] );







//angular
// .module('classApp')
// .controller('ScheduleConfController',[ '_fb', '$firebaseObject', '$scope','$timeout', '$http', confimrAppt ] );