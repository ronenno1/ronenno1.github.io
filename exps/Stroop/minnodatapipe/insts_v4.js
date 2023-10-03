define(['timeAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    var current = API.getCurrent();
    API.addSettings('rtl', true);

 	API.addCurrent({
        instructions: {
               welcome : '<div style="cursor:none;"><font size=5>'+
    
                            '<p>בחלק זה של הניסוי יופיע לפנייך מספרים.</p>'+
                            '<p>המטרה שלך היא להכריע מהר ככל הניתן מהו המספר (ספרה או טקסט) שמוצג על גבי המסך.</p></br>'+
                            
                            '<p>אם המספר הוא  <b>1</b>, יש להקיש על מקש <b>z</b> שבמקלדת באמצעות האמה השמאלית.</p>'+
                            '<p>אם המספר הוא  <b>2</b>, יש להקיש על מקש <b>x</b> שבמקלדת באמצעות האצבע השמאלית.</p>'+
                            '<p>אם המספר הוא  <b>3</b>, יש להקיש על מקש <b>n</b> שבמקלדת באמצעות האצבע הימנית.</p>'+
                            '<p>אם המספר הוא  <b>4</b>, יש להקיש על מקש <b>m</b> שבמקלדת באמצעות האמה הימנית.</p></br>'+
    
                        '<p style="font-weight: bold;">יש להסתכל למרכז המסך במהלך כל הניסוי.</p></br>'+
    
                        '<p>יש להניח את האצבעות על גבי המקשים כנדרש כעת.</p></br>'+
    
                        '<p>להמשך יש להקיש על מקש הרווח</p>'+
                        '</font></div>',
            rest     : '<div style="cursor:none;"><font size=5><p>הפסקה!</p> '+
                             '<p>להזכירך: המטרה שלך היא להכריע מהר ככל הניתן מהו הצבע בו כתובה המילה.</p></br>'+
                            
                             '<p>אם הצבע של המילה הוא  <span style="color:blue; font-weight: bold;"> כחול</span>, יש להקיש על מקש <b>z</b> שבמקלדת באמצעות האמה השמאלית.</p>'+
                             '<p>אם הצבע של המילה הוא  <span style="color: green; font-weight: bold;"> ירוק</span>, יש להקיש על מקש <b>x</b> שבמקלדת באמצעות האצבע השמאלית.</p>'+
                             '<p>אם הצבע של המילה הוא  <span style="color: yellow; font-weight: bold;"> צהוב</span>, יש להקיש על מקש <b>n</b> שבמקלדת באמצעות האצבע הימנית.</p>'+
                             '<p>אם הצבע של המילה הוא  <span style="color: red; font-weight: bold;"> אדום</span>, יש להקיש על מקש <b>m</b> שבמקלדת באמצעות האמה הימנית.</p></br>'+

                             '<p style="font-weight: bold;">יש להסתכל למרכז המסך במהלך כל הניסוי.</p></br>'+

                             '<p>יש להניח את האצבעות על גבי המקשים כנדרש כעת.</p></br>'+

                             '<p>להמשך יש להקיש על מקש הרווח</p></font></div>',
            deb     : '<p style="cursor:none;">חלק זה הסתיים.</p>'+ 
                            '<p>למעבר לשאלון סיום יש להקיש על מקש הרווח</p><div>',
                            
            bye     : '<p style="cursor:none;">הניסוי הסתיים.</p>'+ 
                            '<p>תודה רבה על השתתפותך</p><div>',

            luminance :  '<div>'+
                            '<p>Your task, at this part of the experiment, is to determine whether the central hexagon is brighter or darker than the hexagons surrounding it, by pressing twice on the chosen answer.</p></br>'+
                            
                            '<p>Note that the stimuli will appear for only a short time. </p></br>'+
                            
                            '<p>Please press the spacebar to continue</p><div>',
                            
                            
            
            depth :  '<div>'+
                            '<p>Your task, at this part of the experiment, is to determine whether the central hexagon is pushed in or out, by pressing twice on the chosen answer.</p></br>'+
                            
                            '<p>Note that the stimuli will appear for only a short time.</p></br>'+
                            
                            '<p>Please press the spacebar to continue</p><div>',


            rest_luminance    : '<div><p>Please take a few seconds break.</p></br>'+
            
                            '<p>Remember, your task is to determine whether the central hexagon is brighter or darker than the hexagons surrounding it, by double pressing the chosen answer.'+

                             '<p>Please press the spacebar to continue</p><div>',

            rest_depth      : '<div><p>Please take a few seconds break.</p></br>'+

                            '<p>Remember, your task is to determine whether the central hexagon is pushed in or pushed out, by double pressing the chosen answer.'+


                            '<p>Please press the spacebar to continue</p><div>'
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
                    // {type:'log'}, 
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
	        {media: {html: current.instructions.bye}}
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
