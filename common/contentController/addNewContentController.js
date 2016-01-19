(function(){
	

/*********************************************
// Begin todoController
// Add Prodcut addProduct()
*********************************************/			
function addNewContent(_fbContent, $firebaseArray, $state ,$stateParams){
	
	this.zzz = $stateParams.machineName;
	console.log(this.zzz);
	var Content = _fbContent;
	this.addNewContent = function(form){
		
		//alert(form);
		this.dateAdded = new Date().getTime();
		var mn = form.toLowerCase().replace(/[ -_]/g,"-");;
		var add = {name:form, machineName:mn, dateAdded:this.dateAdded};
		Content.$add(add);
		form = {};
		
		$state.go('admin.settings.content');
	}

}



angular
 	.module('classApp')
	
	.controller('AddNewContentController',[ '_fbContent', '$firebaseArray', '$state','$stateParams', addNewContent ] );

		
})(); // eof