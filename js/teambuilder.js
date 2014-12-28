var teambuilder = function()
{
	this.view = $( '#view' );


	this.view.replaceWith( new Home().render().el );
}

$( document ).ready( teambuilder );
// document.addEventListener("deviceready", onDeviceReady, false);