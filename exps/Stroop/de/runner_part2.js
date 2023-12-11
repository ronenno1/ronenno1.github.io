define(['managerAPI'], function(Manager){

	var API    = new Manager();


        

    
	API.addTasksSet(
	{

	
		debriefing : [{
			type: 'quest', piTemplate: true, name: 'debriefing', scriptUrl: 'debriefing.js' 

		}],

		end :
		[{
			type: 'time', name: 'end', scriptUrl: 'insts_v4.js?v=end', current: {type:'end'}
		}]

	});

    //define the sequence of the study
    API.addSequence([

        {inherit: 'debriefing'},
        {inherit: 'end'}
	]);
	
	return API.script;
});
