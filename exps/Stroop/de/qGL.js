define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            //header: 'Text questions',
            questions: [
                { // question begins
                    type: 'textarea',
                    name: 'size',
                    stem: 'What is the size of your screen? If you don’t know for sure, please try to estimate or say “I don’t know”?',
                    rows: 1,
                    required: true,
                    errorMsg: {
                        required: 'Please answer this question!!'
                    }
                },
                
                { // question begins
                    type: 'textarea',
                    name: 'browser',
                    stem: 'Which browser did you use for this experiment?',
                    rows: 1,
                    required: true,
                    errorMsg: {
                        required: 'Please answer this question'
                    }
                },
             

               { // question begins
                    type: 'textarea',
                    name: 'shapes',
                    stem: 'Which objects appeared in the experiment?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Please answer this question'
                    }
                },


                { // question begins
                    type: 'textarea',
                    name: 'tasks',
                    textProperty:'rightStem',
                    stem: 'What did you have to do?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Please answer this question'
                    }
                },

                { // question begins
                    type: 'textarea',
                    name: 'difficult',
                    stem: 'Did you find some stimuli harder or easier than others? If the answer is yes, could you tell which ones?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Please answer this question'
                    }
                },
                
                { // question begins
                    type: 'textarea',
                    name: 'strategy',
                    stem: 'Which strategy did you use in the experiment?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Please answer this question'
                    }
                },
                


              
             { // question begins
                    type: 'textarea',
                    name: 'distraction',
                    stem: 'How many interruptions did you have during the experiment? What were they and at which parts of the experiment they occurred?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Please answer this question'
                    }
                },

   
      
                { // question begins
                    type: 'textarea',
                    name: 'feedback',
                    stem: 'Other comments?',
                    rows: 5
                }


            ]
        } // page ends

    ]);
    return API.script;
});
