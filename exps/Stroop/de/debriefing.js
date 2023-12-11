define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            //header: 'Text questions',
            questions: [
                { // question begins
                    type: 'textarea',
                    name: 'size',
                    stem: 'Welche Größe hat Ihr Bildschirm? Falls Sie nicht sicher sind, versuchen Sie die Größe abzuschätzen oder sagen Sie: „Ich weiß es nicht“.',
                    rows: 1,
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },
                
                { // question begins
                    type: 'textarea',
                    name: 'browser',
                    stem: 'Welchen Browser haben Sie für die Durchführung des Experiments benutzt?',
                    rows: 1,
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },
             
       
                { // question begins
                    type: 'textarea',
                    name: 'colours',
                    stem: 'Welche Farben kamen in dem Experiment vor?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },

               { // question begins
                    type: 'textarea',
                    name: 'shapes',
                    stem: 'Welche Formen kamen in dem Experiment vor?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },


                { // question begins
                    type: 'textarea',
                    name: 'tasks',
                    textProperty:'rightStem',
                    stem: 'Was war die Aufgabe bzw. was mussten Sie tun?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },

                { // question begins
                    type: 'textarea',
                    name: 'difficult',
                    stem: 'Waren einige Stimuli schwieriger als andere? Falls Sie diese Antwort mit „ja“ beantworten, welche Stimuli waren das?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },
                
                { // question begins
                    type: 'textarea',
                    name: 'strategy',
                    stem: 'Welche Strategie haben Sie während des Experiments benutzt?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },
                


              
             { // question begins
                    type: 'textarea',
                    name: 'distraction',
                    stem: 'Wie viele Unterbrechungen hatten Sie während des Experiments? Welcher Art waren die Unterbrechungen und an welchen Stellen im Experiment gab es diese Unterbrechungen?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'Bitte beantworten Sie diese Fragen'
                    }
                },

   
      
                { // question begins
                    type: 'textarea',
                    name: 'feedback',
                    stem: 'Weitere Anmerkungen:',
                    rows: 5
                }


            








            ]
        } // page ends

    ]);
    return API.script;
});
