(function(){
	
function ContentType(_fbContentTypes, _fbContent, $firebaseArray, $state, $stateParams){
	
	this.contentTypes = _fbContentTypes;
	this.content = _fbContent;
	
	this.addNewContent = function(key){
	console.log(key);	
	
	var rec = this.contentTypes.$getRecord(key);	
	var index = this.contentTypes.$indexFor(key);	
	console.log(rec.machineName);

		
	//rec.push({ contentTypeID: key });

		
	$state.go('admin.settings.newContent', {machineName: rec.machineName, id: key} );
	}
	

}	
	
angular
 	.module('classApp')
	.controller('ContentTypeController',[ '_fbContentTypes', '_fbContent', '$firebaseArray','$state', '$stateParams', ContentType ] );	
	
	
	
	
	
	
	
})(); // eof
