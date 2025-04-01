define(['managerAPI', 'datapipe.js'], function(Manager){

	var API    = new Manager();
	
	//const subid = Date.now().toString(16)+Math.floor(Math.random()*10000).toString(16);
    init_data_pipe(API, 'qH8i5g1AMmBd',  {file_type:'csv', debug:true});


	API.addTasksSet(
	{

        subject : 
		[{
			type: 'quest', piTemplate: true, name: 'subject', scriptUrl: 'subject.js'
		}],        
{
      type: 'message',
      keys: ' ',
      template:
        '<div class="panel panel-info" style="margin-top:1em">' +

          'Your answer was detected! Thank you!' +

        '</div>'
    }

           
	});


        API.addSequence([
            {inherit: 'subject'}
	    ]);

	    
	
	
	return API.script;
});
