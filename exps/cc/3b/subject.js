define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            //header: 'Text questions',
            questions: [
                { // question begins
                    type: 'text',
                    name: 'subjectid',
                    stem: 'Matrikelnummer des/der Studierenden:',
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },

                { // question begins
                    type: 'textNumber',
                    name: 'subjectAge',
                    stem: 'Alter',
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },
                
                // question ends
            ]
        } // page ends

    ]);

    return API.script;
});
