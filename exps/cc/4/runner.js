define(['managerAPI', 'datapipe.js'], function(Manager){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pt = urlParams.get('pt');


	var API    = new Manager();
	//const subid = Date.now().toString(16)+Math.floor(Math.random()*10000).toString(16);
    init_data_pipe(API, 'qH8i5g1AMmBd',  {file_type:'csv', debug:true});
    console.log('');
    var instStyle = "font-size:20px; text-align:middle;  margin-right:10px; font-family:arial";
    
    var global = API.getGlobal(); 


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

        
	

        uploading: uploading_task({header: 'just a moment', body:'Just a moment... Loading... Please wait a litle bit...', buttonText: 'Click to exit'}),
        subject : 
		[{
			type: 'quest', piTemplate: true, name: 'subject', scriptUrl: 'subject.js'
		}],        


        flanker :
		[{
			type: 'time', name: '03_Flanker', scriptUrl: 'flanker.js' , 
			current: {
			    myID:'flanker',
			    maxTimeoutsInBlock: 8,
			    maxFailedBlocks:    2,
			    num_of_prac_trials: 4,      // 4
                minScore4exp:       8,      // 8
			    num_of_trials:      40,     // 40
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
			
		}]
       
	});


        API.addSequence([
            {inherit: 'subject'},
            {inherit: 'flanker'},
            {inherit: 'uploading'},
	    ]);

	    
	
	
	return API.script;
});s
