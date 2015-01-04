var Nature = function( id )
{
	this.list = [
		[ 'Adamant', 1 , 2 ],
		[ 'Bashful', 1 , 2 ],
		[ 'Bold', 1 , 2 ],
		[ 'Brave', 1 , 2 ],
		[ 'Calm', 1 , 2 ],
		[ 'Careful', 1 , 2 ],
		[ 'Docile', 1 , 2 ],
		[ 'Gentle', 1 , 2 ],
		[ 'Hardy', 1 , 2 ],
		[ 'Hasty', 1 , 2 ],
		[ 'Impish', 1 , 2 ],
		[ 'Jolly', 1 , 2 ],
		[ 'Lax', 1 , 2 ],
		[ 'Lonely', 1 , 2 ],
		[ 'Mild', 1 , 2 ],
		[ 'Modest', 1 , 2 ],
		[ 'Naive', 1 , 2 ],
		[ 'Naughty', 1 , 2 ],
		[ 'Quiet', 1 , 2 ],
		[ 'Quirky', 1 , 2 ],
		[ 'Rash', 1 , 2 ],
		[ 'Relaxed', 1 , 2 ],
		[ 'Sassy', 1 , 2 ],
		[ 'Serious', 1 , 2 ],
		[ 'Timid', 1 , 2 ],
	];

	this.init = function( id )
	{
		if ( !isNaN( id ) && id > -1 && id <= this.list.length )
		{
			this.id = id;
			this.name = this.list[ this.id ][0];
			this.powers = this.list[ this.id ][1];
			this.hinders = this.list[ this.id ][2];
		}
		else
		{
			this.id = false;
		}
	}

	this.from_name = function( name )
	{
		var index = -1;
		$.each(
			this.list,
			function( i, nature )
			{
		  		if ( nature[0].toLowerCase() == name.toLowerCase() )
		  		{
		  			index = i;
				    return false;
				}
			}
		);

		if ( index > -1 )
		{
			this.id = index;
			this.name = this.list[ this.id ][0];
			this.powers = this.list[ this.id ][1];
			this.hinders = this.list[ this.id ][2];
		}
		else
		{
			this.id = false;
		}

		return this;
	}

	this.init( id );
}