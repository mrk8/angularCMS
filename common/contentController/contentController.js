(function(){
	
/*********************************************
// Begin Firebase factory
*********************************************/	
function getCTs($firebaseArray){	
	var ctObj  = new Firebase("https://glowing-fire-9878.firebaseio.com/br_com/a/config/contentTypes");
	return  $firebaseArray(ctObj);	
	
}// end getCTs.
	
/*********************************************
// Begin Firebase factory to get content
*********************************************/	
function getContent($firebaseArray){	
	var contentObj  = new Firebase("https://glowing-fire-9878.firebaseio.com/br_com/a/config/content");
	return  $firebaseArray(contentObj);	
	
}// end getCTs.
		
	
/*********************************************
// Begin todoController
// Add Prodcut addProduct()
*********************************************/			
function addContentType(_fbContentTypes, _fbContent, $firebaseArray, $state){
	var ContentTypes = _fbContentTypes;
	var Content = _fbContent;
	this.addNewCT = function(form){
		this.dateAdded = new Date().getTime();
		var mn = form.toLowerCase().replace(/[ -_]/g,"-");;
		var add = {name:form, machineName:mn, dateAdded:this.dateAdded};
		ContentTypes.$add(add);
		form = {};
		
		$state.go('admin.settings.contentTypes');
	}

	
	
	

}



angular
 	.module('classApp')
	.factory('_fbContentTypes', ['$firebaseArray', getCTs ])
	.factory('_fbContent', ['$firebaseArray', getContent ])
	.controller('AddContentTypeController',[ '_fbContentTypes', '_fbContent', '$firebaseArray', '$state', addContentType ] );

		
})(); // eof