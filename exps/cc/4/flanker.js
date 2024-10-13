define(['pipAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    var current = API.getCurrent();

    var answers     = ['e', 'i'];


 	API.addCurrent({
 	    answers      : answers,
 	    
        instructions : {
            inst_welcome : '<p>Welcome to the experiment!</p></br>'+

                            '<p>In this task, we will show you arrows or lines.</p>'+
                            '<P>Your task is to focus on the arrow that appears in the <b>middle</b> and indicate whether it points to the left or to the right.</p></br>'+
                            
                            '<p>If the arrow points to the <b>right</b>, hit the <b>i</b> key with your right hand.</p>'+
                            '<p>If the arrow points to the <b>left</b>, hit the <b>e</b> key with your left hand.</p></br>'+
                            
                            '<p>Please put your fingers on the keyboard to get ready</p></br>'+
                            
                            '<p>Press SPACE to start a short practice</p>',
            inst_start   : '<p>The practice has now ended.</p></br>'+

                            '<p>Remember: focus on the arrow that appears in the <b>middle</b>.</p></br>'+
                            
                            '<p>If the arrow points to the <b>right</b>, hit the <b>i</b> key with your right hand.</p>'+
                            '<p>If the arrow points to the <b>left</b>, hit the <b>e</b> key with your left hand.</p></br>'+
                            
                            '<p>Please put your fingers on the keyboard to get ready</p></br>'+
                            
                            '<p>Press SPACE to continue</p>',

            inst_bye     : '<p>This is the end of the experiment</p>'+
                            '<p>Thank you for your participation</p>'+
                            '<p>To end please press SPACE</p>'
        },
        
        durations: {
            fixation : 1000,
            stimulus : 500,
            response : 1000,
            feedback : 500,
            iti      : 1500
        }
	}); 
    
    

    API.addSettings('canvas',{
        textSize         : 5,
        maxWidth         : 1200,
        proportions      : 0.65,
        borderWidth      : 0.4,
        background       : '#ffffff',
        canvasBackground : '#ffffff'	
    });


    /***********************************************
    // Stimuli
     ***********************************************/


    API.addStimulusSets({
        defaultStim: [{css:{color:'black','font-size':'100px'}}],
        fixation : [{inherit:'defaultStim', media: '+'}],
        error : [{inherit:'defaultStim', media: 'Wrong answer!'}],
        correct : [{ inherit:'defaultStim', media: 'Correct answer!'}],
        timeoutmessage : [{inherit:'defaultStim', media: 'Respond faster!'}]
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

    API.addTrialSets('stimulus_trial',[{ 
        interactions: [
            { 
                conditions: [{type:'begin'}],
                actions: [
                    {type:'showStim', handle:'fixation'}, 
                    {type:'trigger', handle:'showTarget', duration:'<%= current.durations.fixation %>'} 
                ]
            }, 

            {
                conditions:[{type:'inputEquals',value:'showTarget'}],
                actions: [
                    {type:'hideStim', handle:'fixation'}, 
				    {type:'setInput', input:{handle:current.answers[0], on: 'keypressed', key: current.answers[0]}},
				    {type:'setInput', input:{handle:current.answers[1],on: 'keypressed', key: current.answers[1]}},
				    {type:'showStim', handle: 'target'},
                    {type:'resetTimer'}, 
                    {type:'trigger',handle:'targetOut', duration:'<%= current.durations.stimulus %>'}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:'targetOut'}], 
                actions: [
                    {type:'hideStim', handle:'target'}, 
                    {type:'trigger', handle:'timeout', duration: '<%= current.durations.response %>'} 
                ]
            }, 	
            /* feedback presentation */
            { 
                conditions: [{type:'inputEqualsStim', property:'correct'}], 
                actions: [
                    {type:'removeInput',handle:['All']},
                    {type:'setTrialAttr', setter:{score:1}},
                    {type:'log'},
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
                    {type:'trigger', handle:'clean',duration:'<%= current.durations.feedback %>'}
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
                    {type:'trigger', handle:'clean',duration:'<%= current.durations.feedback %>'}

                ]
            }, 
            {
                conditions: [
                    {type:'inputEquals',value:'timeout'}],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:-1}},
                    {type:'log'},					
                    {type:'hideStim', handle:['All']},
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
                    {type:'trigger', handle:'clean',duration:'<%= current.durations.feedback %>'}
                ]
            }, 
            {
                conditions: [{type:'inputEquals', value:'clean'}],
                actions:[
                    {type:'hideStim', handle:['All']}
                ]
            },
            /* Inter trial interval */
            {
                conditions: [{type:'inputEquals', value:'ITI'}],
                actions:[
                    {type:'removeInput', handle:['All']},
                    {type:'trigger', handle:'end',duration:'<%= trialData.block==="practice" ? current.durations.feedback+current.durations.iti : current.durations.iti %>'}
                ]
            },
            {
                conditions: [ {type:'inputEquals', value:'end'} ],
                actions: [ {type:'endTrial' }]
            }
        ],
        stimuli : [
            {inherit:'error'},
            {inherit:'correct'},
            {inherit:'timeoutmessage'},
            {inherit:'fixation'},
            {media: '<%= trialData.media %>', css:{fontSize: '100px'}, handle:'target', data:{correct:'<%= trialData.correct %>'}}
        ]
    }]);

    /***********************************************
    // Stimuli
     ***********************************************/

    
    API.addTrialSet('cong', [
        {inherit: 'stimulus_trial', data: { media: '⬅⬅⬅⬅⬅', correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { media: '➡➡➡➡➡', correct:current.answers[1]}}
    ]);
    API.addTrialSet('incong', [
        {inherit: 'stimulus_trial', data: { media: '⬅⬅➡⬅⬅', correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { media: '➡➡⬅➡➡', correct:current.answers[0]}}
    ]);
    API.addTrialSet('neu', [
        {inherit: 'stimulus_trial', data: { media: '━ ━ ⬅ ━ ━', correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { media: '━ ━ ➡ ━ ━', correct:current.answers[1]}}
    ]);
    /***********************************************
    // Sequence
     ***********************************************/

	API.addSequence([
	    {inherit: {set:"inst_welcome"}},
        {
			mixer: 'random',
			data: [
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'cong', type:'equalDistribution', n: current.num_of_prac_trials*3, seed: 'congP'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'incong', type:'equalDistribution', n: current.num_of_prac_trials*3, seed: 'incongP'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'neu', type:'equalDistribution', n: current.num_of_prac_trials*3, seed: 'neuP'}, data:{block: 'practice'}}
					]
				}
			]
		},
		{inherit: {set:"inst_start"}},
	    {
			mixer: 'random',
			data: [
				{
					mixer: 'repeat',
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'cong', type:'equalDistribution', n: current.num_of_trials*3, seed: 'congE'}, data:{block: 'exp'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'incong', type:'equalDistribution', n: current.num_of_trials*3, seed: 'incongE'}, data:{block: 'exp'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'neu', type:'equalDistribution', n: current.num_of_trials*3, seed: 'neuE'}, data:{block: 'exp'}}
					]
				}
			]
		},		
		{inherit: {set:"inst_bye"}}
	]);	
	return API.script;
});
