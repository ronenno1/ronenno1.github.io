define(['timeAPI'], function(APIconstructor) {

	var API = new APIconstructor();
    var global  = API.getGlobal();

	// #### Create trial sequence
	API.addSequence([
		{
			input: [
            {handle:'end', on: 'timeout', duration: 0}
			],
			interactions: [
				{
					conditions: [
                {type:'custom',fn: function(){return true;}}
					],
					actions: [
                        {type:'custom',fn: function(){console.log('x');}},

                        {type:'custom',fn: function(){global.stopVideo(global);}},

                        {type:'log'}, 

						{type:'endTrial'}
					]
				}
			]
		}
	]);

	// #### Activate the player
	return API.script;
});
