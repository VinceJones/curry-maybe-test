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


export class TagManager {

    public onTagsAdded(tags?: string[]): void {
        this.updateTags(this.updateStatus)(tags)(MESSAGES.added);
    }

    public onTagsReordered(tags?: string[]): void {
        this.updateTags(this.updateStatus)(tags)(MESSAGES.reordered);
    }

    public updateTags(f: Function) {
        return function(tags?: string[]) {
            return function(message: string) {
                if (tags) {
                    return f(message);
                }
    
                console.log('TagManager tags is empty');
            }
        }
    }

    public updateStatus(message?: string): void {
        console.log('TagManager message: ', message);
    }
}

var tagManager = new TagManager();
tagManager.onTagsAdded(tags);
tagManager.onTagsReordered(tags);
tagManager.onTagsAdded(null);
tagManager.onTagsReordered(null);
