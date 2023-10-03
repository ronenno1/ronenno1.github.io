define(['timeAPI'], function(APIconstructor) {

    document.body.style.cursor='none';

    var API     = new APIconstructor();
    var global  = API.getGlobal();
    var current = API.getCurrent();
    var image_url = 'https://psych-studies.com/users/rhershman/dataPipe-62/v1/digits/';
    var answers = ['z', 'x', 'n', 'm'];
 	API.addCurrent({
 	    answers:answers,
        instructions: {
            inst_welcome : '<div><font size=5>'+

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

            inst_bye     : '<p>חלק זה הסתיים</p> '+
                            '<p>להמשך יש להקיש על מקש הרווח</p>',
            inst_start   : '<div><font size=5>'+
                            '<p>האימון הסתיים.</p></br>'+

                            '<p>להזכירך: המטרה שלך היא להכריע מהר ככל הניתן מהו המספר (ספרה או טקסט) שמוצג על גבי המסך.</p></br>'+
                            
                            '<p>אם המספר הוא  <b>1</b>, יש להקיש על מקש <b>z</b> שבמקלדת באמצעות האמה השמאלית.</p>'+
                            '<p>אם המספר הוא  <b>2</b>, יש להקיש על מקש <b>x</b> שבמקלדת באמצעות האצבע השמאלית.</p>'+
                            '<p>אם המספר הוא  <b>3</b>, יש להקיש על מקש <b>n</b> שבמקלדת באמצעות האצבע הימנית.</p>'+
                            '<p>אם המספר הוא  <b>4</b>, יש להקיש על מקש <b>m</b> שבמקלדת באמצעות האמה הימנית.</p></br>'+

                            '<p style="font-weight: bold;">יש להסתכל למרכז המסך במהלך כל הניסוי.</p></br>'+

                            '<p>יש להניח את האצבעות על גבי המקשים כנדרש כעת.</p></br>'+

                            '<p>להמשך יש להקיש על מקש הרווח</p>'+
                            '</font></div>',

            
            inst_startPracticeAgain   : '<div><font size=5>'+
                            '<p>האימון הסתיים ללא הצלחה. ננסה שוב.</p></br>'+

                            '<p>להזכירך: המטרה שלך היא להכריע מהר ככל הניתן מהו המספר (ספרה או טקסט) שמוצג על גבי המסך.</p></br>'+
                            
                            '<p>אם המספר הוא  <b>1</b>, יש להקיש על מקש <b>z</b> שבמקלדת באמצעות האמה השמאלית.</p>'+
                            '<p>אם המספר הוא  <b>2</b>, יש להקיש על מקש <b>x</b> שבמקלדת באמצעות האצבע השמאלית.</p>'+
                            '<p>אם המספר הוא  <b>3</b>, יש להקיש על מקש <b>n</b> שבמקלדת באמצעות האצבע הימנית.</p>'+
                            '<p>אם המספר הוא  <b>4</b>, יש להקיש על מקש <b>m</b> שבמקלדת באמצעות האמה הימנית.</p></br>'+

                            '<p style="font-weight: bold;">יש להסתכל למרכז המסך במהלך כל הניסוי.</p></br>'+

                            '<p>יש להניח את האצבעות על גבי המקשים כנדרש כעת.</p></br>'+

                            '<p>להמשך יש להקיש על מקש הרווח</p>'+
                            '</font></div>'



        },
        times: {
            fixation_duration : 500,
            stimulus_duration : 400,
            response_duration : 1100,
            feedback_duration : 500,
            iti_duration      : 1000
        },
        
        minScore4exp    : 0,
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
        defaultStim    : [{css:{color:'black', 'font-size':'100px', cursor:'none' }}],
        fixation       : [{inherit:'defaultStim', media: '+'}],
        error          : [{inherit:'defaultStim', media: 'תשובה לא נכונה!'}],
        correct        : [{inherit:'defaultStim', media: 'תשובה נכונה!'}],
        timeoutmessage : [{inherit:'defaultStim', media: 'תשובה לא זוהתה!'}]
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
    
    API.addTrialSets('startPracticeAgain',{
        input: [ 
			{handle:'end', on: 'timeout', duration: 0}
        ],
        interactions: [
            {
                conditions: [
                {type:'custom',fn: function(){return true;}}
                ],
                actions: [
                    {type:'goto',destination: 'previousWhere', properties: {practice:true}},
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
                    // {type:'log'}, 
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
    
    API.addTrialSets('inst_startPracticeAgain',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.inst_startPracticeAgain}}
        ]
    });
    

    
    API.addTrialSets('inst_rest',{
        inherit:'insts',
	    layout: [
	        {media: {html: current.instructions.inst_rest}}
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
            { media: '<%= trialData.text %>', css:{fontSize: '100px', color:'<%= trialData.color %>', cursor:'none'}, handle:'target', data:{correct:'<%= trialData.correct %>'}}
        ]
    });
    
    API.addTrialSet('digit_trial', {
        inherit: {set:'main', merge:['stimuli']},
        stimuli: [
            { media: {image:'<%= trialData.media %>'},  handle:'target', data:{correct:'<%= trialData.correct %>'}}
        ]
    });
    
    var digits_trials = [];
    var texts_trials = [];
    var revtexts_trials = [];
    var number = 0;
    var rep_id  = 0;
    

 
    for (rep_id = 1; rep_id <= 6; rep_id+=1) {
        for (number = 1; number <= 4; number++) {
            digits_trials.push({inherit: 'digit_trial', data: {media: image_url+number+'d.png', correct:current.answers[number-1]}});
            texts_trials.push({inherit: 'digit_trial', data: {media: image_url+number+'t.png', correct:current.answers[number-1]}});
            revtexts_trials.push({inherit: 'digit_trial', data: {media: image_url+number+'r.png', correct:current.answers[number-1]}});

        }
    }

    
    API.addTrialSet('digits', digits_trials);
    API.addTrialSet('texts', texts_trials);
    API.addTrialSet('revtexts', revtexts_trials);
    
  
    /***********************************************
    // Sequence
     ***********************************************/
	API.addSequence([
	    
	     {
    		data: {practice:true},
		    inherit : {set:"startPractice"}
	    },

	    {
			mixer: 'random',
			data: [
				{   
					mixer: 'repeat',
					times: 4,
					data: [
                        {inherit:{set:'digits', type:'equalDistribution', n: digits_trials.length, seed: 'digits_P'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: 4,
					data: [
                        {inherit:{set:'texts', type:'equalDistribution', n: texts_trials.length, seed: 'texts_P'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: 4,
					data: [
                        {inherit:{set:'revtexts', type:'equalDistribution', n: revtexts_trials.length, seed: 'revtexts_P'}, data:{block: 'practice'}}
					]
				}

			]
		},
		
		{
		    inherit: {set:"endOfPractice"}
		},
		
		{
    		data: {practiceAgain:true},
		    inherit : {set:"inst_startPracticeAgain" }
		},

		{
		    inherit : {set:"startPracticeAgain"}
		},

	    
		{
		    data: {exp:true},
		    inherit : {set:"inst_start" }
		},

	    {
			mixer: 'random',
			data: [
				{
					mixer: 'repeat',
					times: 2,
					data: [
                        {inherit:{set:'digits', type:'equalDistribution', n: digits_trials.length, seed: 'digits_E'}, data:{block: 'exp'}}
					]
				},
				{
					mixer: 'repeat',
					times: 2,
					data: [
                        {inherit:{set:'texts', type:'equalDistribution', n: texts_trials.length, seed: 'texts_E'}, data:{block: 'exp'}}
					]
				},
				
				{
					mixer: 'repeat',
					times: 2,
					data: [
                        {inherit:{set:'revtexts', type:'equalDistribution', n: revtexts_trials.length, seed: 'revtexts_E'}, data:{block: 'exp'}}
					]
				}
			]
		}

	]);	
	return API.script;
});
