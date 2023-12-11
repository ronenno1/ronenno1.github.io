define(['timeAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    var current = API.getCurrent();
    API.addSettings('rtl', true);

 	API.addCurrent({
        instructions: {
               welcome : '<div style="cursor:none;"><font size=5>'+
    
                            '<p>In diesem Teil des Experimentes sehen Sie Farben.</p>'+
                            '<p>Ihre Aufgabe ist es, so schnell wie möglich zu entscheiden, wie viele Farben dargestellt werden.</br></p>'+

                            '<p>Wenn Sie  <b>eine Farbe</b> erkennen, drücken Sie bitte die <b>Y-Taste  </b></p>'+
                            '<p>Wenn Sie  <b>zwei Farben</b> erkennen, drücken Sie bitte die <b>X-Taste </b></p>'+
                            '<p>Wenn Sie  <b>drei Farben</b> erkennen, drücken Sie bitte die <b>N-Taste </b></p>'+
                            '<p>Wenn Sie  <b>vier Farben</b> erkennen, drücken Sie bitte die <b>M-Taste </b></p></br>'+

                            '<p style="font-weight: bold;">Bitte schauen Sie während der Dauer des gesamten Experiments auf die Mitte des Bildschirms.</p></br>'+

                            '<p>Legen Sie die Finger nun auf die Tasten Z, X, N, und M.</p>'+

                            '<p>Drücken Sie die Leertaste, um zu beginnen.</p>'+
                        '</font></div>',
            deb     : '<div><font size=4>'+
                      '<p>Dieser Teil des Experiments ist nun zu Ende.</p>'+ 
                      '<p>Bitte drücken Sie die Leertaste, um den kurzen Fragebogen zu beantworten.</p>'+
                      '</font></div>',

            end     : '<p>Das Experiment ist nun zu Ende.</p>'+ 
                      '<p>Vielen Dank für Ihre Teilnahme!</p>'+
                      '<p>Drücken Sie die Leertaste, um das Experiment zu beenden.</p>'+
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
