(function(){
	
function editContent(_fbContentTypes, _fbContent, $firebaseArray, $state, $stateParams){
	this.ctName = $stateParams.machineName;
	this.key = $stateParams.id;
	console.log(this.key)
	console.log(this.ctName)
	if ( !this.key ){$state.go('admin.settings.content');}
	var contentType = _fbContentTypes;
	var content = _fbContent;
	var index = contentType.$indexFor(this.key);
	this.record = content[index] 
	var rec = content.$getRecord(this.key);
	var ContentTypeRecord= contentType.$getRecord(rec.contentTypeID);
	//this.fields = rec.fields;
	console.log( ContentTypeRecord.fields );


	
	
	console.log(this.contentType);
	console.log(rec);
 
}	
	
angular
 	.module('classApp')
	.controller('EditContentController',[ '_fbContentTypes', '_fbContent', '$firebaseArray','$state','$stateParams', editContent ] );	
	
	
	
	
	
})(); // eof