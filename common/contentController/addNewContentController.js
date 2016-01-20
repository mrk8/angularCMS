(function(){
	

/*********************************************
// Begin todoController
// Add Prodcut addProduct()
*********************************************/			
function addNewContent(_fbContent, $firebaseArray, $state ,$stateParams){
	
	this.contentType = $stateParams.machineName;
	this.contentTypeID = $stateParams.id;
	console.log(this.contentTypeID);
	var Content = _fbContent;
	this.addNewContent = function(ContentName){
		
		//alert(form);
		this.dateAdded = new Date().getTime();
		var mn = ContentName.toLowerCase().replace(/[ -_]/g,"-");;
		var add = {name: ContentName, machineName: mn, dateAdded: this.dateAdded, contentType: this.contentType, contentTypeID: this.contentTypeID  };
		Content.$add(add);
		ContentName = {};
		
		$state.go('admin.settings.content');
	}

}



angular
 	.module('classApp')
	
	.controller('AddNewContentController',[ '_fbContent', '$firebaseArray', '$state','$stateParams', addNewContent ] );

		
})(); // eof