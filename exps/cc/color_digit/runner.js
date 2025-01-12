define(['managerAPI', 'datapipe.js'], function(Manager){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pt = urlParams.get('pt');


	var API    = new Manager();
	
	
	    var images2preload = [];

    var number = 0;
    var color_1 = 0;
    var color_2 = 0;
    var color_3 = 0;
    var color_4 = 0;
    

    for (number = 1; number <= 4; number+=1) {
        for (color_1 = 1; color_1 <= 4; color_1++) {
            images2preload.push('digits/1_'+number+'_'+color_1+'_'+color_1+'_'+color_1+'_'+color_1+'.png');

        }
    }
    
    
    for (number = 1; number <= 4; number+=1){
        for (color_1 = 1; color_1 <= 4; color_1++){
            for (color_2 = 1; color_2 <= 4; color_2++){
                if (color_1==color_2)
                    continue;
                images2preload.push('digits/2_'+number+'_'+color_1+'_'+color_1+'_'+color_2+'_'+color_2+'.png');
            }
        }
    }
    
    for (number = 1; number <= 4; number+=1){
        for (color_1 = 1; color_1 <= 4; color_1++){
            for (color_2 = 1; color_2 <= 4; color_2++){
                for (color_3 = 1; color_3 <= 4; color_3++){
                        if ([color_1, color_2, color_3].filter((x, i, a) => a.indexOf(x) == i).length<3)
                            continue;
                        images2preload.push('digits/3_'+number+'_'+color_1+'_'+color_2+'_'+color_3+'.png');
                }
            }
        }
    }
    for (number = 1; number <= 4; number+=1){
        for (color_1 = 1; color_1 <= 4; color_1++){
            for (color_2 = 1; color_2 <= 4; color_2++){
                for ( color_3 = 1; color_3 <= 4; color_3++){
                    for (color_4 = 1; color_4 <= 4; color_4++){
                        if ([color_1, color_2, color_3, color_4].filter((x, i, a) => a.indexOf(x) == i).length<4)
                            continue;
                        images2preload.push('digits/4_'+number+'_'+color_1+'_'+color_2+'_'+color_3+'_'+color_4+'.png');
                    }
                }
            }
        }
    }

	
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


        CD :
		[{
			type: 'time', name: 'CD', scriptUrl: 'CD.js' , 
			current: {
			    myID:'CD',
			    maxTimeoutsInBlock: 8,
			    maxFailedBlocks:    2,
			    num_of_prac_trials: 4,      // 4
                minScore4exp:       8,      // 8
			    num_of_trials:      20,     // 40
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
            {inherit: 'CD'},
            {inherit: 'uploading'},
	    ]);

	    
	
	
	return API.script;
});
