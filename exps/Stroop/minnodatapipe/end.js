 define(['timeAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    var global  = API.getGlobal();
    var current = API.getCurrent();

 	API.addCurrent({
        instructions: {
            inst_bye     : `<p style="cursor:none;">הניסוי הסתיים</p> 
                            <p>תודה רבה על השתתפותך</p>`

        },
	}); 
    
    

    API.addSettings('canvas',{
        textSize         : 5,
        maxWidth         : 1200,
        proportions      : 0.65,
        borderWidth      : 0.4,
        background       : '#ffffff',
        canvasBackground : '#ffffff'	
    });

    API.addTrialSets('insts',{
        input: [ 
            {handle:'space',on:'space'} 
        ],
        interactions: [
            { 
                conditions: [{type:'inputEquals',value:'space'}], 
                actions: [
                    {type:'log'}, 
                    {type:'endTrial'}				
                ]
            }
        ]
    });
    
    

    API.addTrialSets('inst_bye',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.inst_bye}}
        ]
    });

    /***********************************************
    // Sequence
     ***********************************************/

	API.addSequence([
		{
		    inherit : {set:"inst_bye" }
		}
	]);	
	return API.script;
});