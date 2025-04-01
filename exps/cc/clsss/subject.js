define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            //header: 'Text questions',
            questions: [
                { // question begins
                    type: 'text',
                    name: 'name',
                    stem: 'Name:',
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    },
                    onSubmit: function(log, current){
                        window.piGlobal.name = log.response;
                    },
                }
                    
                
                // question ends
            ]
        } // page ends

    ]);

    return API.script;
});
