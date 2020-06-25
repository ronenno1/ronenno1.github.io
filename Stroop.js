define(['pipAPI'], function(APIconstructor) {

    var API     = new APIconstructor();
    API.addSettings('onEnd', window.minnoJS.onEnd);

    
    API.addSettings('logger', {
        // gather logs in array
        onRow: function(logName, log, settings, ctx){
            if (!ctx.logs) ctx.logs = [];
            ctx.logs.push(log);
        },
        // onEnd trigger save (by returning a value)
        onEnd: function(name, settings, ctx){
            return ctx.logs;
        },
        // Transform logs into a string
        // we save as CSV because qualtrics limits to 20K characters and this is more efficient.
        serialize: function (name, logs) {
            var headers = ['latency'];
            var content = logs.map(function (log) { return [log.latency]; });
            content.unshift(headers);
            return toCsv(content);

            function toCsv(matrice) { return matrice.map(buildRow).join('\n'); }
            function buildRow(arr) { return arr.map(normalize).join(','); }
            // wrap in double quotes and escape inner double quotes
            function normalize(val) {
                var quotableRgx = /(\n|,|")/;
                if (quotableRgx.test(val)) return '"' + val.replace(/"/g, '""') + '"';
                return val;
            }
        },
        // Set logs into an input (i.e. put them wherever you want)
        send: function(name, serialized){
            window.minnoJS.logger(serialized);
        }
    });


    var global  = API.getGlobal();
    var current = API.getCurrent();

    var version_id  = Math.random()>0.5 ? 2 : 1;
    var all_answers = [['i', 'e'], ['i', 'e']];
    var answers     = all_answers[version_id-1];

 	API.addCurrent({
 	    version_id   : version_id,
 	    answers      : answers,
        instructions: {
            inst_welcome : `<p>Welcome to the experiment!</p></br>

                            <p>We will show you items, one after the other.</p>
                            <p>Your task is to indicate the color of each item.</p></br>
                            
                            <p>If the color of the item is <span style="color:${version_id===1 ? 'blue' : 'red'};">${version_id===1 ? 'blue' : 'red'}</span>, hit the <b>i</b> key with your right hand.</p>
                            <p>If the color of the item is <span style="color:${version_id===1 ? 'red' : 'blue'};">${version_id===1 ? 'red' : 'blue'}</span>, hit the <b>e</b> key with your left hand.</p></br>
                            
                            <p>Please put your fingers on the keyboard to get ready</p></br>
                            
                            <p>Press SPACE to start a short practice</p>`,
            inst_start   : `<p>The practice has now ended.</p></br>

                            <p>Remember: indicate the color of the item.</p></br>
                            
                            <p>If the color of the item is <span style="color:${version_id===1 ? 'blue' : 'red'};">${version_id===1 ? 'blue' : 'red'}</span>, hit the <b>i</b> key with your right hand.</p>
                            <p>If the color of the item is <span style="color:${version_id===1 ? 'red' : 'blue'};">${version_id===1 ? 'red' : 'blue'}</span>, hit the <b>e</b> key with your left hand.</p></br>
                            
                            <p>Please put your fingers on the keyboard to get ready</p></br>
                            
                            <p>Press SPACE to continue</p>`,

            inst_bye     : `<p>This is the end of the experiment</p> 
                            <p>Thank you for your participation</p>
                            <p>To end please press SPACE</p>`
        },
        times: {
            fixation_duration : 1000,
            stimulus_duration : 500,
            response_duration : 1000,
            feedback_duration : 1000,
            iti_duration      : 1000
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

    API.addSettings('base_url',{
        image : global.baseURL
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
                    {type:'custom',fn: function(){return global.current.score < global.current.minScore4exp;}},
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
            },
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
                    {type:'trigger', handle:'showTarget', duration: '<%= current.times.fixation_duration %>'}
                ]
            }, 

            {
                conditions:[{type:'inputEquals',value:'showTarget'}],
                actions: [
                    {type:'hideStim', handle:'fixation'}, 
				    {type:'setInput', input:{handle:current.answers[0], on: 'keypressed', key: current.answers[0]}},
				    {type:'setInput', input:{handle:current.answers[1], on: 'keypressed', key: current.answers[1]}},
				    {type:'showStim', handle: 'target'},
                    {type:'resetTimer'},
                    {type:'trigger',handle:'targetOut', duration: '<%= current.times.stimulus_duration %>'}
                ]
            },
            {
                conditions: [{type:'inputEquals', value:'targetOut'}], 
                actions: [
                    {type:'hideStim', handle:'target'}, 
                    {type:'trigger', handle:'timeout', duration: '<%= current.times.response_duration %>'}
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
                    {type:'trigger', handle:'clean',duration: '<%= current.times.feedback_duration %>'}
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
                    {type:'trigger', handle:'clean',duration: '<%= current.times.feedback_duration %>'}

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
                    {type:'trigger', handle:'clean',duration: '<%= current.times.feedback_duration %>'}
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
                    {type:'trigger', handle:'end', duration:'<%= trialData.block==="practice" ? current.times.feedback_duration+current.times.iti_duration : current.times.iti_duration %>'}
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
            { media: '<%= trialData.text %>', css:{fontSize: '100px', color:'<%= trialData.color %>'}, handle:'target', data:{correct:'<%= trialData.correct %>'}}
        ]
    });
    
    
    API.addTrialSet('cong', [
        {inherit: 'stimulus_trial', data: {text: 'BLUE', color: 'blue', correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: {text: 'RED', color: 'red', correct:current.answers[1]}}
    ]);
    
    API.addTrialSet('incong', [
        {inherit: 'stimulus_trial', data: {text: 'BLUE', color: 'red', correct:current.answers[1]}},
        {inherit: 'stimulus_trial', data: {text: 'RED', color: 'blue', correct:current.answers[0]}}
    ]);
    
    API.addTrialSet('neu', [
        {inherit: 'stimulus_trial', data: {text: 'XXXX', color: 'blue', correct:current.answers[0]}},
        {inherit: 'stimulus_trial', data: {text: 'XXXX', color: 'red', correct:current.answers[1]}}
    
    ]);
    /***********************************************
    // Sequence
     ***********************************************/

	API.addSequence([
	    {
    		data: {practice:true},
		    inherit : {set:"inst_welcome"}
	    },
	    {
		    inherit : {set:"startPractice"}
	    },
	    {
	        
			mixer: 'random',
			data: [
				{   
				    
					mixer: 'repeat',
					times: 1,
					data: [
                        {inherit:{set:'cong', type:'equalDistribution', n: 4, seed: 'congP'}, data:{block: 'practice'}}
					]
				},
				{
				    
					mixer: 'repeat',
					times: 1,
					data: [
                        {inherit:{set:'incong', type:'equalDistribution', n: 4, seed: 'incongP'}, data:{block: 'practice'}}
					]
				},
				{
					mixer: 'repeat',
					times: 1,
					data: [
                        {inherit:{set:'neu', type:'equalDistribution', n: 4, seed: 'neuP'}, data:{block: 'practice'}}
					]
				}
			]
		},
		
		{
		    inherit: {set:"endOfPractice"}
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
					times: 1,
					data: [
                        {inherit:{set:'cong', type:'equalDistribution', n: 3, seed: 'congE'}, data:{block: 'exp'}}
					]
				},
				{
					mixer: 'repeat',
					times: 1,
					data: [
                        {inherit:{set:'incong', type:'equalDistribution', n: 3, seed: 'incongE'}, data:{block: 'exp'}}
					]
				},
				{
					mixer: 'repeat',
					times: 1,
					data: [
                        {inherit:{set:'neu', type:'equalDistribution', n: 3, seed: 'neuE'}, data:{block: 'exp'}}
					]
				}
			]
		},
		{
		    inherit : {set:"inst_bye" }
		}
	]);	
	return API.script;
});
