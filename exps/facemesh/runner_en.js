define(['managerAPI', 
'minno_mesh.js',
'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js'], function(Manager, minno_mesh, facemesh, facemesh2){



    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pt = urlParams.get('pt');
    const survey_code = urlParams.get('id');

    const url = window.location.href;
	var API    = new Manager();

    var instStyle = "font-size:20px; text-align:middle;  margin-right:10px; font-family:arial";
    
    var global = API.getGlobal(); 
    
    // var stims = ['imgs/Stroop/1_1.bmp', 'imgs/Stroop/1_2.bmp', 'imgs/Stroop/2_1.bmp', 'imgs/Stroop/2_2.bmp', 'imgs/Stroop/3_1.bmp', 'imgs/Stroop/3_2.bmp'];
    var stims = ['imgs/colors/1a.png', 'imgs/colors/2a.png', 'imgs/colors/1b.png', 'imgs/colors/2b.png', 'imgs/colors/1c.png', 'imgs/colors/2c.png'];

    API.addSettings('preloadImages', stims);
    global.init_minno_mesh = init_minno_mesh;
    global.keys =  API.shuffle(['i', 'e']),
    global.passives =  API.shuffle(['red', 'green']),

    global.mins = 10;
    //global.detectionCycleDuration = 90;
    global.kickout = false; //Should we kick them out due to error responses?

    // init_minno_faces(global, faceapi); // This function load minno_faces components

    //global.enoughTime = Math.random() > 0.5 ? 300 : 450;
    global.enoughTime = 200;
    global.get_times = get_times;
    function get_times(){
        return global.time_n - global.time_n_1;
    }
    var noticeInst = 'At the bottom, you can see what your webcam shows. </br>' + 
        'Your face must be in the middle of the square for our software to detect your eyes. </br>' + 
        'If the frame is green, your eyes are well detected. If the frame is red, there is a problem detecting your eyes. </br>'
        'Please ensure that only one person <b>(you)</b> is in front of the screen during the experiment'
    


     var MainInst = '<p>Your task is to decide as quickly as possible what the colour of the stimulus is.</br></p>'+
                    '<p>If the stimulus is  <b>green</b> press the  <b>'+global.keys[0].toUpperCase()+'</b> key on the keyboard </p>'+
                    '<p>If the stimulus is <b>red</b>  press the  <b>'+global.keys[1].toUpperCase()+'</b> key on the keyboard </p></br>'+

                    '<p style="font-weight: bold;">Please look at the centre of the screen throughout the experiment.</p></br>'+

                            '<p>Please rest your fingers on the corresponding keys now, and remember:</p>'+

                            '<p> <b>'+ global.keys[0].toUpperCase() +'</b> = green </p>'+
                            '<p> <b>'+ global.keys[1].toUpperCase() +'</b> = red </p>'+

                     '<br/>' + 
	                noticeInst ;
	                
	                
     var MainInst2 = '<p>Your task is to count the <b>'+global.passives[0]+'</b> stimuli.</br></p>'+
                    '<p>At the end of the experiment you will be asked to report the exact number </p>'+

                    '<p style="font-weight: bold;">Please look at the centre of the screen throughout the experiment.</p></br>'+

                    '<p>There is no need to press any key while viewing the stimuli</p>'+
                     '<br/>' + 
	                noticeInst ;

     var MainInst3 = '<p>Your task is to count the <b>'+global.passives[1]+'</b> stimuli.</br></p>'+
                    '<p>At the end of the experiment you will be asked to report the exact number '+
                    ' (in addition to the '+
                    global.passives[0]+
                    ' stimuli you counted now).'+
                    '</p>'+
                    '<p style="font-weight: bold;">Please look at the centre of the screen throughout the experiment.</p></br>'+

                    '<p>There is no need to press any key while viewing the stimuli</p>'+
                     '<br/>' + 
                     '<br/>' + 
	                noticeInst ;

	API.addTasksSet(
	{

        
	    subject : 
		[{
			type: 'quest', piTemplate: true, name: 'subject', scriptUrl: 'subject_en.js'
		}],


		debriefing : [{
			type: 'quest', piTemplate: true, name: 'debriefing', scriptUrl: 'debriefing_en.js' 

		}],

		end :
		[{
			type: 'time', name: 'end', scriptUrl: 'insts_v4_en.js?v=end', current: {type:'end'}
		}],

        consent: [{
            type: 'message',

            name: 'consent',
            templateUrl: 'consent_en.jst',
            title: 'טופס הסכמה',

        }],

        commit: [{
            type: 'message',
            //buttonText: 'continue',

            name: 'commit',
            templateUrl: 'commit_en.jst',
            title: 'Commit'
        }],


		colors :
		[{
			type: 'time', name: 'colors', scriptUrl: 'colors_EBR_en.js' , 
			current: {
			    myID:'stroop',
			    maxTimeoutsInBlock:8,
			    maxFailedBlocks:2,
			    num_of_prac_trials:3, // 12     // 3
                minScore4exp: 0,      // 10     // 0
			    num_of_trials:5,     // 180    // 10
			    blockInst: [
			            
    	            '<div style="'+instStyle+'"><color="red">' +
                        '<p>In this part of the experiment you will be presented with coloured stimuli.</p>'+
                            MainInst+ 
                        '<p>Please press the spacebar to continue</p>'+ 
                    '</div>',
			            
			        ////////////////////////////////////////////////////////
		            '<div style="'+instStyle+'"><color="#000000">' +
		                '<p><b>The practice ended successfully!</b></p>'+
                        '<p> REMEMBER: In this part of the experiment you will be presented with coloured stimuli.</p>'+
                            MainInst+ 
                        '<p>Please press the spacebar to continue.</p>'+
                    '</div>',

			        ////////////////////////////////////////////////////////
			        '<div style="'+instStyle+'"><color="#000000">' +
    	                '<p><b>The practice ended without success. We will try again!</b></p>'+
                        '<p> REMEMBER: In this part of the experiment you will be presented with coloured stimuli.</p>'+
                            MainInst+ 
                        '<p>Please press the spacebar to continue.</p>'+
                    '</div>',
                    			        ////////////////////////////////////////////////////////
			        '<div style="'+instStyle+'"><color="#000000">' +
    	                '<p><b><p>This part is done. </p>'+
    	                '<p>Please take a few moments to rest before we continue.</p></br>'+
    	                '<p><b>Now the task is changed!</b></p></br>'+
                            MainInst2+
                        '<p>Please press the spacebar to continue.</p>'+
                        
                    '</div>',
                    			        ////////////////////////////////////////////////////////
			        '<div style="'+instStyle+'"><color="#000000">' +
    	                '<p><b><p>This part is done. </p>'+
    	                '<p>Please take a few moments to rest before we continue.</p></br>'+
    	                '<p><b>Now the task is changed!</b></p></br>'+
                            MainInst3+
                        '<p>Please press the spacebar to continue.</p>'+
                        
                    '</div>'
		        ]
			}
		}],


        redirect:
        [{ 

            type:'redirect', name:'redirect', url    : !!survey_code ? url+'&pt='+global.$postOnce.sessionId : url+'?pt='+global.$postOnce.sessionId
        }],
        redirect_end:
        [{ 
            // type:'redirect', name:'redirecting', url: 'ahttps://app.prolific.co/submissions/complete?cc=335B4DE6' //YBYB: replace the BROKEN with an id from prolific

            type:'redirect', name:'redirect_end', url: 'https://bgupsyc.sona-systems.com/webstudy_credit.aspx?experiment_id=3261&credit_token=65ff9ee5f1b74fda88fccf252da488b3&survey_code='+survey_code //YBYB: replace the BROKEN with an id from prolific
        }],

	});

    //define the sequence of the study
    if (!!pt)
    API.addSequence([

        {inherit: 'debriefing'},
        {inherit: 'end'},
        // {inherit: 'redirect_end'}
	]);
	
    else
    API.addSequence([
       
        {inherit: 'consent'},
        {inherit: 'commit'},
        {inherit: 'subject'},


        {inherit: 'colors'},

        {inherit: 'redirect'}
        
	]);
	
	return API.script;
});
