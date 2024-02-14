define(['questAPI'], function(Quest){
    var API = new Quest();

    API.addSequence([
        { // page begins
            //header: 'Text questions',
            questions: [
                { // question begins
                    type: 'textNumber',
                    name: 'concave',
                    stem: 'מה מספר האובייקטים האדומים שהופיעו במטלה בה התבקשת לספור את האובייקטים האדומים?',
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
                { // question begins
                    type: 'textNumber',
                    name: 'convex',
                    stem: 'מה מספר האובייקטים הירוקים שהופיעו במטלה בה התבקשת לספור את האובייקטים הירוקים?',
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
                { // question begins
                    type: 'textarea',
                    name: 'device',
                    stem: 'באיזה מכשיר השתמשת בניסוי?',
                    rows: 1,
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
                
                { // question begins
                    type: 'textarea',
                    name: 'browser',
                    stem: 'באיזה דפדפן השתמשת בניסוי?',
                    rows: 1,
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
                { // question begins
                    type: 'textarea',
                    name: 'colors',
                    stem: 'אילו צבעים הופיעו בניסוי?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
                { // question begins
                    type: 'textarea',
                    name: 'words',
                    textProperty:'rightStem',
                    stem: 'אילו אובייקטים הופיעו בניסוי?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
              
                { // question begins
                    type: 'textarea',
                    name: 'difficult',
                    stem: 'האם היו אובייקטים מסוימים שהיה קשה יותר להגיב אליהם?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },

                { // question begins
                    type: 'textarea',
                    name: 'easy',
                    stem: 'האם היו אובייקטים מסוימים שהיה קל יותר להגיב אליהם?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
                { // question begins
                    type: 'textarea',
                    name: 'strategy',
                    stem: 'באיזו אסטרטגיה השתמשת בניסוי על מנת להצליח במטלה?',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
                { // question begins
                    type: 'textarea',
                    name: 'distraction',
                    stem: 'כמה הסחות דעת / הפרעות חיצוניות היו לך במהלך הניסוי? תאר אילו הסחות דעת ובאילו שלב של הניסוי הן היו',
                    rows: 3,
                    required: true,
                    errorMsg: {
                        required: 'נא להשיב על השאלה!!'
                    }
                },
                
                { // question begins
                    type: 'textarea',
                    name: 'feedback',
                    stem: 'משהו נוסף שחשוב שנדע?',
                    rows: 3,
                    required: false
                }

            ]
        } // page ends

    ]);

    return API.script;
});
