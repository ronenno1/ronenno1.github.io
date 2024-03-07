define(['pipAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    var current = API.getCurrent();
console.log(current.num_of_trials);

 	API.addCurrent({

         instructions : {
            inst_welcome : '<p>Welcome to the experiment!</p></br>'+
                            '<p>We will show you colored items.</p></br>'+
                            '<p>Please press on the SPACE, as quickly as possible, for <span style="color:green">green</span > items.</p><br>'+
                            '<p>For item in other colors, do not respond at all, <br>only wait until the next item appears.</p></br>'+
                            '<p>Press SPACE to start a short practice</p>',
            inst_rest   : '<p>A short rest!</p></br>'+
                            '<p>Remember: press on the SPACE, only for <span style="color:green">green</span > items.</p><br>'+
                            '<p>Press SPACE to continue</p>',
            inst_start   : '<p>The practice has now ended.</p></br>'+
                            '<p>Remember: press on the SPACE, only for <span style="color:green">green</span > items.</p><br>'+
                            '<p>Press SPACE to continue</p>',
            inst_bye     : '<p>This is the end of the experiment</p>'+ 
                            '<p>Thank you for your participation</p>'+
                            '<p>To end please press SPACE</p>'
        },

        durations: {
            fixation : 100,
            stimulus : 100,
            response : 600,
            feedback : 500,
            iti      : 500
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
                    {type:'trigger', handle:'showTarget', duration:'<%= current.durations.fixation %>'},

                ]
            }, 
            {
                conditions:[{type:'inputEquals',value:'showTarget'}],
                actions: [
                    {type:'hideStim', handle:['fixation']},
				    {type:'setInput', input:{handle:'response', on: 'keypressed', key: ' '}},
                    {type:'showStim', handle: 'target'},
                    {type:'resetTimer'}, 
                    {type:'trigger',handle:'targetOut', duration:'<%= current.durations.stimulus %>'}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:'targetOut'}],
                actions: [
                    {type:'hideStim', handle:'target'}, 
                    {type:'trigger', handle: '<%= trialData.type ==="go" ? "timeout" : "correct_inhibition" %>', duration:'<%= current.durations.response %>'} // set response deadline - trial ends when it is due
                ]
            }, 	

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
                    {type:'trigger', handle:'clean',duration: '<%= current.durations.feedback %>'}
                ]
            }, 

            { 
                conditions: [{type:'inputEquals', value:'correct_inhibition'}], 
                actions: [
                    {type:'removeInput',handle:['All']},
                    {type:'setTrialAttr', setter:{score:1}},
                    {type:'log'},
                    {type:'trigger', handle:'ITI'}
                ]
            }, 
            {
                conditions: [
                    {type:'inputEquals', value:'correct_inhibition'},
                    {type:'trialEquals', property:'block', value:'practice'}
                ],
                actions: [
                    {type:'showStim', handle:'correct'},
                    {type:'trigger', handle:'clean',duration:'<%= current.durations.feedback %>'}
                ]
            }, 
            {
                conditions: [
                    {type:'inputEquals', value:'response'},
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
                    {type:'inputEquals', value:'response'}, 
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
            {media:'<%= trialData.text %>', handle:'target', css:{fontSize: '100px', color:'<%= trialData.color %>'}, data:{type:'<%= trialData.type =>', correct: '<%= trialData.correct %>'}}

        ]
    }]);


    /***********************************************
    // Specific color trials
     ***********************************************/


    API.addTrialSet('go', [
        {inherit: 'stimulus_trial', data: {text: 'X', color:'green', type: 'go', correct: 'response'}},
        {inherit: 'stimulus_trial', data: {text: 'O', color:'green', type: 'go', correct: 'response'}}
    ]);
    
    
    API.addTrialSet('nogo', [
        {inherit: 'stimulus_trial', data: {text: 'X', color:'red', type: 'nogo',correct: ''}},
        {inherit: 'stimulus_trial', data: {text: 'O', color:'red', type: 'nogo',correct: ''}}
    ]);
   
    /***********************************************
    // Sequence
     ***********************************************/
     
    var ratio =  API.shuffle([[3, 1], [2, 2]]);
    console.log(ratio);
	API.addSequence([
	    {inherit: {set:"inst_welcome"}},
	    {
			mixer: 'random',
			data: [
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials,
					data: [
                        {inherit:{set:'go', type:'equalDistribution', n: current.num_of_prac_trials, seed: 'goP'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_prac_trials/3,
					data: [
                        {inherit:{set:'nogo', type:'equalDistribution', n: current.num_of_prac_trials, seed: 'nogoP'}, data:{block: 'practice'}}
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
					times: current.num_of_trials*ratio[0][0],
					data: [
                        {inherit:{set:'go', type:'equalDistribution', n: current.num_of_trials*10, seed: 'goE'}, data:{block: 'exp_'+ratio[0]}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_trials*ratio[0][1],
					data: [
                        {inherit:{set:'nogo', type:'equalDistribution', n: current.num_of_trials*10, seed: 'nogoE'}, data:{block: 'exp_'+ratio[0]}}
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
					times: current.num_of_trials*ratio[1][0],
					data: [
                        {inherit:{set:'go', type:'equalDistribution', n: current.num_of_trials*10, seed: 'goE'}, data:{block: 'exp_'+ratio[1]}}
					]
				},
				{
					mixer: 'repeat',
					times: current.num_of_trials*ratio[1][1],
					data: [
                        {inherit:{set:'nogo', type:'equalDistribution', n: current.num_of_trials*10, seed: 'nogoE'}, data:{block: 'exp_'+ratio[1]}}
					]
				}
			]
		},		
		{inherit: {set:"inst_bye"}}
	]);	
	return API.script;
});
