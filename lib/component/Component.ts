
export abstract class Component {

    private _id: string;

    get id(): string {
        return this._id;
    }

    constructor(id: string) {
        this._id = id;
    }

}