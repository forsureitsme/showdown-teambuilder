var teambuilder = {
	templates: {
		home: Handlebars.compile( $( '#tpl-home' ).html() ),
		team: Handlebars.compile( $( '#tpl-team' ).html() ),
		pokemon: Handlebars.compile( $( '#tpl-pokemon' ).html() ),
	},

	debug: true,
	reset: true,

	init: function()
	{
		teambuilder.log( 'teambuilder.init' );

		if ( teambuilder.reset )
		{
			localStorage.teams = JSON.stringify([{
			    name: 'Foo',
			    tier: 'ou',
			    pokemons: [{
			    	nickname: '',
			        species: "landorustherian",
			        gender: 'M',
			        item: 'leftovers',
			        ability: 0,
			        ivs: [31,31,31,31,31,31],
			        happiness: 255,
					shiny: false,
			        evs: [252, 4, 252, 0, 0, 0],
			        nature: 0,
			        moves: ['swordsdance', 'substitute', 'rocktomb', 'earthquake']
			    }, {
			    	nickname: '',
			        species: "sceptile",
			        gender: 'M',
			        item: 'sceptilite',
			        ability: 0,
			        ivs: [31,31,31,31,31,31],
			        happiness: 255,
					shiny: false,
			        evs: [252, 4, 252, 0, 0, 0],
			        nature: 11,
			        moves: ['swordsdance', 'substitute', 'rocktomb', 'earthquake']
			    }, {
			    	nickname: '',
			        species: "landorustherian",
			        gender: 'M',
			        item: 'leftovers',
			        ability: 0,
			        ivs: [31,31,31,31,31,31],
			        happiness: 255,
					shiny: false,
			        evs: [252, 4, 252, 0, 0, 0],
			        nature: 0,
			        moves: ['swordsdance', 'substitute', 'rocktomb', 'earthquake']
			    }, {
			    	nickname: '',
			        species: "sceptile",
			        gender: 'M',
			        item: 'sceptilite',
			        ability: 0,
			        ivs: [31,31,31,31,31,31],
			        happiness: 255,
					shiny: false,
			        evs: [252, 4, 252, 0, 0, 0],
			        nature: 11,
			        moves: ['swordsdance', 'substitute', 'rocktomb', 'earthquake']
			    }, {
			    	nickname: '',
			        species: "landorustherian",
			        gender: 'M',
			        item: 'leftovers',
			        ability: 0,
			        ivs: [31,31,31,31,31,31],
			        happiness: 255,
					shiny: false,
			        evs: [252, 4, 252, 0, 0, 0],
			        nature: 0,
			        moves: ['swordsdance', 'substitute', 'rocktomb', 'earthquake']
			    }, {
			    	nickname: '',
			        species: "sceptile",
			        gender: 'M',
			        item: 'sceptilite',
			        ability: 0,
			        ivs: [31,31,31,31,31,31],
			        happiness: 255,
					shiny: false,
			        evs: [252, 4, 252, 0, 0, 0],
			        nature: 11,
			        moves: ['swordsdance', 'substitute', 'rocktomb', 'earthquake']
			    }]
			}, {
			    name: 'STUPID LONG TEAM NAME YOU SHOULDN\'T USE TO FUCK UP THE LIST',
			    tier: 'ubers',
			    pokemons: [{
			    	nickname: '',
			        species: "landorustherian",
			        gender: 'M',
			        item: 'leftovers',
			        ability: 0,
			        ivs: [31,31,31,31,31,31],
			        happiness: 255,
					shiny: false,
			        evs: [252, 4, 252, 0, 0, 0],
			        nature: 11,
			        moves: ['swordsdance', 'substitute', 'rocktomb', 'earthquake']
			    }, {
			    	nickname: '',
			        species: "sceptile",
			        gender: 'M',
			        item: 'sceptilite',
			        ability: 0,
			        ivs: [31,31,31,31,31,31],
			        happiness: 255,
					shiny: false,
			        evs: [252, 4, 252, 0, 0, 0],
			        nature: 11,
			        moves: ['swordsdance', 'substitute', 'rocktomb', 'earthquake']
			    }]
			}]);
		};

		//jqm
		$.mobile.defaultPageTransition = 'pop';
		$.event.special.swipe.scrollSupressionThreshold = -1;
		$.event.special.swipe.horizontalDistanceThreshold = 99999;
		$.vmouse.moveDistanceThreshold = 50;

		teambuilder.binds();
		teambuilder.blockhelpers();

		teambuilder.home.init();
		teambuilder.team.init();

		teambuilder.load();
	},

	blockhelpers: function()
	{
		Handlebars.registerHelper(
			'compare',
			function ( arg1, operator, arg2, options )
			{
				switch ( operator )
				{
					case '==':
						return ( arg1 == arg2 ) ? options.fn( this ) : options.inverse( this );
					case '!=':
						return ( arg1 != arg2 ) ? options.fn( this ) : options.inverse( this );
					case '<':
						return ( arg1 < arg2 ) ? options.fn( this ) : options.inverse( this );
					case '<=':
						return ( arg1 <= arg2 ) ? options.fn( this ) : options.inverse( this );
					case '>':
						return ( arg1 > arg2 ) ? options.fn( this ) : options.inverse( this );
					case '>=':
						return ( arg1 >= arg2 ) ? options.fn( this ) : options.inverse( this );
					case '&&':
						return ( arg1 && arg2 ) ? options.fn( this ) : options.inverse( this );
					case '||':
						return ( arg1 || arg2 ) ? options.fn( this ) : options.inverse( this );
					default:
						return options.inverse(this);
				}
			}
		);
	},

	load: function()
	{
		teambuilder.log( 'teambuilder.load' );

		$( 'body' ).pagecontainer();
		$( 'body' ).trigger( 'pagecontainerbeforetransition', { toPage: $( '.ui-page-active' ).first() } );
	},

	log: function( arg )
	{
		if ( teambuilder.debug )
		{
			console.log( arg );
		};
	},

	binds: function()
	{
		teambuilder.log( 'teambuilder.binds' );

		$( document ).on
		(
			'vclick',
			'[href="#"]',
			function( event )
			{
				event.preventDefault();
			}
		).on
		(
			'hover focus',
			'*',
			function( event )
			{
				event.preventDefault();
				return false;
			}
		);

		$( 'body' ).bind(
			'pagecontainerbeforetransition',
			function( event, ui )
			{
				// teambuilder.log( event );
				// teambuilder.log( ui );
				switch( ui.toPage.attr( 'id' ) )
				{
					case 'home':
						teambuilder.home.load();
					break;

					case 'team':
					case 'pokemon':
						var params = teambuilder.utils.serial2obj( $.mobile.path.parseUrl( ui.absUrl ).hash.split( '?' )[1] );
						teambuilder[ ui.toPage.attr( 'id' ) ].load( params );
					break;
				}
			}
		);
	},


	home: {
		init: function()
		{
			teambuilder.log( 'teambuilder.home.init' );
		},

		load: function()
		{
			teambuilder.log( 'teambuilder.home.load' );

			$( '#home [data-role="content"]' ).html( teambuilder.templates.home( new Team().list_parsed ) ).enhanceWithin();
			teambuilder.home.binds();
		},

		binds: function()
		{
			teambuilder.log( 'teambuilder.home.binds' );

			teambuilder.home.draggable_panel();

			$( '#home-left-panel' ).unbind( '.home-pbo .home-pbc' )
			.bind
			(
				'panelbeforeopen.home-pbo panelbeforeclose.home-pbc',
				function( event )
				{
					$( this ).panel( 'option', 'disabled', true );
				}
			);
			$( '#home-left-panel' ).unbind( '.home-pc .home-po' )
			.bind
			(
				'panelclose.home-pc panelopen.home-po',
				function()
				{
					$( this ).panel( 'option', 'disabled', false );
				}
			);
			$( '#home-search-toggle' ).unbind( '.search-toggle' )
			.bind
			(
				'vclick.search-toggle',
				function()
				{
					teambuilder.log( 'teambuilder.home.toggle-search' );

					$( '#home [data-role="content"] .ui-filterable' ).slideToggle
					(
						'fast',
						function()
						{
							if ( !$( this ).is( ':hidden' ) )
							{
								$( this ).find( 'input' ).focus();
							}
							else
							{
								$( this ).find( 'input' ).val( '' );
								$( this ).next( '.ui-listview' ).listview( 'refresh' );
							}
						}
					);
				}
			);
		},


		draggable_panel: function()
		{
			teambuilder.log( 'teambuilder.home.draggable_panel' );

			$( '#home [data-role="content"]' ).unbind( '.paneldrag' )
			.bind(
				'vmousedown.paneldrag',
				function( event )
				{
					$( this ).prop( 'moved_panel', false );
					if ( $.mobile.activePage.jqmData( 'panel' ) !== 'open' && event.pageX < $.vmouse.moveDistanceThreshold )
					{
						event.preventDefault();
						$( '#home-left-panel' ).removeClass( 'ui-panel-closed' );
						startx = event.pageX;

						$( '#home [data-role="content"]' ).bind
						(
							'vmousemove.panelmove',
							function( event )
							{
								$( this ).prop( 'moved_panel', true );
								$( '#home-left-panel' ).css( 'transform', 'translateX( ' + Math.min( Math.floor( -289 + ( event.pageX - startx ) / 1.5 ), 0 ) + 'px )' ).css( 'transition', 'all 0s' );
							}
						)
					}
				}
			);

			$( '#home [data-role="content"]' ).unbind( '.paneldrop' )
			.bind
			(
				'vmouseup.paneldrop',
				function( event )
				{
					$( '#home [data-role="content"]' ).unbind( '.panelmove' );
					if ( $( this ).prop( 'moved_panel' ) )
					{
						if( event.pageX > startx + $.vmouse.moveDistanceThreshold )
						{
							$( '#home-left-panel' ).css( 'transform', '' ).css( 'transition', '' ).panel( 'open' );
						}
						else
						{
							$( '#home-left-panel' ).css( 'transform', '' ).css( 'transition', '' ).panel( 'close' );
						}
					}
				}
			);
		},
	},

	team: {
		init: function()
		{
			teambuilder.log( 'teambuilder.team.init' );
		},

		load: function( params )
		{
			teambuilder.log( 'teambuilder.team.load' );

			var team_data = new Team( params.id ).data;
			$( '#team [data-role="content"]' ).html( teambuilder.templates.team( team_data ) ).enhanceWithin();
			$( '#team select[name="team-tier"]' ).selectmenu( 'refresh' );

			teambuilder.team.binds();
		},

		binds: function()
		{
			teambuilder.log( 'teambuilder.team.binds' );

			$( '#team [data-role="content"] input[name="team-name"]' ).unbind( '.save' )
			.bind(
				'change.save',
				function()
				{
					teambuilder.log( 'team.binds.team-name:change.save' );

					var team_id = $( this ).closest( '[data-role="listview"]' ).attr( 'data-team-id' );
					var team = new Team( team_id );
					team.data.name = $( this ).val();
					team.save();
				}
			);

			$( '#team [data-role="content"] select[name="team-tier"]' ).unbind( '.save' )
			.bind(
				'change.save',
				function()
				{
					teambuilder.log( 'team.binds.team-tier:change.save' );

					var team_id = $( this ).closest( '[data-role="listview"]' ).attr( 'data-team-id' );
					var team = new Team( team_id );
					team.data.tier = $( this ).val();
					team.save();
				}
			);
		},
	},

	pokemon: {
		swiper: undefined,

		init: function()
		{
			teambuilder.log( 'teambuilder.pokemon.init' );
		},

		load: function( params )
		{
			teambuilder.log( 'teambuilder.pokemon.load' );

			var pokemon_data = new Pokemon( params.team, params.index ).data;
			$( '#pokemon [data-role="content"]' ).html( teambuilder.templates.pokemon( pokemon_data ) ).enhanceWithin();
			$( '#pokemon [data-role="header"] a' ).attr( 'href', '#team?id=' + params.team );

			if ( teambuilder.pokemon.swiper )
			{
				teambuilder.pokemon.swiper.destroy( true );
			};
			setTimeout
			(
				function()
				{
					teambuilder.pokemon.swiper = $( '#pokemon .swiper-container' ).swiper
					(
						{
							mode: 'horizontal',
							loop: false,
							preventLinksPropagation: true,
							noSwiping: true,
						}
					);

					// Removing swipe from slider so people can swipe the slider without swiping the page
					$( '#pokemon [data-role="content"] .ui-slider *' ).addClass( 'swiper-no-swiping' );
					teambuilder.pokemon.binds();
				}, 200 //Hah! You need to finish stack first, uh?
			);


		},

		binds: function()
		{
			teambuilder.log( 'teambuilder.pokemon.binds' );

			$( '#pokemon [data-role="navbar"] a' ).unbind( '.nav-swipe' )
			.bind(
				'vclick.nav-swipe',
				function()
				{
					var slide_index = $( this ).closest( 'li' ).index();
					teambuilder.log( 'nav-swipe: ' + slide_index );
					teambuilder.pokemon.swiper.swipeTo( slide_index );
				}
			);
		},
	},

	utils: {
		serial2obj: function( serial )
		{
			if ( $.type( serial ) == 'string' )
			{
				obj = {};
				serial.split( '&' ).forEach
				(
					function( v )
					{
						obj[ v.split( '=' )[0] ] = v.split( '=' )[1] ;
					}
				);
				return obj;
			}
			else
			{
				return {};
			}
		},
	},
}

$( document ).ready( teambuilder.init );
// document.addEventListener("deviceready", onDeviceReady, false);
