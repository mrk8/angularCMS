(function(){
	
function editContent(_fbContentTypes, _fbContent, $firebaseArray, $state, $stateParams){
/*	this.ctName = $stateParams.mn;
	this.key = $stateParams.id;
	console.log(this.key)
	console.log(this.ctName)*/
/*	if ( !this.key ){$state.go('admin.settings.content');}
	this.contentType = _fbContentTypes;
	this.content = _fbContent;
	var index = this.contentType.$indexFor(this.key);
	this.record = this.content[index] 
	var rec = this.content.$getRecord(this.key);
	this.fields = rec.fields;
	console.log(rec.fields );*/

	
	
//	console.log(this.contentType);
//	console.log(rec);
 
}	
	
angular
 	.module('classApp')
//	.factory('ContentType', ['$firebaseObject', getCT ])
	.controller('EditContentController',[ '_fbContentTypes', '_fbContent', '$firebaseArray','$state','$stateParams', editContent ] );	
	
	
	
	
	
})(); // eof