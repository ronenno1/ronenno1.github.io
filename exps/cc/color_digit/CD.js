define(['timeAPI'], function(APIconstructor) {

    document.body.style.cursor='none';

    var API     = new APIconstructor();
    var global  = API.getGlobal();
    var current = API.getCurrent();

    var answers = ['y', 'x', 'n', 'm'];
 	API.addCurrent({
 	    answers:answers,
        instructions: {
            inst_welcome : '<div><font size=5>'+
                            '<p>In diesem Teil des Experimentes sehen Sie Farben.</p>'+
                            '<p>Ihre Aufgabe ist es, so schnell wie möglich zu entscheiden, wie viele Farben dargestellt werden.</br></p>'+

                            '<p>Wenn Sie  <b>eine Farbe</b> erkennen, drücken Sie bitte die <b>Y-Taste  </b></p>'+
                            '<p>Wenn Sie  <b>zwei Farben</b> erkennen, drücken Sie bitte die <b>X-Taste </b></p>'+
                            '<p>Wenn Sie  <b>drei Farben</b> erkennen, drücken Sie bitte die <b>N-Taste </b></p>'+
                            '<p>Wenn Sie  <b>vier Farben</b> erkennen, drücken Sie bitte die <b>M-Taste </b></p></br>'+

                            '<p style="font-weight: bold;">Bitte schauen Sie während der Dauer des gesamten Experiments auf die Mitte des Bildschirms.</p></br>'+

                            '<p>Legen Sie die Finger nun auf die Tasten Y, X, N, und M.</p>'+

                            '<p>Drücken Sie die Leertaste, um zu beginnen.</p>'+
                            '</font></div>',

            inst_start   : '<div><font size=5>'+
                            '<p>Der Übungsteil ist geschafft!</p>'+
                            '<p>Zur Erinnerung: In diesem Teil des Experimentes sehen Sie Farben.</p>'+
                            '<p>Ihre Aufgabe ist es, so schnell wie möglich zu entscheiden, wie viele Farben dargestellt werden.</br></p>'+

                            '<p>Wenn Sie  <b>eine Farbe</b> erkennen, drücken Sie bitte die <b>Y-Taste  </b></p>'+
                            '<p>Wenn Sie  <b>zwei Farben</b> erkennen, drücken Sie bitte die <b>X-Taste </b></p>'+
                            '<p>Wenn Sie  <b>drei Farben</b> erkennen, drücken Sie bitte die <b>N-Taste </b></p>'+
                            '<p>Wenn Sie  <b>vier Farben</b> erkennen, drücken Sie bitte die <b>M-Taste </b></p></br>'+


                            '<p style="font-weight: bold;">Bitte schauen Sie während der Dauer des gesamten Experiments auf die Mitte des Bildschirms.</p></br>'+


                            '<p>Legen Sie die Finger nun auf die Tasten Y, X, N, und M.</p>'+

                            '<p>Drücken Sie die Leertaste, um zu beginnen.</p>'+

                            '</font></div>',

            
            inst_startPracticeAgain   : '<div><font size=5>'+
                            '<p>Der Übungsteil wurde nicht bestanden!</p>'+
                            '<p>Zur Erinnerung: In diesem Teil des Experimentes sehen Sie Farben.</p>'+
                            '<p>Ihre Aufgabe ist es, so schnell wie möglich zu entscheiden, wie viele Farben dargestellt werden.</br></p>'+

                            '<p>Wenn Sie  <b>eine Farbe</b> erkennen, drücken Sie bitte die <b>Y-Taste  </b></p>'+
                            '<p>Wenn Sie  <b>zwei Farben</b> erkennen, drücken Sie bitte die <b>X-Taste </b></p>'+
                            '<p>Wenn Sie  <b>drei Farben</b> erkennen, drücken Sie bitte die <b>N-Taste </b></p>'+
                            '<p>Wenn Sie  <b>vier Farben</b> erkennen, drücken Sie bitte die <b>M-Taste </b></p></br>'+


                            '<p style="font-weight: bold;">Bitte schauen Sie während der Dauer des gesamten Experiments auf die Mitte des Bildschirms.</p></br>'+


                            '<p>Legen Sie die Finger nun auf die Tasten Y, X, N, und M.</p>'+

                            '<p>Drücken Sie die Leertaste, um zu beginnen.</p>'+

                            '</font></div>'



        },
        times: {
            fixation_duration : 500,
            stimulus_duration : 400,
            response_duration : 1100,
            feedback_duration : 500,
            iti_duration      : 1000
        },
        
        minScore4exp    : 10,
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
        error          : [{inherit:'defaultStim', media: 'Falsche Antwort!'}],
        correct        : [{inherit:'defaultStim', media: 'Richtige Antwort!'}],
        timeoutmessage : [{inherit:'defaultStim', media: 'Fehlende Antwort!'}]
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
    
    var cong_trials = [];
    var incong_trials = [];
    var neutral_trials = [];
    var number = 0;
    var color_1 = 0;
    var color_2 = 0;
    var color_3 = 0;
    var color_4 = 0;
    var rep_id  = 0;
    
    
    for (rep_id = 1; rep_id <= 6; rep_id+=1) {
        for (number = 1; number <= 4; number+=1) {
            for (color_1 = 1; color_1 <= 4; color_1++) {
                if (number==1)
                    cong_trials.push({inherit: 'digit_trial', data: {media: 'digits/1_'+number+'_'+color_1+'_'+color_1+'_'+color_1+'_'+color_1+'.png', correct:current.answers[0]}});
                else
                    incong_trials.push({inherit: 'digit_trial', data: {media: 'digits/1_'+number+'_'+color_1+'_'+color_1+'_'+color_1+'_'+color_1+'.png', correct:current.answers[0]}});
            }
        }
    }
    for (rep_id = 1; rep_id <= 2; rep_id+=1) {
        for (number = 1; number <= 4; number+=1) {
            for (color_1 = 1; color_1 <= 4; color_1++) {
                for (color_2 = 1; color_2 <= 4; color_2++) {
                    if (color_1==color_2)
                        continue;
                    if (number==2) 
                        cong_trials.push({inherit: 'digit_trial', data: {media: 'digits/2_'+number+'_'+color_1+'_'+color_1+'_'+color_2+'_'+color_2+'.png', correct:current.answers[1]}});
                    else
                        incong_trials.push({inherit: 'digit_trial', data: {media: 'digits/2_'+number+'_'+color_1+'_'+color_1+'_'+color_2+'_'+color_2+'.png', correct:current.answers[1]}});
                }
            }
        }
    }
    for (number = 1; number <= 4; number+=1) {
        for (color_1 = 1; color_1 <= 4; color_1++) {
            for (color_2 = 1; color_2 <= 4; color_2++) {
                for (color_3 = 1; color_3 <= 4; color_3++) {
                    if ([color_1, color_2, color_3].filter((x, i, a) => a.indexOf(x) == i).length<3)
                        continue;
                    if (number==3)
                        cong_trials.push({inherit: 'digit_trial', data: {media: 'digits/3_'+number+'_'+color_1+'_'+color_2+'_'+color_3+'.png', correct:current.answers[2]}});
                    else
                        incong_trials.push({inherit: 'digit_trial', data: {media: 'digits/3_'+number+'_'+color_1+'_'+color_2+'_'+color_3+'.png', correct:current.answers[2]}});
                }
            }
        }
    }
    for (number = 1; number <= 4; number+=1) {
        for (color_1 = 1; color_1 <= 4; color_1++) {
            for (color_2 = 1; color_2 <= 4; color_2++) {
                for (color_3 = 1; color_3 <= 4; color_3++) {
                    for (color_4 = 1; color_4 <= 4; color_4++) {
                        if ([color_1, color_2, color_3, color_4].filter((x, i, a) => a.indexOf(x) == i).length<4)
                            continue;
                        if (number==4)
                            cong_trials.push({inherit: 'digit_trial', data: {media: 'digits/4_'+number+'_'+color_1+'_'+color_2+'_'+color_3+'_'+color_4+'.png', correct:current.answers[3]}});
                        else
                            incong_trials.push({inherit: 'digit_trial', data: {media: 'digits/4_'+number+'_'+color_1+'_'+color_2+'_'+color_3+'_'+color_4+'.png', correct:current.answers[3]}});
                    }
                }
            }
        }
    }
 
    for (rep_id = 1; rep_id <= 6; rep_id+=1) {
        for (color_1 = 1; color_1 <= 4; color_1++) {
            neutral_trials.push({inherit: 'digit_trial', data: {media: 'digits/1_5_'+color_1+'_'+color_1+'_'+color_1+'_'+color_1+'.png', correct:current.answers[0]}});
    
        }
    }
    for (rep_id = 1; rep_id <= 2; rep_id+=1) {
        for (color_1 = 1; color_1 <= 4; color_1++) {
            for (color_2 = 1; color_2 <= 4; color_2++) {
                if (color_1==color_2)
                    continue;
                neutral_trials.push({inherit: 'digit_trial', data: {media: 'digits/2_5_'+color_1+'_'+color_1+'_'+color_2+'_'+color_2+'.png', correct:current.answers[1]}});
    
            }
        }
    }
    for (color_1 = 1; color_1 <= 4; color_1++) {
        for (color_2 = 1; color_2 <= 4; color_2++) {
            for (color_3 = 1; color_3 <= 4; color_3++) {
                if ([color_1, color_2, color_3].filter((x, i, a) => a.indexOf(x) == i).length<3)
                    continue;
                neutral_trials.push({inherit: 'digit_trial', data: {media: 'digits/3_5_'+color_1+'_'+color_2+'_'+color_3+'.png', correct:current.answers[2]}});

            }
        }
    }

    for (color_1 = 1; color_1 <= 4; color_1++) {
        for (color_2 = 1; color_2 <= 4; color_2++) {
            for (color_3 = 1; color_3 <= 4; color_3++) {
                for (color_4 = 1; color_4 <= 4; color_4++) {
                    if ([color_1, color_2, color_3, color_4].filter((x, i, a) => a.indexOf(x) == i).length<4)
                        continue;
                    neutral_trials.push({inherit: 'digit_trial', data: {media: 'digits/4_5_'+color_1+'_'+color_2+'_'+color_3+'_'+color_4+'.png', correct:current.answers[3]}});

                }
            }
        }
    }
 
    
    API.addTrialSet('cong', cong_trials);
    API.addTrialSet('incong', incong_trials);
    API.addTrialSet('neu', neutral_trials);
    
  
    /***********************************************
    // Sequence
     ***********************************************/
	API.addSequence([
	    {
		    data: {exp:true},
		    inherit : {set:"inst_welcome" }
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
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'cong', type:'equalDistribution', n: cong_trials.length*3, seed: 'cong_P'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'incong', type:'equalDistribution', n: incong_trials.length, seed: 'incong_P'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'neu', type:'equalDistribution', n: neutral_trials.length, seed: 'neu_P'}, data:{block: 'practice'}}
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
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'cong', type:'equalDistribution', n: current.num_of_trials*3, seed: 'cong_E'}, data:{block: 'exp'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'incong', type:'equalDistribution', n: current.num_of_trials*3, seed: 'incong_E'}, data:{block: 'exp'}}
					]
				},
				
				{
					mixer: 'repeat',
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'neu', type:'equalDistribution', n: current.num_of_trials*3, seed: 'neutral_E'}, data:{block: 'exp'}}
					]
				}
			]
		}

	]);	
	return API.script;
});
