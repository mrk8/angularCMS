(function(){
	
function editContentType(_fbContentTypes, $firebaseArray, $state, $stateParams){
	this.ctName = $stateParams.mn;
	this.key = $stateParams.id;
	if ( !this.key ){$state.go('admin.settings.contentTypes');}
	this.contentType = _fbContentTypes;
	var index = this.contentType.$indexFor(this.key);
	this.record = this.contentType[index]; 
	var rec = this.contentType.$getRecord(this.key);
	this.fields = rec.fields;
	console.log(rec.fields );
	this.addCT_Field = function(val){
		if(!rec.fields){
			rec.fields = [];
		}
		console.log(index);
		rec.fields.push({type : val});
		this.fields = rec.fields;
		this.contentType.$save(index)
		val = {};
	}
	
	
//	console.log(this.contentType);
//	console.log(rec);

}	
	
angular
 	.module('classApp')
//	.factory('ContentType', ['$firebaseObject', getCT ])
	.controller('EditContentTypeController',[ '_fbContentTypes', '$firebaseArray','$state','$stateParams', editContentType ] );	
	
	
	
	
	
})(); // eof