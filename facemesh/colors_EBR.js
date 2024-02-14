define(['timeAPI','underscore'], function(APIconstructor, _) {
    //document.body.style.cursor='none';

    var API     = new APIconstructor();
    API.addSettings('rtl', true);
    var global  = API.getGlobal();
    var current = API.getCurrent();
    var height = window.screen.height*0.2;
    global.init_minno_mesh(global); // This function load minno_faces components

    var defaultObj = {
        instStyle :  "font-size:24px; text-align:center; margin-left:10px; color:#000000; margin-right:10px; font-family:arial",
        
    	baseURL : '',
        times: {
            fixation_duration : 400,
            stimulus_duration : 1000,
            feedback_duration : 1500,
            iti_duration      : 1500
        },
        maxTimeoutsInBlock    : 5, 
        maxFailedBlocks       : 2,
        timeouts              : 0, 
        failedBlocks          : 0,
        canvas : {
            textSize         : 5,
            maxWidth         : 1200,
            proportions      : 0.65,
            cursor           : 'none',
            borderWidth      : 0.1,
            background       : '#FFFFFF',
            canvasBackground : '#FFFFFF'	
        }
    };

	_.defaults(current, defaultObj);

    API.addSettings('canvas', current.canvas);

    API.addSettings('base_url',{
        image : current.baseURL
    });

    /***********************************************
    // Media
     ***********************************************/
     
    /*
        group1MediaSets is an object with all the media sets that will considered group1. 
        We will create a media set (group1Media) that is comprised of media that inherit exRandomly from each media set. 
        Then, when we inherit exRandomly from that set, we will get one from mediaSet before getting another one from any of 
        the other mediaSets. This will allow us to present an equal number of photos from each mediaSet in each group.
    */ 

	//console.log('after media');
    /***********************************************
    // Stimuli
     ***********************************************/
    API.addStimulusSets({
        defaultStim    : [{css:{cursor:'none', color:'#000000', 'font-size':'2.5em'}, nolog:true}],
        fixation       : [{inherit:'defaultStim', media: '+', handle:'fixation'}],
        error          : [{inherit:'defaultStim', media: 'תשובה לא נכונה!', handle:'error'}],
        correct : [{inherit:'defaultStim', media: 'תשובה נכונה!', handle:'correct'}], 
        timeoutmessage : [{inherit:'defaultStim', media: 'תשובה לא זוהתה!', handle:'timeoutmessage'}], 
        reminder : [{inherit:'defaultStim', media: '<%=trialData.reminder%>', css:{color:'blue', cursor:'none', 'font-size':'1em'}, location:{bottom:1}, handle:'reminder'}], 
        faceStim : {css:{ cursor:'none'}, handle:'target'}
    });

 
    API.addTrialSets('silentStart',
    {
	    data:{onFail:true},
	    interactions: [
			{ // begin trial
				conditions: [{type:'begin'}],
				actions: [
                    {type:'custom',fn: function(){
                        //global.maximize();
                    }},
				    {type:'endTrial'}
				]
			}
		]
    });
    API.addTrialSets('silentEnd',
    {
	    data:{onFail:true},
	    interactions: [
			{ // begin trial
				conditions: [{type:'begin'}],
				actions: [
                    {type:'custom',fn: function(){
                        global.stopVideo(global);
                    }},
				    {type:'endTrial'}
				]
			}
		]
    });

	//console.log('after failure trials');
    /***********************************************
    // INSTRUCTIONS TRIAL
     ***********************************************/    

	//Define the instructions trial
	API.addTrialSets('inst',{
	    data : {block:0},
		input: [
			{handle:'space',on:'space'} //Will handle a SPACEBAR response

		],
		interactions: [
			{ // begin trial
				conditions: [{type:'begin'}],
				actions: [{type:'showStim',handle:'All'}] //Show the instructions
			},
			{
				conditions: [{type:'inputEquals',value:'space'}], //What to do when space is pressed
				actions: [
					{type:'hideStim',handle:'All'}, //Hide the instructions
					{type:'setInput',input:{handle:'endTrial', on:'timeout',duration:500}} //In 500ms: end the trial. In the mean time, we get a blank screen.
				]
			},
			{
				conditions: [{type:'inputEquals',value:'endTrial'}], //What to do when endTrial is called.
				actions: [
					{type:'endTrial'} //End the trial
				]
			}
		]
	});

	//console.log('after inst trials');
    /***********************************************
    // Main trials
     ***********************************************/

    API.addTrialSets('endOfPractice',{
        input: [ 
			{handle:'end', on: 'timeout', duration: 0}
        ],
        interactions: [
            {
                conditions: [
                    {type:'custom',fn: function(){return global.current.score < current.minScore4exp;}}
                ],
                actions: [
                    {type:'custom',fn: function(){global.current.score=0;}},
                    {type:'endTrial'}				
                ]
            },  
            {
                conditions: [ 
                    {type:'custom',fn: function(){return global.current.score >= current.minScore4exp;}}
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
                    {type:'custom',fn: function(){global.current.score=0;}},
                    {type:'endTrial'}                
                ]
            }
        ]
    });


    API.addTrialSets('main',[{ 
        data: {score:0},
        layout: [{inherit:'reminder'}],
		input: [
			{handle:'skip1',on:'keypressed', key:27} //Esc + Enter will skip blocks
		],
        interactions: [
            { 
                conditions: [{type:'begin'}],
                actions: [
                    {type:'showStim', handle:'fixation'},
                    {type:'custom',fn: function(){global.start_recording(global);}},
                    {type:'trigger', handle:'showTarget', duration: '<%= global.current.times.fixation_duration %>'}
                ]
            }, 

            {
                conditions:[{type:'inputEquals',value:'showTarget'}],
                actions: [
                    {type:'hideStim', handle:'fixation'}, 
				    {type:'showStim', handle: 'target'},
				    {type:'setInput', input:{handle:'i', on: 'keypressed', key: 'i'}},
				    {type:'setInput', input:{handle:'e', on: 'keypressed', key: 'e'}},
                    {type:'resetTimer'},
                    {type:'trigger',handle:'remove_target', duration: '<%= trialData.presentation_time %>'}
                ]
            },
           
           
           {
                conditions:[{type:'inputEquals',value:'remove_target'}],
                actions: [
                    {type:'hideStim', handle:'target'}, 
                    {type:'trigger',handle:'timeout', duration:'<%= global.current.times.stimulus_duration %>'}
                ]
            },
            
            { 
                conditions: [
                    {type:'inputEquals', value:["i", "e"]}, 
                    {type:'inputEqualsTrial', property:'correctKey'},
                    {type:'trialEquals', property:'block', value:'practice'}
                    
                ],
                actions: [
                    {type:'removeInput',handle:['All']},
                    {type:'setTrialAttr', setter:{score:1}},
                    {type:'hideStim', handle:['All']},
                    {type:'showStim', handle:'correct'},
                    {type:'custom',fn: function(){global.current.score++;}},

                    {type:'trigger', handle:'ITI', duration: '<%= global.current.times.feedback_duration %>'}
                ]
            }, 
           
            {
                conditions: [
                    {type:'inputEquals', value:["i", "e"]}, 
                    {type:'inputEqualsTrial', property:'correctKey'},
                    {type:'trialEquals', property:'block', value:'practice', negate:true}

                  ],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:1}},
                   
                    {type:'trigger', handle:'ITI'}
                ]
            }, 
            
         
           {
                conditions: [
                    {type:'inputEquals', value:["i", "e"]}, 
                    {type:'inputEqualsTrial', property:'correctKey', negate:true},
                    {type:'trialEquals', property:'block', value:'practice'}
                  ],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:0}},
                    {type:'hideStim', handle:['All']},

                     {type:'showStim', handle:'error'},

                    {type:'trigger', handle:'ITI', duration: '<%= global.current.times.feedback_duration %>'}
                ]
            }, 
            {
                conditions: [
                    {type:'inputEquals', value:["i", "e"]}, 
                    {type:'inputEqualsTrial', property:'correctKey', negate:true},
                    {type:'trialEquals', property:'block', value:'practice', negate:true}
                  ],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'setTrialAttr', setter:{score:0}},
                    {type:'trigger', handle:'ITI'}

                ]
            }, 
           
            {
                conditions: [
                    {type:'inputEquals',value:'timeout'},
                    {type:'trialEquals', property:'block', value:'practice', negate:true}
                ],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'hideStim', handle:['target']},

                    {type:'setTrialAttr', setter:{score:-1}},
                    {type:'custom',fn: function(){
                        current.timeouts++;
                    }},
                    {type:'trigger', handle:'ITI'}

                ]
            },
            
            {
                conditions: [
                    {type:'inputEquals',value:'timeout'},
                    {type:'trialEquals', property:'block', value:'practice'}
                ],
                actions: [
                    {type:'removeInput', handle:['All']},
                    {type:'hideStim', handle:['target']},

                    {type:'setTrialAttr', setter:{score:0}},
                    {type:'custom',fn: function(){
                        current.timeouts++;
                    }},
                    {type:'showStim', handle:'timeoutmessage'},
                    {type:'trigger', handle:'ITI', duration: '<%= global.current.times.feedback_duration %>'}

                ]
            }, 
           {
                conditions: [{type:'inputEquals', value:'ITI'}],
                actions:[
                    {type:'removeInput', handle:['All']},
                    {type:'hideStim', handle:['All']},

                    {type:'trigger', handle:'end',duration:'<%= global.current.times.iti_duration %>'}
                ]
            },

            {
                conditions: [{type:'inputEquals', value:'end'}],
                
                actions: [
                                        
                    {type:'hideStim', handle:['All']},
                    {type:'setTrialAttr',setter:function(trialData, eventData){
                        trialData.EBR = global.get_all(global);
                        // console.log(trialData.EBR);
                    }},

                    {type:'log'},
                    {type:'custom',fn: function(){console.log(global.current.score);}},

                    {type:'custom',fn: function(){global.stop_recording(global);}},


                    {type:'endTrial'}
                ]
            },
			// skip block
			{
				conditions: [{type:'inputEquals',value:'skip1'}],
				actions: [
					{type:'setInput',input:{handle:'skip2', on:'enter'}} // allow skipping if next key is enter.
				]
			},
			// skip block
			{
				conditions: [{type:'inputEquals',value:'skip2'}],
				actions: [
					{type:'goto', destination: 'nextWhere', properties: {blockStart:true}},
					{type:'endTrial'}
				]
			}
        ],
        stimuli : [
            {inherit:'error'},
            {inherit:'correct'},
            
            {inherit:'timeoutmessage'},
            {inherit:'fixation'}
        ]
    }]);

	//console.log('after main trial');

    /***********************************************
    // Specific trials
     ***********************************************/
    API.addTrialSet('stimulus_trial', {
        inherit: {set:'main', merge:['stimuli']},
        stimuli: [
            { media: {image:'<%= trialData.media %>'}, css:{cursor:'none', height: height+ 'px'}, handle:'target', data:{correctKey:'<%= trialData.correct %>'}}
        ]
    });


    var trials = [];


    trials.push({inherit: 'stimulus_trial', data: {presentation_time:400, media: 'imgs/colors/1a.png', correctKey:global.keys[0]}});
    trials.push({inherit: 'stimulus_trial', data: {presentation_time:400, media: 'imgs/colors/2a.png', correctKey:global.keys[1]}});

    trials.push({inherit: 'stimulus_trial', data: {presentation_time:400, media: 'imgs/colors/1b.png', correctKey:global.keys[0]}});
    trials.push({inherit: 'stimulus_trial', data: {presentation_time:400, media: 'imgs/colors/2b.png', correctKey:global.keys[1]}});

    trials.push({inherit: 'stimulus_trial', data: {presentation_time:400, media: 'imgs/colors/1c.png', correctKey:global.keys[0]}});
    trials.push({inherit: 'stimulus_trial', data: {presentation_time:400, media: 'imgs/colors/2c.png', correctKey:global.keys[1]}});






    API.addTrialSet('trials', trials);



	//console.log('before sequence');
    /***********************************************
    // Sequence
     ***********************************************/
    var sequence = [];
    sequence.push({inherit:'silentStart'}); //Maximize the video
    //First block is the usual
    //current.trials_per_condition = 1; //YBYB: remove soon
    

    sequence.push(
	    {
    	    inherit: {set:"inst", merge:['stimuli']}, 
    	    stimuli:[{media:{html:current.blockInst[0]}, css:{cursor:'none', color:'black'}, location:{top:'113px'}}]
	    },

        {
    		data: {practice:true},
		    inherit : {set:"startPractice"}
	    },
	    {
            mixer:'wrapper',
            data : [
                 {
        			mixer: 'random',
        			data: [
        				{   
        					mixer: 'repeat',
        					times: current.num_of_prac_trials,
        					data: [
                                {inherit:{set:'trials', type:'equalDistribution', n: current.num_of_prac_trials*10, seed: 'Practice'}, data:{block: 'practice'}}
        					]
        				}
        
        			]
        		},
            ]
        },
        {
		    inherit: {set:"endOfPractice"}
		},
		
		{
    		data: {practiceAgain:true},
	    
    	    inherit: {set:"inst", merge:['stimuli']}, 
    	    stimuli:[{media:{html:current.blockInst[2]}, css:{cursor:'none', color:'black'},  location:{top:'113px'}}]
		},

		{
		    inherit : {set:"startPracticeAgain"}
		},

	    
		{
		    data: {exp:true},
		    inherit: {set:"inst", merge:['stimuli']}, 
		    stimuli:[{media:{html:current.blockInst[1]}, css:{cursor:'none', color:'black'},  location:{top:'113px'}}]
		},
		
		
		{
            mixer:'wrapper',
            data : [
               
                 {
        			mixer: 'random',
        			data: [
        				{
        					mixer: 'repeat',
        					times: current.num_of_trials,
        					data: [
                                {inherit:{set:'trials', type:'equalDistribution', n: current.num_of_trials*10, seed: 'active'}, data:{block: 'exp'}}
        					]
        				}
        			]
        		}
            ]
        },
    	{
		    data: {exp:true},
		    inherit: {set:"inst", merge:['stimuli']}, 
		    stimuli:[{media:{html:current.blockInst[3]}, css:{cursor:'none', color:'black'},  location:{top:'113px'}}]
		},
		
		
		{
            mixer:'wrapper',
            data : [
               
                 {
        			mixer: 'random',
        			data: [
        				{
        					mixer: 'repeat',
        					times: current.num_of_trials,
        					data: [
                                {inherit:{set:'trials', type:'equalDistribution', n: current.num_of_trials*10, seed: 'active2'}, data:{block: 'exp_passive_'+global.passives[0]}}
        					]
        				}
        			]
        		}
            ]
        },
		{
		    data: {exp:true},
		    inherit: {set:"inst", merge:['stimuli']}, 
		    stimuli:[{media:{html:current.blockInst[4]}, css:{cursor:'none', color:'black'},  location:{top:'113px'}}]
		},
        {
            mixer:'wrapper',
            data : [
               
                 {
        			mixer: 'random',
        			data: [
        				{
        					mixer: 'repeat',
        					times: current.num_of_trials,
        					data: [
                                {inherit:{set:'trials', type:'equalDistribution', n: current.num_of_trials*10, seed: 'passive'}, data:{block: 'exp_passive_'+global.passives[1]}}
        					]
        				}
        			]
        		}
            ]
        }
    );
    
    sequence.push({inherit:'inst', stimuli:[{media:{html:'<div><p style="'+current.instStyle+'">' + 
    		'חלק זה של הניסוי הסתיים. להמשך, יש להקיש על מקש הרווח.' + 
    		"</p></div>"}}]});
    sequence.push({inherit:'silentEnd'});
    //console.log(sequence);
	API.addSequence(sequence);
	return API.script;
});
