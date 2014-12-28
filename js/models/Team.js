var Team = function()
{
	this.init = function()
	{
		localStorage.teams = JSON.stringify([
			{
				name: 'Foo',
				tier: 'OU',
				pokemons: [
					{
						species: "landorus-therian",
						gender: 'm',
						item: 234,
						ability: 0,
						evs: [252,4,252,0,0,0],
						nature: 11,
						moves: [317,89,14,164]
					},
					{
						species: "sceptile",
						gender: 'm',
						item: 234,
						ability: 0,
						evs: [252,4,252,0,0,0],
						nature: 11,
						moves: [317,89,14,164]
					}
				]
			}
		]);
	}

	this.list = function()
	{
		return { teams: this.parse( localStorage.teams ) };
	}

	this.parse = function()
	{
		var teams = JSON.parse( localStorage.teams );
		teams.forEach
		(
			function( team, i )
			{
				team.pokemons.forEach
				(
					function( pokemon, j )
					{
						teams[ i ].pokemons[ j ].species = teams[ i ].pokemons[ j ].species.toLowerCase();
						$.each
						(
							exports.BattlePokedex,
							function()
							{
								if ( this.species.toLowerCase() == teams[ i ].pokemons[ j ].species.toLowerCase() )
								{
									teams[ i ].pokemons[ j ].ability = this.abilities[ teams[ i ].pokemons[ j ].ability ];
									return false;
								};
							}
						);
					}
				);
			}
		);
		return teams;
	}

	this.init();
}