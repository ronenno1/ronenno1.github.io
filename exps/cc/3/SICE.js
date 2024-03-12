define(['pipAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    
    var current = API.getCurrent();
    var answers = ['e', 'i'];
    

 	API.addCurrent({
 	    answers      : answers,
        instructions : {
            inst_welcome : '<p>Welcome to the experiment!</p></br>'+
                            '<p>We will show you pairs of digits.</p>'+
                            '<P>Your task is to judge, as quickly as possible, which digit is numerically larger.</p>'+
                            '<P>For example, if you see 8 and 2, 8 is the numerically larger digit.</p></br>'+
                            '<p>If the numerically larger digit appears on the <b>right</b>, hit the <b>i</b> key with your right hand.</p>'+
                            '<p>If the numerically larger digit appears on the <b>left</b>, hit the <b>e</b> key with your left hand.</p><br>'+
                            '<p>Please put your fingers on the keyboard to get ready</p></br>'+
                            '<p>Press SPACE to start a short practice</p>',
            inst_start   :  '<p>The practice has now ended.</p></br>'+

                            '<p>Remember: indicate the numerically larger digit.</p></br>'+
                                
                            '<p>If the numerically larger digit appears on the <b>right</b>, hit the <b>i</b> key with your right hand.</p>'+
                            '<p>If the numerically larger digit appears on the <b>left</b>, hit the <b>e</b> key with your left hand.</p><br>'+
                                
                            '<p>Please put your fingers on the keyboard to get ready</p></br>'+
                                
                            '<p>Press SPACE to continue</p>',
            inst_rest   : '<p>A short rest!</p></br>'+
                            '<p>Remember: press on the SPACE, only for <span style="color:green">green</span > items.</p><br>'+
                            '<p>Remember: indicate the numerically larger digit.</p></br>'+
                                
                            '<p>If the numerically larger digit appears on the <b>right</b>, hit the <b>i</b> key with your right hand.</p>'+
                            '<p>If the numerically larger digit appears on the <b>left</b>, hit the <b>e</b> key with your left hand.</p><br>'+
                                
                            '<p>Please put your fingers on the keyboard to get ready</p></br>'+
                                
                            '<p>Press SPACE to continue</p>',
            inst_bye     :  '<p>This is the end of the experiment</p>'+
                            '<p>Thank you for your participation</p>'+
                            '<p>To end please press SPACE</p>'
        },
        
        durations: {
            fixation : 1000,
            stimulus : 500,
            response : 1000,
            feedback : 500,
            iti      : 1500
        },
        
        minScore4exp    : 2,
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



    /***********************************************
    // Stimuli
     ***********************************************/

    API.addStimulusSets({
        defaultStim    : [{css:{color:'black', 'font-size':'100px'}}],
        fixation       : [{inherit:'defaultStim', media: '+'}],
        error          : [{inherit:'defaultStim', media: 'Wrong answer!'}],
        correct        : [{inherit:'defaultStim', media: 'Correct answer!'}],
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

    API.addTrialSets('stimulus_trial',[{ 
        data: {score:0},
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
                    {type:'trigger', handle:'timeout', duration:'<%= current.durations.response %>'}
                ]
            }, 	
            { 
                conditions: [{type:'inputEqualsTrial', property:'correct'}],
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
                    {type:'inputEqualsTrial', property:'correct'},
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
                    {type:'inputEqualsTrial', property:'correct', negate:true}
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
                    {type:'inputEqualsTrial', property:'correct', negate:true}, 
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
            { media: '<%= trialData.leftVal %>', css:{fontSize: '<%= trialData.leftSize %>px'}, location: {left:40}, handle:'target', data:{correct:'<%= trialData.correct %>'}},
            { media: '<%= trialData.rightVal %>', css:{fontSize: '<%= trialData.rightSize %>px'}, location: {right:40}, handle:'target', data:{correct:'<%= trialData.correct %>'}}
        ]
    }]);

    /***********************************************
    // Specific color trials
     ***********************************************/
    
    API.addTrialSet('cong', [
        {inherit: 'stimulus_trial', data: { leftVal: 1, rightVal: 2, leftSize: 20, rightSize: 100, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 2, rightVal: 4, leftSize: 20, rightSize: 100, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 4, rightVal: 8, leftSize: 20, rightSize: 100, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 2, rightVal: 1, leftSize: 100, rightSize: 20, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 4, rightVal: 2, leftSize: 100, rightSize: 20, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 8, rightVal: 4, leftSize: 100, rightSize: 20, correct:current.answers[0]}}
    ]);
    
    API.addTrialSet('incong', [
        {inherit: 'stimulus_trial', data: { leftVal: 1, rightVal: 2, leftSize: 100, rightSize: 20, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 2, rightVal: 4, leftSize: 100, rightSize: 20, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 4, rightVal: 8, leftSize: 100, rightSize: 20, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 2, rightVal: 1, leftSize: 20, rightSize: 100, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 4, rightVal: 2, leftSize: 20, rightSize: 100, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 8, rightVal: 4, leftSize: 20, rightSize: 100, correct:current.answers[0]}}
    ]);
    
    API.addTrialSet('neu', [
        {inherit: 'stimulus_trial', data: { leftVal: 1, rightVal: 2, leftSize: 20, rightSize: 20, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 2, rightVal: 4, leftSize: 20, rightSize: 20, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 4, rightVal: 8, leftSize: 20, rightSize: 20, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 1, rightVal: 2, leftSize: 100, rightSize: 100, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 2, rightVal: 4, leftSize: 100, rightSize: 100, correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: { leftVal: 4, rightVal: 8, leftSize: 100, rightSize: 100, correct:current.answers[1]}},
    
        {inherit: 'stimulus_trial', data: { leftVal: 2, rightVal: 1, leftSize: 20, rightSize: 20, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 4, rightVal: 2, leftSize: 20, rightSize: 20, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 8, rightVal: 4, leftSize: 20, rightSize: 20, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 2, rightVal: 1, leftSize: 100, rightSize: 100, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 4, rightVal: 2, leftSize: 100, rightSize: 100, correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: { leftVal: 8, rightVal: 4, leftSize: 100, rightSize: 100, correct:current.answers[0]}}
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
                        {inherit:{set:'cong', type:'equalDistribution', n: current.num_of_prac_trials, seed: 'congP'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'incong', type:'equalDistribution', n: current.num_of_prac_trials, seed: 'incongP'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'neu', type:'equalDistribution', n: current.num_of_prac_trials, seed: 'neuP'}, data:{block: 'practice'}}
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
		{inherit: {set:"inst_rest"}},
	    {
			mixer: 'random',
			data: [
				{
					mixer: 'repeat',
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'cong', type:'equalDistribution', n: current.num_of_trials*3, seed: 'congE2'}, data:{block: 'exp'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'incong', type:'equalDistribution', n: current.num_of_trials*3, seed: 'incongE2'}, data:{block: 'exp'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_trials,
					data: [
                        {inherit:{set:'neu', type:'equalDistribution', n: current.num_of_trials*3, seed: 'neuE2'}, data:{block: 'exp'}}
					]
				}
			]
		},		
		{inherit: {set:"inst_bye"}}
	]);	
	return API.script;
});
