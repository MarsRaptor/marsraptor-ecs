export default abstract class Component {

    readonly id: string;

    constructor() {
        this.id = this.constructor.name;
    }

}