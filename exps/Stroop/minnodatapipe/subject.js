define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            //header: 'Text questions',
            questions: [
                { // question begins
                    type: 'text',
                    name: 'subjectid',
                    stem: 'מספר זהות',
                    required: true,
                    errorMsg: {
                        required: 'Subject id is required!!'
                    }
                },

                { // question begins
                    type: 'text',
                    name: 'subjectName',
                    stem: 'שם מלא',
                    required: true,
                    errorMsg: {
                        required: 'Subject name is required!!'
                    }
                },
                { // question begins
                    type: 'text',
                    name: 'subjectGender',
                    stem: 'מין',
                    required: true,
                    errorMsg: {
                        required: 'Gender is required!!'
                    }
                },

                { // question begins
                    type: 'textNumber',
                    name: 'subjectAge',
                    stem: 'גיל',
                    required: true,
                    errorMsg: {
                        required: 'Subject age is required!!'
                    }
                }// question ends
            ]
        } // page ends

    ]);

    return API.script;
});
