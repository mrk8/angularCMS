
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
				controller : 'ContentTypeController',
				controllerAs : 'CTCtrl',
				templateUrl: 'templates/content-types.html'
			})
			.state('admin.settings.content',{
				url:'/content',
				controller : 'ContentTypeController',
				controllerAs : 'CTCtrl',
				templateUrl: 'templates/content.html'
			})
			.state('admin.settings.newContent',{
				url:'/add-new-content/:machineName',
				params: {
					id: null,
				  },
				controller : 'AddNewContentController',
				controllerAs : 'AddNewConCtrl',
				templateUrl: 'templates/add-new-content.html'
			})
			.state('admin.settings.editContent',{
				url:'/edit-content/:machineName',
				params: {
					id: null,
				  },
				controller : 'EditContentController',
				controllerAs : 'EditConCtrl',
				templateUrl: 'templates/edit-content.html'
			})
		
		
			.state('admin.settings.addContentType',{
				url:'/add-content-type',
				controller : 'AddContentTypeController',
				controllerAs : 'addCTCtrl',
				templateUrl: 'templates/add-content-type.html'
			})
			.state('admin.settings.editContentType',{
				url:'/edit-content-type/:mn',
				params: {
					id: null,
				  },
				controller : 'EditContentTypeController',
				controllerAs : 'editCTCtrl',
				templateUrl: 'templates/edit-content-type.html'
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
			.state('about',{
				url:'/about',
				templateUrl: 'templates/about.html'
			})
	}]); // .config

/*********************************************
// Begin Firebase factory
*********************************************/	

function getTimes($firebaseObject){	
	var ref  = new Firebase("https://glowing-fire-9878.firebaseio.com/br_com/schedule");
	return  $firebaseObject(ref);	
} // end getTimes().
/*********************************************
// Begin IP Geolocation factory
*********************************************/	
function getIP($http,$q){
	return $http.get('http://ipinfo.io');
	
} // end getIP.
/*********************************************
*********************************************/	






angular
 .module('classApp')
 .factory('getIP', ['$http','$q', getIP ])
 .factory('_fb', ['$firebaseObject', getTimes ]);

/*********************************************
// Handle classes on the side menu
*********************************************/	
function classCtrl($scope,_fb, $location,$anchorScroll,$state,getIP,$http) {
		var vm = this;	
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
		
		var ip = getIP.then(function(response) {
			
			console.log( 'The internet has leaks.' );
			console.log( response.data );
			vm.visitorCity = response.data.city;
			vm.visitorState = response.data.region;
			vm.visitorIP = response.data.ip;
			
			latLong =response.data.loc.split(',');
			$http.get('http://api.openweathermap.org/data/2.5/weather?lat='+latLong[0]+'&lon='+latLong[1]+'&appid=e6fbf5f8bddce2fd1525075ed90700f5&units=imperial').then(function(response1) {
			console.log( response1.data );
			vm.visitorTemp = response1.data.main.temp;
			vm.visitorHumidity = response1.data.main.temp;
			vm.visitorCity = response1.data.main.city;
			vm.visitorSunrise = response1.data.sys.sunrise;	
			vm.visitorSunset = response1.data.sys.sunset;
			vm.visitorWeatherDesc = response1.data.weather[0].main;
			vm.visitorWeatherDesc2 = response1.data.weather[0].description;
			vm.visitorWindSpeed = response1.data.wind.speed; // wind speed		
			vm.visitorWindDeg = response1.data.wind.deg; // wind direction 
			vm.visitorWeatherIcon = 'http://openweathermap.org/img/w/' + response1.data.weather[0].icon + '.png';	
			});
			
			
			//console.log('ghkahs');
			//console.log(this);
	  }); // end Begin IP Geolocation factory
	
		//console.log(ip);
	} // end handleClass()
angular
 .module('classApp')
 .controller('classCtrl',['$scope','_fb','$location','$anchorScroll','$state','getIP','$http', classCtrl]);

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