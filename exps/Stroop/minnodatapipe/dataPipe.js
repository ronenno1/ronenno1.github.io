function init_data_pipe(API, experimentID, file_type='json') {
    file_type = file_type.toLowerCase();
    var APIglobal = API.getGlobal(); 
    const manager_name = API.script.name;
    let data = '';
    API.addSettings('logger', {
        // gather logs in array
        onRow: function(logName, log, settings, ctx){

            if (logName===manager_name) 
            {
                ctx.logs = [];
                ctx.type = 'anonymous manager';
                return;
            }
            ctx.type = 'task';
            if (!ctx.logs) ctx.logs = [];
            ctx.logs.push(log);
        },
        // onEnd trigger save (by returning a value)
        onEnd: function(name, settings, ctx){
    
            return ctx.logs;
        },
        // Transform logs into a string
        serialize: function (logName, logs, settings, ctx) {
            return logs;
        },
        // Set logs into an input (i.e. put them wherever you want)
        send: function(logName, serialized, settings, ctx){
            console.log(file_type);
            let data = '';

            if (file_type ==='csv'){
                data = toCsv(pivot(serialized));
            }
            if (file_type ==='tsv'){
                data = toCsv(pivot(serialized), '\t');
            }

            if (file_type ==='json'){
                data = JSON.stringify(serialized);
            }

            if (data && ctx.type==='task' && logName !== manager_name)
            {
                const hash = Date.now().toString(16)+Math.floor(Math.random()*10000).toString(16);

            	return	fetch("https://pipe.jspsych.org/api/data/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                      },
                      body: JSON.stringify({
                        experimentID: experimentID,
                        filename: logName+'_'+hash+'.'+file_type,
                        data: data
                      })
                   });
               }
        }
    });
}



function pivot(arr) {
    var mp = new Map();
    
    function setValue(a, path, val) {
        if (Object(val) !== val) { // primitive value
            var pathStr = path.join('.');
            var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
            a[i] = val;
        } else {
            for (var key in val) {
                setValue(a, key == '0' ? path : path.concat(key), val[key]);
            }
        }
        return a;
    }
    
    var result = arr.map( obj => setValue([], [], obj) );
    return [[...mp.keys()], ...result];
}

function toCsv(arr, separator=',') {
    console.log(arr);
    return arr.map( row => 
        row.map ( val => isNaN(val) ? JSON.stringify(val) : +val ).join(separator)
    ).join('\n');
}

// let getInitialVarMap = function(data) {
//     const defaultValueName = 'data'; // name used for non json items in data arrays

//     let varMap = {};
//     let varMaps = [];
//     Object.keys(data).forEach(function(key) {

//         if (key[0] == '_') {
//             return varMap;
//         }
//         let item = data[key];
//         if (key != 'data') //TODO: what to do if collision happens
//         {
//             if (varMap[key] == null) {
//                 varMap[key] = item;
//             }
//         }
//     });
//     let item = data.data;
//     /*try {
// 		item = JSON.parse(item);
// 	} catch (e) {}*/
//     let pushVarMaps = false;
//     if ((item!=null && item.length > 0 && typeof item == 'object')) {
//         item.forEach(function(row, index) {
//             if (Object.keys(row).length > 0 && typeof row == 'object') {
//                 varMaps.push(getVarMap(row, dataPrefix,  Object.assign({}, varMap)));//JSON.parse(JSON.stringify(varMap))));

//             } else {
//                 if (varMap[defaultValueName + varSplit + index] == null) {
//                     varMap[defaultValueName + varSplit + index] = row;
//                     pushVarMaps = true;
//                 }
//             }

//         });
//     } else {
//         varMap[defaultValueName] = item;
//         pushVarMaps = true;
//     }
//     if (pushVarMaps) {
//         varMaps.push(varMap);
//     }
//     console.log({data});

//     console.log({varMaps});
//     return varMaps;
// };


// let arrayToCsvString = function(theArray, separator) {
//     let newString = '';
//     if (theArray.length == 0) {
//         return '';
//     }
//     newString += csvEscape(theArray[0]);
//     for (let x = 1; x < theArray.length; x++) {
//         newString += separator + csvEscape(theArray[x]);
//     }
//     newString += '\n';
//     return newString;
// };


// let csvEscape = function(theString) {
//     if (typeof(theString)!=undefined && theString!==null) {
//         theString = theString + '';
//     } else {
//         return '';
//     }
//     if (theString.includes('"') || theString.includes(',') || theString.includes('\n') || theString.includes('\t')) {
//         let newString = '';
//         newString += '"';
//         for (let x = 0; x < theString.length; x++) {
//             newString += theString[x];
//             if (theString[x] == '"') {
//                 newString += '"'; //escape double quotes this way
//             }
//         }

//         newString += '"';
//         return newString;
//     } else {
//         return theString;
//     }
// };
