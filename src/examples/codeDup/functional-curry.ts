/*
# Original Problem : 0.4662004662004662% line duplication

public onTagsAdded(tags?: string[]): void {
    if (tags) {
        this._updateStatus('The tag was added');
    }
}

public onTagsReordered(tags?: string[]): void {
    if (tags) {
        this._updateStatus('The tags have been reordered');
    }
}

*/

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
var tags = ['1', '2', '3'];
var MESSAGES = {
    added : 'The tag was added',
    reordered : 'The tags have been reordered'
}
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

var tagsExist = function(tags?: string[]): any {
    return function(message: string) {
        if (tags) {
            return _updateStatus(message);
        }
        console.log('tagsExists tags is empty');
    }
}

function _updateStatus(message?: string): void {
    console.log(`_updateStatus message: ${message}`);
}

tagsExist(tags)(MESSAGES.added);
tagsExist(tags)(MESSAGES.reordered);
tagsExist(null)(MESSAGES.added);
tagsExist(null)(MESSAGES.reordered);