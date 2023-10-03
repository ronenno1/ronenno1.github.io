define(['timeAPI'], function(APIconstructor) {

    document.body.style.cursor='none';

    var API     = new APIconstructor();
    var global  = API.getGlobal();
    var current = API.getCurrent();

    var num_of_trials = 32;

    var answers = ['z', 'x', 'n', 'm'];
 	API.addCurrent({
 	    answers:answers,
        instructions: {
            inst_welcome : '<div><font size=5>'+

                            '<p>בחלק זה של הניסוי יופיע לפנייך צבעים.</p>'+
                            '<p>המטרה שלך היא להכריע מהר ככל הניתן מהו מספר הצבעים שמוצגים על גבי המסך.</p></br>'+
                            
                            '<p>אם מופיע רק  <b>צבע אחד </b>, יש להקיש על מקש <b>z</b> שבמקלדת באמצעות האמה השמאלית.</p>'+
                            '<p>אם מופיעים  <b>שני צבעים  </b>, יש להקיש על מקש <b>x</b> שבמקלדת באמצעות האצבע השמאלית.</p>'+
                            '<p>אם מופיעים  <b>שלושה צבעים  </b>, יש להקיש על מקש <b>n</b> שבמקלדת באמצעות האצבע הימנית.</p>'+
                            '<p>אם מופיעים  <b>ארבעה צבעים  </b>, יש להקיש על מקש <b>m</b> שבמקלדת באמצעות האמה הימנית.</p></br>'+

                            '<p style="font-weight: bold;">יש להסתכל למרכז המסך במהלך כל הניסוי.</p></br>'+

                            '<p>יש להניח את האצבעות על גבי המקשים כנדרש כעת.</p></br>'+

                            '<p>להמשך יש להקיש על מקש הרווח</p>'+
                            '</font></div>',
            inst_start   : '<div><font size=5>'+
                            '<p>האימון הסתיים.</p></br>'+

                            '<p>להזכירך: המטרה שלך היא להכריע מהר ככל הניתן מהו הצבע של המלבנים.</p></br>'+
                            
                            '<p>אם הצבע של המלבן הוא  <span style="color:blue; font-weight: bold;"> כחול</span>, יש להקיש על מקש <b>z</b> שבמקלדת באמצעות האמה השמאלית.</p>'+
                            '<p>אם הצבע של המלבן הוא  <span style="color: green; font-weight: bold;"> ירוק</span>, יש להקיש על מקש <b>x</b> שבמקלדת באמצעות האצבע השמאלית.</p>'+
                            '<p>אם הצבע של המלבן הוא  <span style="color: yellow; font-weight: bold;"> צהוב</span>, יש להקיש על מקש <b>n</b> שבמקלדת באמצעות האצבע הימנית.</p>'+
                            '<p>אם הצבע של המלבן הוא  <span style="color: red; font-weight: bold;"> אדום</span>, יש להקיש על מקש <b>m</b> שבמקלדת באמצעות האמה הימנית.</p></br>'+

                            '<p style="font-weight: bold;">יש להסתכל למרכז המסך במהלך כל הניסוי.</p></br>'+

                            '<p>.יש להניח את האצבעות על גבי המקשים כנדרש כעת</p></br>'+

                            '<p>להמשך יש להקיש על מקש הרווח</p>'+
                            '</font></div>',

            inst_bye     : '<p>חלק זה הסתיים</p>'+ 
                            '<p>להמשך יש להקיש על מקש הרווח</p>'

        },
        times: {
            fixation_duration : 500,
            stimulus_duration : 400,
            response_duration : 1100,
            feedback_duration : 500,
            iti_duration      : 1000
        },
        
        
        stimuli: {
            blue: 'stimuli/blue.png',
            green: 'stimuli/green.png',
            yellow: 'stimuli/yellow.png',
            red: 'stimuli/red.png'
        },

        
        minScore4exp    : 24,
        score           : 0
	}); 
    
    

    API.addSettings('canvas',{
        textSize         : 5,
        maxWidth         : 1200,
        proportions      : 0.65,
        borderWidth      : 0.4,
        background       : '#ffffff',
        canvasBackground : '#ffffff'	
    });

    API.addSettings('base_url',{
        image : global.baseURL
    });

    /***********************************************
    // Stimuli
     ***********************************************/

    API.addStimulusSets({
        defaultStim    : [{css:{color:'black', 'font-size':'100px'}}],
        fixation       : [{inherit:'defaultStim', media: '+'}],
        error          : [{inherit:'defaultStim', media: 'תשובה לא נכונה!'}],
        correct        : [{inherit:'defaultStim', media: 'תשובה נכונה!'}],
        timeoutmessage : [{inherit:'defaultStim', media: 'תשובה לא זוהתה!'}]
    });


    API.addStimulusSets({
        inst_welcome : [{media: {html: current.instructions.inst_welcome}}],
        inst_start   : [{media: {html: current.instructions.inst_start}}],
        inst_bye     : [{media: {html: current.instructions.inst_bye}}]
    });

    API.addTrialSets('endOfPractice',{
        input: [ 
			{handle:'end', on: 'timeout', duration: 0}
        ],
        interactions: [
            {
                conditions: [
                    {type:'custom',fn: function(){return global.current.score < global.current.minScore4exp;}}
                ],
                actions: [
                    {type:'custom',fn: function(){global.current.score=0;}},
                    {type:'goto',destination: 'previousWhere', properties: {practice:true}},
                    {type:'endTrial'}				
                ]
            },  
            {
                conditions: [ 
                    {type:'custom',fn: function(){return global.current.score >= global.current.minScore4exp;}}
                ],
                actions: [
                    {type:'custom',fn: function(){global.current.score=0;}},
                    {type:'goto',destination: 'nextWhere', properties: {exp:true}},
                    {type:'endTrial'}				
                ]
            }
        ]
    });


API.addTrialSets('startPractice',{
    input: [
        {handle:'end', on: 'timeout', duration: 0}
    ],
    interactions: [
        {
            conditions: [
                {type:'custom',fn: function(){return true;}}
            ],
            actions: [
                {type:'endTrial'}                
            ]
        }
    ]
});


    /***********************************************
    // INSTRUCTIONS TRIAL
     ***********************************************/    



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
    
    
    API.addTrialSets('inst_welcome',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.inst_welcome}}
        ]
    });

    API.addTrialSets('inst_start',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.inst_start}}
        ]
    });

    API.addTrialSets('inst_bye',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.inst_bye}}
        ]
    });

    /***********************************************
    // Main trials
     ***********************************************/

    API.addTrialSets('main',[{ 
        data: {score:0},
        interactions: [
            { 
                conditions: [{type:'begin'}],
                actions: [
                    {type:'showStim', handle:'fixation'},
                    {type:'trigger', handle:'showTarget', duration: '<%= global.current.times.fixation_duration %>'}
                ]
            }, 

            {
                conditions:[{type:'inputEquals',value:'showTarget'}],
                actions: [
                    {type:'hideStim', handle:'fixation'}, 
				    {type:'setInput', input:{handle:current.answers[0], on: 'keypressed', key: current.answers[0]}},
				    {type:'setInput', input:{handle:current.answers[1], on: 'keypressed', key: current.answers[1]}},
				    {type:'setInput', input:{handle:current.answers[2], on: 'keypressed', key: current.answers[2]}},
				    {type:'setInput', input:{handle:current.answers[3], on: 'keypressed', key: current.answers[3]}},
				    {type:'showStim', handle: 'target'},
                    {type:'resetTimer'},
                    {type:'trigger',handle:'targetOut', duration: '<%= global.current.times.stimulus_duration %>'}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:'targetOut'}], 
                actions: [
                    {type:'hideStim', handle:'target'}, 
                    {type:'trigger', handle:'timeout', duration: '<%= global.current.times.response_duration %>'}
                ]
            }, 	

            { 
                conditions: [{type:'inputEqualsStim', property:'correct'}], 
                actions: [
                    {type:'removeInput',handle:['All']},
                    {type:'setTrialAttr', setter:{score:1}},
                    {type:'log'},
                    {type:'custom',fn: function(){global.current.score++;}},
                    {type:'hideStim', handle:['All']},
                    {type:'trigger', handle:'ITI'}
                ]
            }, 
            {
                conditions: [
                    {type:'inputEqualsStim', property:'correct'}, 
                    {type:'trialEquals', property:'block', value:'practice'}
                ],
                actions: [
                    {type:'showStim', handle:'correct'},
                    {type:'trigger', handle:'clean',duration: '<%= global.current.times.feedback_duration %>'}
                ]
            }, 
            {
                conditions: [
                    {type:'inputEquals', value:current.answers}, 
                    {type:'inputEqualsStim', property:'correct', negate:true}
                ],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:0}},
                    {type:'log'},
                    {type:'hideStim', handle:['All']},
                    {type:'trigger', handle:'ITI'}
                ]
            }, 
            {
                conditions: [
                    {type:'inputEquals', value:current.answers}, 
                    {type:'inputEqualsStim', property:'correct', negate:true},
                    {type:'trialEquals', property:'block', value:'practice'}
                ],
                actions: [
                    {type:'showStim', handle:'error'},
                    {type:'trigger', handle:'clean',duration: '<%= global.current.times.feedback_duration %>'}

                ]
            }, 
            {
                conditions: [
                    {type:'inputEquals',value:'timeout'}],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:-1}},
                    {type:'log'},					
                    {type:'trigger', handle:'ITI'}
                ]
            }, 
            {
                conditions: [
                    {type:'inputEquals',value:'timeout'}, 
                    {type:'trialEquals', property:'block', value:'practice'}
                ],
                actions: [
                    {type:'showStim', handle:'timeoutmessage'},
                    {type:'trigger', handle:'clean',duration: '<%= global.current.times.feedback_duration %>'}
                ]
            }, 
            {
                conditions: [{type:'inputEquals', value:'clean'}],
                actions:[
                    {type:'hideStim', handle:['All']}
                ]
            },

            {
                conditions: [{type:'inputEquals', value:'ITI'}],
                actions:[
                    {type:'removeInput', handle:['All']},
                    {type:'trigger', handle:'end', duration:'<%= trialData.block==="practice" ? global.current.times.feedback_duration+global.current.times.iti_duration : global.current.times.iti_duration %>'}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:'end'}],
                actions: [{type:'endTrial'}]
            }
        ],
        stimuli : [
            {inherit:'error'},
            {inherit:'correct'},
            {inherit:'timeoutmessage'},
            {inherit:'fixation'}
        ]
    }]);

    /***********************************************
    // Specific color trials
     ***********************************************/

    API.addTrialSet('stimulus_trial', {
        inherit: {set:'main', merge:['stimuli']},
        stimuli: [
            { media: {image:'<%= trialData.image %>'}, handle:'target', data:{correct:'<%= trialData.correct %>'}}
        ]
    });
    
    
    API.addTrialSet('rectangle', [
        {inherit: 'stimulus_trial', data: {image: current.stimuli.blue, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: {image: current.stimuli.green, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: {image: current.stimuli.yellow, correct:current.answers[2]}},
        {inherit: 'stimulus_trial', data: {image: current.stimuli.red, correct:current.answers[3]}}


    ]);
    
    
    /***********************************************
    // Sequence
     ***********************************************/

	API.addSequence([
	    {
		    inherit : {set:"inst_welcome"}
	    },
	    {
    		data: {practice:true},
		    inherit : {set:"startPractice"}
	    },

	    {
			mixer: 'random',
			data: [
				{   
					mixer: 'repeat',
					times: num_of_trials,
					data: [
                        {inherit:{set:'rectangle', type:'equalDistribution', n: num_of_trials, seed: 'rectangle'}, data:{block: 'practice'}}
					]
				}
			]
		},
		
		{
		    inherit: {set:"endOfPractice"}
		},
		{
    	    data: {exp:true},
		    inherit : {set:"inst_bye" }
		}
	]);	
	return API.script;
});
