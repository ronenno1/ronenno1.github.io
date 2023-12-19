define(['managerAPI',
        'minno_mesh.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js', 'datapipe.js'], function(Manager, minno_mesh, facemesh, facemesh2){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pt = urlParams.get('pt');


    var API    = new Manager();
    init_data_pipe(API, 'qH8i5g1AMmBd',  {file_type:'csv', debug:true});

    var instStyle = "font-size:20px; text-align:middle;  margin-right:10px; font-family:arial";
    
    var global = API.getGlobal(); 
    
    var stims = ['imgs/Stroop/1_1.bmp', 'imgs/Stroop/1_2.bmp', 'imgs/Stroop/2_1.bmp', 'imgs/Stroop/2_2.bmp', 'imgs/Stroop/3_1.bmp', 'imgs/Stroop/3_2.bmp'];
    
    API.addSettings('preloadImages', stims);
    global.init_minno_mesh = init_minno_mesh;
    global.keys =  API.shuffle(['i', 'e']);
    

    var noticeInst = '<b>Am unteren Rand des Bildschirmes sehen sie Ihre Webcamaufnahme. <br>' + 
        'Ihr Gesicht sollte sich in der Mitte des Rechteckes befinden, damit das Programm Ihre Augen erkennen kann. <br></br>' + 
        '<u>Wenn der Rahmen grün erscheint werden Ihre Augen erkannt. Wenn der Rahmen Rot erscheint, kann das Programm Ihre Augen nicht erkennen.<br><br>'+
        'Bitte stellen Sie sicher, dass sich nur eine Person (Sie) während dem Experiment vor dem Bildschirm befindet. </u><br><br>';


     var MainInst = '<p>Ihre Aufgabe ist es, so rasch als möglich zu entscheiden, welche Farbe das gezeigte Rechteck oder Wort hat.</br></p>'+
                    '<p>Wenn die Farbe <b>ROT</b> ist, drücken Sie bitte die <b>'+global.keys[0].toUpperCase()+'-Taste</b></p>'+
                    '<p>Wenn die Farbe <b>BLAU</b> ist, drücken Sie bitte die <b>'+global.keys[1].toUpperCase()+'-Taste</b></p></br>'+

                    '<p style="font-weight: bold;">Bitte schauen Sie während der Dauer des gesamten Experiments auf die Mitte des Bildschirms.</p></br>'+

                    '<p>Legen Sie die Finger nun auf die Tasten '+global.keys[0].toUpperCase()+', und '+global.keys[1].toUpperCase()+'.</p>'+
                     '<br/>' + 
	                noticeInst ;

	API.addTasksSet(
	{

        
	commit: [{
            type: 'message',
            //buttonText: 'continue',

            name: 'commit',
            templateUrl: 'commit.jst',
            title: 'Commit',
            header: 'Wichtige Anmerkung!', 
            buttonText: 'Fortfahren'
        }],
        consent: [{
            type: 'message',

            name: 'consent',
            templateUrl: 'consent.jst',
            title: 'Consent Form',
            header: 'Danke für Ihre Teilnahme an diesem Experiment!',
            buttonText: 'Fortfahren',

        }],
        subject : 
		[{
			type: 'quest', piTemplate: true, name: 'subject', scriptUrl: 'subject.js'
		}],        
        subject2 : 
		[{
			type: 'quest', piTemplate: true, name: 'subject2', scriptUrl: 'subject2.js'
		}],        
		

        Stroop :
		[{
			type: 'time', name: 'Stroop', scriptUrl: 'Stroop_EBR.js' , 
			current: {
			    myID:'stroop',
			    maxTimeoutsInBlock:8,
			    maxFailedBlocks:2,
			    num_of_prac_trials:0, // 4
                minScore4exp: 0,      // 8
			    num_of_trials:1,     // 60
			    blockInst: [
			            
    	            '<div style="'+instStyle+'"><color="FFFFFF">' +
                        '<p>In diesem Teil des Experimentes sehen Sie Farben.</p>'+
                            MainInst+ 
                        '<p>Drücken Sie die Leertaste, um den Übungslauf zu beginnen.</p>'+
                        
                    '</div>',
			            
			        ////////////////////////////////////////////////////////
		            '<div style="'+instStyle+'"><color="FFFFFF">' +
		                '<p><b>Der Übungsteil ist geschafft!</b></p>'+
                        '<p>Zur Erinnerung: In diesem Teil des Experimentes sehen Sie Farben.</p>'+
                            MainInst+ 
                        '<p>Drücken Sie die Leertaste, um mit dem Experiment zu beginnen.</p>'+
                    '</div>',
			        ////////////////////////////////////////////////////////
			        '<div style="'+instStyle+'"><color="FFFFFF">' +
    	                '<p><b>Zeit für eine kurze Pause!</b></p>'+
                        '<p>Zur Erinnerung: In diesem Teil des Experimentes sehen Sie Farben.</p>'+
                            MainInst+ 
                        '<p>Drücken Sie die Leertaste, um fortzufahren.</p>'+
                        
                    '</div>',
			        ////////////////////////////////////////////////////////
			        '<div style="'+instStyle+'"><color="FFFFFF">' +
    	                '<p><b>Das war nicht ganz richtig. Starten wir einen neuen Versuch.</b></p>'+
                        '<p>Zur Erinnerung: In diesem Teil des Experimentes sehen Sie Farben.</p>'+
                            MainInst+ 
                        '<p>Drücken Sie die Leertaste, um den Übungslauf neu zu beginnen.</p>'+
                    '</div>'
		        ]
			}
			
		}],

        




		


        redirect:
        [{ 

            type:'redirect', name:'redirecting', url    : '?pt='+global.sessionId, 
        }],
        redirect2:
        [{ 

            type:'redirect', name:'redirecting', url : 'https://www.haaretz.co.il'
        }],
       
	});

    //define the sequence of the study
    if (!!pt)
    API.addSequence([

            {inherit: 'subject2'},
            {inherit: 'consent'},
            {inherit: 'redirect2'}     
    	]);
	else
        API.addSequence([

            {inherit: 'Stroop'},
            {inherit: 'consent'},
            {inherit: 'redirect'}
            
	    ]);

	    
	
	
	return API.script;
});
