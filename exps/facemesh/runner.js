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
    API.addSettings('rtl', true);

    var instStyle = "font-size:20px; text-align:middle;  margin-right:10px; font-family:arial";
    
    var global = API.getGlobal(); 
    
    // var stims = ['imgs/Stroop/1_1.bmp', 'imgs/Stroop/1_2.bmp', 'imgs/Stroop/2_1.bmp', 'imgs/Stroop/2_2.bmp', 'imgs/Stroop/3_1.bmp', 'imgs/Stroop/3_2.bmp'];
    var stims = ['imgs/colors/1a.png', 'imgs/colors/2a.png', 'imgs/colors/1b.png', 'imgs/colors/2b.png', 'imgs/colors/1c.png', 'imgs/colors/2c.png'];

    API.addSettings('preloadImages', stims);
    global.init_minno_mesh = init_minno_mesh;
    global.keys =  API.shuffle(['i', 'e']),
    global.passives =  API.shuffle(['אדומים', 'ירוקים']),

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
        var noticeInst = 'בתחתית המסך ניתן לראות את מה שמזוהה על ידי המצלמה שלך. ' + 
        'הפנים שלך צריכים להיות במרכז המלבן על מנת שהתוכנה שלנו תוכל לזהות את העיניים שלך. ';

    
    var noticeInst = '<b>בתחתית המסך ניתן לראות את מה שמזוהה על ידי המצלמה שלך. <br>' + 
        'הפנים שלך צריכים להיות במרכז המלבן על מנת שהתוכנה שלנו תוכל לזהות את העיניים שלך. <br></br>' + 
        '<u> אם המסגרת ירוקה, העיניים שלך מזוהות כהלהכה. אם המסגרת אדומה, יש בעיה בזיהוי העיניים שלך.<br><br>'+
        'אנא ודא שרק אדם אחד (אתה) נמצא מול המסך במהלך הניסוי. </u><br><br>';


     var MainInst = '<p>המשימה שלך היא להחליט מהר ככל הניתן מהו הצבע של האוביקט.</br></p>'+
                    '<p>אם האוביקט  <b>ירוק</b> יש להקיש על  <b>'+global.keys[0].toUpperCase()+'</b> במקלדת </p>'+
                    '<p>אם האוביקט <b>אדום</b>  יש להקיש על  <b>'+global.keys[1].toUpperCase()+'</b> במקלדת </p></br>'+

                    '<p style="font-weight: bold;">נא להסתכל במרכז המסך למשך כל הניסוי.</p></br>'+

                    '<p>יש להניח את האצבעות כעת על המקשים '+global.keys[0].toUpperCase()+' ו '+global.keys[1].toUpperCase()+'.</p>'+
                     '<br/>' + 
	                noticeInst ;
	                
	                
     var MainInst2 = '<p>המשימה שלך היא לספור את מספר האובייקטים ה<b>'+global.passives[0]+'</b>.</br></p>'+
                    '<p>בסוף הניסוי תתבקש לדווח את המספר המדוייק.</p>'+

                    '<p style="font-weight: bold;">נא להסתכל במרכז המסך למשך כל הניסוי.</p></br>'+

                    '<p>אין צורך להקיש על שום מקש במהלך הצפייה בגירויים (מלבד לספירה המבוקשת עצמה)</p>'+
                     '<br/>' + 
	                noticeInst ;

     var MainInst3 = '<p>המשימה שלך היא לספור לספור את מספר האובייקטים ה<b>'+global.passives[1]+'</b>.</br></p>'+
                    '<p>בסוף הניסוי תתבקש לדווח את המספר המדוייק'+
                    ' (בנוסף למספר הפעמים שספרת עכשיו את מספר האובייקטים ה'+
                    global.passives[0]+
                    ').'+
                    '</p>'+
                    '<p style="font-weight: bold;">נא להסתכל במרכז המסך למשך כל הניסוי.</p></br>'+

                    '<p>אין צורך להקיש על שום מקש במהלך הצפייה בגירויים (מלבד לספירה המבוקשת עצמה)</p>'+
                     '<br/>' + 
                     '<br/>' + 
	                noticeInst ;

	API.addTasksSet(
	{

        
	    subject : 
		[{
			type: 'quest', piTemplate: true, name: 'subject', scriptUrl: 'subject.js'
		}],


		debriefing : [{
			type: 'quest', piTemplate: true, name: 'debriefing', scriptUrl: 'debriefing.js' 

		}],

		end :
		[{
			type: 'time', name: 'end', scriptUrl: 'insts_v4.js?v=end', current: {type:'end'}
		}],

        consent: [{
            type: 'message',

            name: 'consent',
            templateUrl: 'consent.jst',
            title: 'טופס הסכמה',

        }],

        commit: [{
            type: 'message',
            //buttonText: 'continue',

            name: 'commit',
            templateUrl: 'commit.jst',
            title: 'Commit'
        }],


		colors :
		[{
			type: 'time', name: 'colors', scriptUrl: 'colors_EBR.js' , 
			current: {
			    myID:'stroop',
			    maxTimeoutsInBlock:8,
			    maxFailedBlocks:2,
			    num_of_prac_trials:3, // 12     // 3
                minScore4exp: 0,      // 10     // 0
			    num_of_trials:5,     // 180    // 10
			    blockInst: [
			            
    	            '<div style="'+instStyle+'"><color="red">' +
                        '<p>בחלק הזה של הניסוי יוצגו בפניך אובייקטים בצבעים.</p>'+
                            MainInst+ 
                        '<p>לחץ/י על מקש הרווח על מנת להתחיל באימון.</p>'+
                        
                    '</div>',
			            
			        ////////////////////////////////////////////////////////
		            '<div style="'+instStyle+'"><color="#000000">' +
		                '<p><b>האימון הסתיים בהצלחה!</b></p>'+
                        '<p> תזכורת: בחלק הזה של הניסוי יוצגו בפניך אובייקטים בצבעים.</p>'+
                            MainInst+ 
                        '<p>לחץ/י על מקש הרווח על מנת להתחיל בניסוי.</p>'+
                    '</div>',

			        ////////////////////////////////////////////////////////
			        '<div style="'+instStyle+'"><color="#000000">' +
    	                '<p><b>האימון הסתיים ללא הצלחה. ננסה שוב!</b></p>'+
                        '<p> תזכורת: בחלק הזה של הניסוי יוצגו בפניך אובייקטים בצבעים.</p>'+
                            MainInst+ 
                        '<p>לחץ/י על מקש הרווח על מנת להתחיל שוב באימון.</p>'+
                    '</div>',
                    			        ////////////////////////////////////////////////////////
			        '<div style="'+instStyle+'"><color="#000000">' +
    	                '<p><b>הפסקה קצרה!</b></p></br>'+
    	                '<p style="color:#FF0000"><b>כעת המטלה שלך משתנה!</b></p></br>'+
                            MainInst2+
                        '<p>לחץ/י על מקש הרווח על מנת להמשיך בניסוי.</p>'+
                        
                    '</div>',
                    			        ////////////////////////////////////////////////////////
			        '<div style="'+instStyle+'"><color="#000000">' +
    	                '<p><b>הפסקה קצרה!</b></p></br>'+
    	                '<p style="color:#FF0000"><b>כעת המטלה שלך משתנה!</b></p></br>'+
                            MainInst3+
                        '<p>לחץ/י על מקש הרווח על מנת להמשיך בניסוי.</p>'+
                        
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
        {inherit: 'redirect_end'}
	]);
	
    else
    API.addSequence([
       
        // {inherit: 'consent'},
        // {inherit: 'commit'},
        // {inherit: 'subject'},

        {inherit: 'consent'},

        {inherit: 'colors'},
        {inherit: 'consent'},

        {inherit: 'redirect'}
        
	]);
	
	return API.script;
});
