var Nature = function( q )
{
	this.list = [
		'Adamant',
		'Bashful',
		'Bold',
		'Brave',
		'Calm',
		'Careful',
		'Docile',
		'Gentle',
		'Hardy',
		'Hasty',
		'Impish',
		'Jolly',
		'Lax',
		'Lonely',
		'Mild',
		'Modest',
		'Naive',
		'Naughty',
		'Quiet',
		'Quirky',
		'Rash',
		'Relaxed',
		'Sassy',
		'Serious',
		'Timid'
	];

	this.init = function( q )
	{
		if ( typeof q === 'undefined' )
		{
			return this.list;
		}
		else if ( typeof q === 'string' )
		{
			var id = this.get_id( q );
			if ( id )
			{
				this.id = id;
				this.name = this.get_name( id );
			};
		}
		else
		{
			var name = this.get_name( q );
			if ( name )
			{
				this.id = q;
				this.name = name;
			};
		}
	}

	this.get_name = function( id )
	{
		return this.list[ id ] === undefined ? false : this.list[ id ];
	}

	this.get_id = function( name )
	{
		var index = -1;
		$.each(
			this.list,
			function( i, nature )
			{
		  		if ( nature.toLowerCase() == name.toLowerCase() )
		  		{
		  			index = i;
				    return false;
				}
			}
		);

		return index > -1 ? index : false;
	}

	this.init( q );
}