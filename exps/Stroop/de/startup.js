define(['timeAPI'], function(APIconstructor) {
    console.log('test2');
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
                        // {type:'custom',fn: function(){console.log('test');}},

                        {type:'custom',fn: function(){global.startVideo(global);}},

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
