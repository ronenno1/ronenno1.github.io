define(['timeAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    var current = API.getCurrent();
    API.addSettings('rtl', true);

 	API.addCurrent({
        instructions: {


            end     : '<p>הניסוי הסתיים.</p>'+ 
                      '<p>תודה רבה על השתתפותך!</p>'+
                      '<p>הקש/י על מקש הרווח לסיום.</p>'+
                      '</font></div>'

        }
	}); 
    
    

    API.addSettings('canvas',{
        textSize         : 4,
        proportions      : 0.65,
        // css               :{color  : '#ffffff'},
        borderWidth      : 0
        // background       : '#808080',
        // canvasBackground : '#808080'	
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
    
    API.addTrialSets('welcome',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.welcome}}
        ]
    });


    API.addTrialSets('luminance',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.luminance}}
        ]
    });

    API.addTrialSets('depth',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.depth}}
        ]
    });


    API.addTrialSets('rest',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.rest}}
        ]
    });

    API.addTrialSets('rest_luminance',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.rest_luminance}}
        ]
    });

    API.addTrialSets('rest_depth',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.rest_depth}}
        ]
    });

    API.addTrialSets('start',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.start}}
        ]
    });




    API.addTrialSets('rest',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.rest}}
        ]
    });

    API.addTrialSets('end',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.end}}
        ]
    });
    API.addTrialSets('deb',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.deb}}
        ]
    });


    /***********************************************
    // Sequence
     ***********************************************/

	API.addSequence([
		{
		    inherit : {set:current.type }
		}
	]);	
	return API.script;
});
