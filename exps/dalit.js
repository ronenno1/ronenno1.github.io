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
            inst_welcome : `<p>ברוכים הבאים לניסוי הערכת משפטים</p></br>

                            <p>במהלך הניסוי יוצגו לפניכם 140 משפטים</p>
                            <p>אתם תתבקשו לקרוא כול משפט, ולדמיין את עצמכם בסיטואציה המתוארת בו</p></br>
                            <p> לאחר שתסיימו לדמיין ליחצו על מקש רווח </p></br>
                            <p> המשפט יעלם מהמסך ואתם תתבקשו לענות על 9 שאלות לגבי המצב אותו דימיינתם</p></br>                          
                            <p>את התשובות המתאימות לכם תסמנו באמצעות מקשי המספרים של המקלדת</p></br>
                            
                            <p>לחצו מקש רווח על מנת להתחיל את הניסוי</p>`,
          

            inst_bye     : `<p>הניסוי הסתיים</p> 
                            <p>תודה על השתתפותכם</p>
                            <p>לסיום לחץ על מקש רווח</p>`
        },
        times: {
            fixation_duration : 500,
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
        defaultStim : [{css:{color:'black', 'font-size':'100px'}}],
        Q1          : [{inherit:'defaultStim', media: 'שאלה 1'}],
        Q2          : [{inherit:'defaultStim', media: 'שאלה 2'}],    
	    Q3          : [{inherit:'defaultStim', media: 'שאלה 3'}],
        Q4          : [{inherit:'defaultStim', media: 'שאלה 4'}],      
	    Q5          : [{inherit:'defaultStim', media: 'שאלה 5'}],
        Q6          : [{inherit:'defaultStim', media: 'שאלה 6'}],    
	    Q7          : [{inherit:'defaultStim', media: 'שאלה 7'}],
        Q8          : [{inherit:'defaultStim', media: 'שאלה 8'}], 
	    Q9          : [{inherit:'defaultStim', media: 'שאלה 9'}]   
	    
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
        		    {type:'setInput', input:{handle:'qest', on: 'keypressed', key: ' '}},
        		    {type:'showStim', handle: 'target'},
                    {type:'resetTimer'},
                ]
            },
            {
                conditions: [{type:'inputEquals', value:'qest'}], 
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q1_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q1_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q1_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q1_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q1_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q1_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q1_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q1_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q1_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q1'},
                ]
            }, 	


            {
                conditions: [
                    {type:'inputEquals', value:['q1_1', 'q1_2', 'q1_3', 'q1_4', 'q1_5', 'q1_6', 'q1_7', 'q1_8', 'q1_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q2_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q2_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q2_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q2_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q2_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q2_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q2_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q2_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q2_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q2'},
                ]
            }, 
            
            {
                conditions: [
                    {type:'inputEquals', value:['q2_1', 'q2_2', 'q2_3', 'q2_4', 'q2_5', 'q2_6', 'q2_7', 'q2_8', 'q2_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q3_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q3_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q3_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q3_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q3_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q3_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q3_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q3_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q3_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q3'},
                ]
            }, 
            
            {
                conditions: [
                    {type:'inputEquals', value:['q3_1', 'q3_2', 'q3_3', 'q3_4', 'q3_5', 'q3_6', 'q3_7', 'q3_8', 'q3_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q4_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q4_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q4_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q4_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q4_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q4_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q4_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q4_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q4_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q4'},
                ]
            }, 
            
            
            {
                conditions: [
                    {type:'inputEquals', value:['q4_1', 'q4_2', 'q4_3', 'q4_4', 'q4_5', 'q4_6', 'q4_7', 'q4_8', 'q4_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q5_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q5_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q5_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q5_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q5_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q5_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q5_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q5_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q5_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q5'},
                ]
            }, 
            
            {
                conditions: [
                    {type:'inputEquals', value:['q5_1', 'q5_2', 'q5_3', 'q5_4', 'q5_5', 'q5_6', 'q5_7', 'q5_8', 'q5_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q6_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q6_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q6_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q6_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q6_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q6_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q6_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q6_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q6_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q6'},
                ]
            }, 
            
            {
                conditions: [
                    {type:'inputEquals', value:['q6_1', 'q6_2', 'q6_3', 'q6_4', 'q6_5', 'q6_6', 'q6_7', 'q6_8', 'q6_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q7_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q7_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q7_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q7_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q7_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q7_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q7_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q7_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q7_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q7'},
                ]
            }, 
            
            
            {
                conditions: [
                    {type:'inputEquals', value:['q7_1', 'q7_2', 'q7_3', 'q7_4', 'q7_5', 'q7_6', 'q7_7', 'q7_8', 'q7_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q8_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q8_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q8_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q8_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q8_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q8_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q8_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q8_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q8_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q8'},
                ]
            }, 
            
            {
                conditions: [
                    {type:'inputEquals', value:['q8_1', 'q8_2', 'q8_3', 'q8_4', 'q8_5', 'q8_6', 'q8_7', 'q8_8', 'q8_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
        		    {type:'setInput', input:{handle:'q9_1', on: 'keypressed', key: '1'}},
        		    {type:'setInput', input:{handle:'q9_2', on: 'keypressed', key: '2'}},
        		    {type:'setInput', input:{handle:'q9_3', on: 'keypressed', key: '3'}},
        		    {type:'setInput', input:{handle:'q9_4', on: 'keypressed', key: '4'}},
        		    {type:'setInput', input:{handle:'q9_5', on: 'keypressed', key: '5'}},
        		    {type:'setInput', input:{handle:'q9_6', on: 'keypressed', key: '6'}},
        		    {type:'setInput', input:{handle:'q9_7', on: 'keypressed', key: '7'}},
        		    {type:'setInput', input:{handle:'q9_8', on: 'keypressed', key: '8'}},
        		    {type:'setInput', input:{handle:'q9_9', on: 'keypressed', key: '9'}},
                    {type:'resetTimer'},
        		    {type:'showStim', handle: 'Q9'},
                ]
            }, 
            
            {
                conditions: [
                    {type:'inputEquals', value:['q9_1', 'q9_2', 'q9_3', 'q9_4', 'q9_5', 'q9_6', 'q9_7', 'q9_8', 'q9_9']}
                ],
                actions: [
                    {type:'hideStim', handle:'All'},
                    {type:'log'},
                    {type:'removeInput', handle:['All']},
                    {type:'endTrial'}
                ]
            }, 
            
            
            
            {
                conditions: [{type:'inputEquals', value:'end'}],
                actions: [{type:'endTrial'}]
            }
        ],
        stimuli : [
            {inherit:'Q1'},
            {inherit:'Q2'},
            {inherit:'Q3'},
            {inherit:'Q4'},
            {inherit:'Q5'},
            {inherit:'Q6'},
            {inherit:'Q7'},
            {inherit:'Q8'},
            {inherit:'Q9'},
            { media: '<%= trialData.text %>', css:{fontSize: '100px'}, handle:'target', data:{sid:'<%= trialData.sid %>'}}


        ]
    }]);

    /***********************************************
    // Specific color trials
     ***********************************************/

    
    
    API.addTrialSet('scripts', [
        {inherit: 'stimulus_trial', data: {text: 'תסריט מספר 1', sid: 1}},
        {inherit: 'stimulus_trial', data: {text: 'תסריט מספר 2', sid: 2}},
        {inherit: 'stimulus_trial', data: {text: 'תסריט מספר 3', sid: 3}},
        {inherit: 'stimulus_trial', data: {text: 'תסריט מספר 4', sid: 4}},
        {inherit: 'stimulus_trial', data: {text: 'תסריט מספר 5', sid: 5}},
        {inherit: 'stimulus_trial', data: {text: 'תסריט מספר 6', sid: 6}},
        {inherit: 'stimulus_trial', data: {text: 'תסריט מספר 7', sid: 7}},
        {inherit: 'stimulus_trial', data: {text: 'תסריט מספר 8', sid: 8}}
    ]);
   
    /***********************************************
    // Sequence
     ***********************************************/

	API.addSequence([
	    {
		    inherit : {set:"inst_welcome"}
	    },
	    {
	        
			mixer: 'random',
			data: [
				{   
				    
					mixer: 'repeat',
					times: 8,
					data: [
                        {inherit:{set:'scripts', type:'equalDistribution', n: 8, seed:'a'}, data:{block: 'practice'}}
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
