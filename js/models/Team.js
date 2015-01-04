var Team = function( id )
{
	this.data = false;

	this.init = function( id )
	{
		this.list = JSON.parse( localStorage.teams );
		this.list_parsed = this.parse( JSON.parse( localStorage.teams ) );

		if ( !isNaN( id ) && this.list_parsed[ id ] )
		{
			this.data = this.list_parsed[ id ];
			this.data.id = id;
		}
		else
		{
			this.data = {
				id: this.list.length,
				name: '',
				tier: 'none',
				pokemons: []
			};
		}
	}

	this.parse = function( teams )
	{
		teams.forEach
		(
			function( team, i )
			{
				team.pokemons.forEach
				(
					function( pokemon, j )
					{
						teams[ i ].pokemons[ j ].nature = new Nature( pokemon.nature ).name;
						teams[ i ].pokemons[ j ].ability = exports.BattlePokedex[ pokemon.species ].abilities[ pokemon.ability ];
						pokemon.moves.forEach
						(
							function( move, k )
							{
								teams[ i ].pokemons[ j ].moves[ k ] = exports.BattleMovedex[ move ].name;
							}
						);

						if ( exports.BattleItems[ pokemon.item ].megaEvolves && exports.BattleItems[ pokemon.item ].megaEvolves.toLowerCase() == pokemon.species.toLowerCase() )
						{
							teams[ i ].pokemons[ j ].sprite_name = exports.BattleItems[ pokemon.item ].megaStone.toLowerCase();
						}
						else
						{
							teams[ i ].pokemons[ j ].sprite_name = exports.BattlePokedex[ pokemon.species ].species;
						}

						teams[ i ].pokemons[ j ].item = exports.BattleItems[ pokemon.item ].name;
						teams[ i ].pokemons[ j ].species = exports.BattlePokedex[ pokemon.species ].species;
					}
				);
			}
		);
		return teams;
	}

	this.unparse = function( team )
	{
		if ( team.pokemons )
		{
			team.pokemons.forEach
			(
				function( pokemon, i )
				{
					// Unparse Nature
					team.pokemons[ i ].nature = new Nature().from_name( pokemon.nature ).id;

					var dexmon = {};
					$.each( exports.BattlePokedex,
						function( species )
						{
							if ( this.species == pokemon.species )
							{
								// Unparse Name
								team.pokemons[ i ].species = species;

								// Set pokemon for the following unparses
								dexmon = this;
							};
						}
					);

					// Unparse Ability
					$.each( dexmon.abilities,
						function( ability )
						{
							if ( this == pokemon.ability )
							{
								team.pokemons[ i ].ability = ability;
							};
						}
					);

					// Unparse Item
					$.each( exports.BattleItems,
						function( item )
						{
							if ( this.name == pokemon.item )
							{
								team.pokemons[ i ].item = item;
							};
						}
					);

					// Unparse Moves
					$.each( exports.BattleMovedex,
						function( move )
						{
							var index = pokemon.moves.indexOf( this.name );
							if ( index > -1 )
							{
								team.pokemons[ i ].moves[ index ] = move;
							};
						}
					);

				}
			);
			return team;
		};
	}

	this.save = function()
	{
		var id = this.data.id;

		// remove unecessary data when saving
		this.data.id = undefined;
		this.data.sprite_name = undefined;
		//

		this.list[ id ] = this.unparse( this.data );
		localStorage.teams = JSON.stringify( this.list );

		// restore id for following saves
		this.data.id = id;
	}

	this.init( id );
}