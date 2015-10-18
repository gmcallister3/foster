// $(document).ready(function() {
	
// 	//add listeners
// 	$('#donorButton').bind('click', handleDonorLogin());
// 	$('#shelterButton').bind('click', handleShelterLogin());
// 	$('#storeButton').bind('click', handleStoreLogin());
// });


// var handleDonorLogin = function() {
// 	location.href = "donateLogin.jade"
// }


$(document).ready(function() {
	
	//add listeners
	$('#donate').bind("click", function() {
		alert('binded');
		window.load('/dLogin');
	});

});