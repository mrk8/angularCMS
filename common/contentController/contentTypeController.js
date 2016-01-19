(function(){
	
function ContentType(_fbContentTypes, _fbContent, $firebaseArray, $state, $stateParams){
	
	this.contentTypes = _fbContentTypes;
	this.content = _fbContent;
	this.addNewContent = function(machineName){
	console.log(machineName);	
	$state.go('admin.settings.newContent', {machineName: machineName } );
	}
	

}	
	
angular
 	.module('classApp')
	.controller('ContentTypeController',[ '_fbContentTypes', '_fbContent', '$firebaseArray','$state', '$stateParams', ContentType ] );	
	
	
	
	
	
	
	
})(); // eof
