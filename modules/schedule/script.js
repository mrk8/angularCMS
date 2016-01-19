(function(){
/*********************************************
// Begin AddScheduleController
// Config routes, etc.
*********************************************/	
angular
 	.module('classApp')
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
//		$locationProvider.html5Mode(true);
		$stateProvider
			.state('admin.settings.schedule',{
				url:'/add-schedule',
				controller : 'AddScheduleController',
				controllerAs : 'addScheduleCtrl',
				templateUrl: 'modules/schedule/templates/add-schedule.html'
			})
		}]); // .config
	
/*********************************************
// Add schedule addSchedule()
*********************************************/			
function addSchedule(_fbContentTypes, $firebaseArray, $state){
//	alert();

}	
	
angular
 	.module('classApp')
	.controller('AddScheduleController',[ '_fbContentTypes', '$firebaseArray', '$state', addSchedule ] );

		
})(); // eof