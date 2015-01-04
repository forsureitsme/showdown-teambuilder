var Pokemon = function( team, index )
{
	this.data = false;

	this.init = function( team, index )
	{
		if ( index )
		{
			this.data = new Team( team ).data.pokemons[ index ];
			this.data.team = team;
			this.data.id = index;
		}
		else if ( team )
		{
			this.data = {
				nickname: '',
				species: '',
				gender: '',
				nature: '',
				ability: '',
				item: '',
				happiness: 255,
				shiny: false,
				moves: ['','','',''],
				ivs: [31,31,31,31,31,31],
				evs: [0,0,0,0,0,0],
			};
		}
	}

	this.init( team, index );
}