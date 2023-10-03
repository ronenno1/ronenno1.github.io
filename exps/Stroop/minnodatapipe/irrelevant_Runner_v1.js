define(['managerAPI'], function(Manager){

	var API    = new Manager();
    API.addSettings('rtl', true);
    var tasks = API.shuffle(['st', 'nst', 'sst', 'snst', 'neuW']);
    console.log(tasks[0]);
	API.addTasksSet(
	{
        realstart: [{
            type: 'message',
            buttonText: 'המשך',

            name: 'realstart',
            templateUrl: 'realstart.jst',
            title: 'טופס הסכמה',
            piTemplate: true,
            header: 'ברוכים הבאים לניסוי'
        }],

        images: [{
            type: 'message',
            buttonText: 'המשך',

            name: 'images',
            templateUrl: 'images_v1.jst',
            title: 'Objects',
            piTemplate: true
        }],
        
	    subject : 
		[{
			type: 'quest', piTemplate: true, name: 'subject', scriptUrl: 'subject.js'
		}],
		prac :
		[{
			type: 'time', name: 'prac', scriptUrl: 'prac.js'
		}],
		Stroop_a :
		[{
			type: 'time', name: 'Stroop_a', scriptUrl: 'Stroop.js?v=a', current: {set2present:tasks[0]} 
		}],
		Stroop_b :
		[{
			type: 'time', name: 'Stroop_b', scriptUrl: 'Stroop.js?v=b', current: {set2present:tasks[1]} 
		}],
		Stroop_c :
		[{
			type: 'time', name: 'Stroop_c', scriptUrl: 'Stroop.js?v=c', current: {set2present:tasks[2]} 
		}],
		Stroop_d :
		[{
			type: 'time', name: 'Stroop_d', scriptUrl: 'Stroop.js?v=d', current: {set2present:tasks[3]} 
		}],
		Stroop_e :
		[{
			type: 'time', name: 'Stroop_e', scriptUrl: 'Stroop.js?v=e', current: {set2present:tasks[4]} 
		}],
		debriefing : [{
			type: 'quest', piTemplate: true, name: 'debriefing', scriptUrl: 'debriefing.js' 

		}],
		welcome :
		[{
			type: 'time', name: 'welcome', scriptUrl: 'insts_v4.js?v=welcome', current: {type:'welcome'}
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
        {inherit: 'images'},
        {inherit: 'prac'},
        {inherit: 'welcome'},

        {inherit: 'Stroop_a'}, {inherit: 'rest'},
        {inherit: 'Stroop_b'}, {inherit: 'rest'},
        {inherit: 'Stroop_c'}, {inherit: 'rest'},
        {inherit: 'Stroop_d'}, {inherit: 'rest'},
        {inherit: 'Stroop_e'},
        {inherit: 'deb'},

        {inherit: 'debriefing'},
        {inherit: 'end'}
	]);
	
	return API.script;
});