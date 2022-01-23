const initialData = {
    results: {
        'result-1': { id: 'result-1', result: 24, title: "Calculation Title", filePath: "somewhere/someText.txt", inputContent: "8*3", index: 0 },
        'result-2': { id: 'result-2', result: 22.123, title: "Calc Title", filePath: "somewhere/someText.txt", inputContent: "8*3", index: 1 },
        'result-3': { id: 'result-3', result: 23.34, title: "Calc Title 2", filePath: "somewhere/someText.txt", inputContent: "8*3", index: 2 },
        'result-4': { id: 'result-4', result: 27.341, title: "Another Title", filePath: "somewhere/someText.txt", inputContent: "8*3", index: 3 },
        'result-5': { id: 'result-5', result: 721.21, title: "Calc Ttl", filePath: "somewhere/someText.txt", inputContent: "8*3", index: 4 },
        'result-6': { id: 'result-6', result: 29, title: "Exhausted Title", filePath: "somewhere/someText.txt", inputContent: "8*3", index: 5 },
        'result-7': { id: 'result-7', result: 9, title: "Small Title", filePath: "somewhere/someText.txt", inputContent: "8*3", index: 6 }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Results',
            resultIds: ['result-1', 'result-2', 'result-3', 'result-4', 'result-5', 'result-6', 'result-7'],
        }
    }
    // Facilitate reordering of the columns
    // columnOrder: [ 'column-1'],
};


export default initialData;