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

import { Maybe } from '../../models/monads';

class TagService {

    public messages = {
        added: new Maybe('The tag was added'),
        reordered: new Maybe('The tags have been reordered'),
    }

    public onTagsAdded(maybeTags: Maybe): void {
        this.updateTag(this._updateStatus)(this.messages.added)(maybeTags);
    }

    public onTagsReordered(maybeTags: Maybe): void {
        this.updateTag(this._updateStatus)(this.messages.reordered)(maybeTags);
    }

    public updateTag(f: Function) {
        return function(mMessage: Maybe) {
            return function(mTags: Maybe) {
                mTags.map(() => mMessage.map(f));
            }
        }
    }

    private _updateStatus(message: string) {
        console.log('TagService message: ', message);
    }
}

var tagService = new TagService();

// Add array nothingness checking
var isNothing = Maybe.prototype.isNothing;
Maybe.prototype.isNothing = function() {
    return isNothing.apply(this) || 
    (
        Array.isArray(this.__value) && 
        this.__value.length > 0 && 
        this.__value.some(i => new Maybe(i).isNothing())
    );
}

tagService.onTagsAdded(new Maybe(['foo', 'bar', 'baz']));
tagService.onTagsReordered(new Maybe(['foo', 'bar', 'baz']));
tagService.onTagsAdded(new Maybe(['']));
tagService.onTagsReordered(new Maybe(null));