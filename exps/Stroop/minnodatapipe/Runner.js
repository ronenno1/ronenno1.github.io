define(['managerAPI', 'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@0.1/datapipe.min.js'], function(Manager){

	var API    = new Manager();
    API.addSettings('rtl', true);
    // API.setName('taskNameTest');
    init_data_pipe(API, 'qH8i5g1AMmBd', 'csv', true);
    // init_data_pipe(API, 'qH8i5g1AMmBd', 'csv');
    // var APIglobal = API.getGlobal(); 

    // API.addSettings('logger', {
    //     // gather logs in array
    //     onRow: function(logName, log, settings, ctx){
    //         if (logName==='anonymous manager')
    //     {
    //             return;
    //     }
    //         if (!ctx.logs) ctx.logs = [];
    //         ctx.logs.push(log);
    //     },
    //     // onEnd trigger save (by returning a value)
    //     onEnd: function(name, settings, ctx){
    
    //         return ctx.logs;
    //     },
    //     // Transform logs into a string
    //     // we save as CSV because qualtrics limits to 20K characters and this is more efficient.
    //     serialize: function (logName, logs, settings, ctx) {
    //         // console.log({logName, logs, settings, ctx})
    //         return JSON.stringify(logs);
    //     },
    //     // Set logs into an input (i.e. put them wherever you want)
    //     send: function(logName, serialized, settings, ctx){
    //         // console.log({logName, serialized});
    //         if (logName===API.script.sequence[API.script.sequence.length-1].inherit)
    //         	return	fetch("https://pipe.jspsych.org/api/data/", {
    //                   method: "POST",
    //                   headers: {
    //                     "Content-Type": "application/json",
    //                     Accept: "*/*",
    //                   },
    //                   body: JSON.stringify({
    //                     experimentID: "qH8i5g1AMmBd",
    //                     filename: APIglobal.$postOnce.sessionId+".txt",
    //                     data: serialized
    //                   }),
    //                 });
    //     }
    // });

    
    // API.addSettings("logger", {
    // 	pulse: 0,
    // 	url: '',	
    // 	logfn: function(log,pagesData, global){
    // 		return 
    		
    // 		fetch("https://pipe.jspsych.org/api/data/", {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //             Accept: "*/*",
    //           },
    //           body: JSON.stringify({

    //             experimentID: "qH8i5g1AMmBd",
    //             filename: "3.csv",
    //             data: log
    //           }),
    //         });
    // 		;
    // 	}
    // });

    
    // API.addSettings('logger', {
    //     pulse: 300,
    //     // gather logs in array
    //         onRow: function(logName, log, settings, ctx){
    //             if (!ctx.logs) ctx.logs = [];
    //             ctx.logs.push(log);
    //         },
    //         // onEnd trigger save (by returning a value)
    //         onEnd: function(name, settings, ctx){
    //             console.log(name, settings)
    //             // const parsedData = JSON.parse(serialized);
    //             // const jsonKeys = Object.keys(parsedData[0]);
    //             // const headerData = jsonKeys.join(',');
    //             // const rowData = parsedData.map((item) => {
    //             //     return jsonKeys.map((key) => item[key]).join(',');
    //             // });
    //             // const csv = `${headerData}\n${rowData.join('\n')}`;
    
    //             return fetch("https://pipe.jspsych.org/api/data/", {
    //               method: "POST",
    //               headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "*/*",
    //               },
    //               body: JSON.stringify({
    
    //                 experimentID: "qH8i5g1AMmBd",
    //                 filename: name+"4.txt",
    //                 data: JSON.stringify(ctx.logs)
    //               }),
    //             });

    //         },
    //         // Transform logs into a string
    //         serialize: function(name, logs, settings){
    //             return JSON.stringify(logs);
    //         },

    //     send: function(name, serialized, settings, ctx){
            
    //     }
    // });

    var images2preload = [];

    var number = 0;
    var color_1 = 0;
    var color_2 = 0;
    var color_3 = 0;
    var color_4 = 0;
    
    var image_url = 'https://psych-studies.com/users/rhershman/dataPipe-62/v1/digits/';

    for (number = 1; number <= 4; number+=1) {
        images2preload.push(image_url+number+'d.png');
        images2preload.push(image_url+number+'r.png');
        images2preload.push(image_url+number+'t.png');
    }
    
    
    
    
     
     
    // for (color_1 = 1; color_1 <= 4; color_1++) {
    //     images2preload.push('neutral_digits2/1_1_'+color_1+'_'+color_1+'_'+color_1+'_'+color_1+'.png');

    // }


    // for (color_1 = 1; color_1 <= 4; color_1++){
    //     for (color_2 = 1; color_2 <= 4; color_2++){
    //         if (color_1==color_2)
    //             continue;
    //         images2preload.push('neutral_digits2/2_1_'+color_1+'_'+color_1+'_'+color_2+'_'+color_2+'.png');
    //     }
    // }
    // for (color_1 = 1; color_1 <= 4; color_1++){
    //     for (color_2 = 1; color_2 <= 4; color_2++){
    //         for (color_3 = 1; color_3 <= 4; color_3++){
    //                 if ([color_1, color_2, color_3].filter((x, i, a) => a.indexOf(x) == i).length<3)
    //                     continue;
    //                 images2preload.push('neutral_digits2/3_1_'+color_1+'_'+color_2+'_'+color_3+'.png');
    //         }
    //     }
    // }
    
    // for (color_1 = 1; color_1 <= 4; color_1++){
    //     for (color_2 = 1; color_2 <= 4; color_2++){
    //         for ( color_3 = 1; color_3 <= 4; color_3++){
    //             for (color_4 = 1; color_4 <= 4; color_4++){
    //                 if ([color_1, color_2, color_3, color_4].filter((x, i, a) => a.indexOf(x) == i).length<4)
    //                     continue;
    //                 images2preload.push('neutral_digits2/4_1_'+color_1+'_'+color_2+'_'+color_3+'_'+color_4+'.png');
    //             }
    //         }
    //     }
    // }

    // list = list.filter((x, i, a) => a.indexOf(x) == i)



        
    API.addSettings('preloadImages', images2preload);

    
	API.addTasksSet(
	{
        realstart: [{
            type: 'message',
            buttonText: 'המשך',

            name: 'realstart',
            templateUrl: 'realstart.jst',
            title: 'טופס הסכמה',
            piTemplate: false,
            header: 'ברוכים הבאים לניסוי'
        }],

        images: [{
            type: 'message',
            buttonText: 'המשך',

            name: 'images',
            templateUrl: 'images.jst',
            title: 'Objects',
            piTemplate: false
        }],
        
	    subject : 
		[{
			type: 'quest', piTemplate: true, name: 'subject', scriptUrl: 'subject.js', log:false
		}],
		prac :
		[{
			type: 'time', name: 'prac', scriptUrl: 'prac.js'
		}],
		welcome :
		[{
			type: 'time', name: 'welcome', scriptUrl: 'insts_v4.js?v=welcome', current: {type:'welcome'}
		}],

		Stroop :
		[{
			type: 'time', name: 'Stroop', scriptUrl: 'Stroop.js' 
		}],
	
		debriefing : [{
			type: 'quest', piTemplate: true, name: 'debriefing', scriptUrl: 'debriefing.js' 

		}],
		rest :
		[{
			type: 'time', name: 'rest', scriptUrl: 'insts_v4.js?v=rest', current: {type:'rest'}
		}],
		deb :
		[{
			type: 'time', name: 'deb', scriptUrl: 'insts_v4.js?v=deb', current: {type:'deb'}
		}],

		end :
		[{
			type: 'time', name: 'end', scriptUrl: 'insts_v4.js?v=end', current: {type:'end'}
		}]


	});

    //define the sequence of the study
    API.addSequence([
         {inherit: 'realstart'},
         {inherit: 'subject'},
         {inherit: 'welcome'},

        //{inherit: 'Stroop'},
         {inherit: 'deb'},

 {inherit: 'debriefing'},
         {inherit: 'end'}
	]);
	
	return API.script;
});
