define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            //header: 'Text questions',
            questions: [
                { // question begins
                    type: 'text',
                    name: 'subjectid',
                    stem: 'Student ID',
                    required: true,
                    errorMsg: {
                        required: 'Subject id is required!!'
                    }
                },

                { // question begins
                    type: 'text',
                    name: 'subjectName',
                    stem: 'Full name',
                    required: true,
                    errorMsg: {
                        required: 'Subject name is required!!'
                    }
                },
                { // question begins
                    type: 'text',
                    name: 'subjectGender',
                    stem: 'Sex',
                    required: true,
                    errorMsg: {
                        required: 'Gender is required!!'
                    }
                },

                { // question begins
                    type: 'textNumber',
                    name: 'subjectAge',
                    stem: 'Age',
                    required: true,
                    errorMsg: {
                        required: 'Age is required!!'
                    }
                },

                { // question begins
                    type: 'text',
                    name: 'Handedness',
                    stem: 'Handedness',
                    required: true,
                    errorMsg: {
                        required: 'Handedness is required!!'
                    }
                },
                
                // question ends
            ]
        } // page ends

    ]);

    return API.script;
});
