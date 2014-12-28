var Home = function()
{

	this.init = function()
	{
	}

	this.render = function()
	{
		var el = $( '<section id="view" class="home"/>' );
		var header = {
			title: 'Showdown Teambuilder',
			buttons: {
				left: $( '<button class="left disabled pull-left"/>' ).append( '<img src="img/icon.png">' ),
				right: $( '<button class="right pull-right"/>' ).append( '<div class="rotate-90">&squf;&squf;&squf;</div>' )
			}
		};
		el.append( Home.header( header ) );
		el.append( Home.team_list( new Team().list() ) );

		this.el = el;

		return this;
	}

	this.init();
}

Home.header = Handlebars.compile( $( '#header' ).html() );
Home.team_list = Handlebars.compile( $( '#team-list' ).html() );