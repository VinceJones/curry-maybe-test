export class Maybe {

    public __value: any;

    public constructor(val: any) {
        this.__value = val;
        return this;
    }

    public of(val: any) {
        return new Maybe(val);
    }

    public isNothing() {
        return (
            this.__value === null || 
            this.__value === undefined ||
            this.__value === ''
        );
    }

    public map(f: Function) {
        if (this.isNothing()) {
            return this.of(null);
        }
        return this.of(f(this.__value));
    }

    public fold() {
        return this.__value;
    }

    public chain(f: Function) {
        return this.map(f).fold();
    }

    public inspect() {
        return `Maybe(${this.__value})`;
    }
}

export type Either<T> = Right<T> | Left<T>;

/*
const Right = (x:any) =>
({
  map: (f:Function) => Right(f(x)),
  fold: (f:Function, g:Function) => g(x),
  inspect: () => `Right(${x})`
})

const Left = (x:any) =>
({
  map: (f:Function) => Left(x),
  fold: (f:Function, g:Function) => f(x),
  inspect: () => `Left(${x})`
})
*/

export class Right<T> {
    public constructor(private x: T) { }

    public chain<T1>(f: (x: T) => Right<T1>): Right<T1> {
        return f(this.x);
    }

    public map<T1>(f: (x: T) => T1): Right<T1> {
        return new Right(f(this.x));
    }

    public fold<T1, T2>(f: (x: T) => T1, g: (x: T) => T2): T1 | T2 {
        return g(this.x);
    }

    public inspect(): string {
        return `Right(${this.x})`;
    }
}

export class Left<T> {
    public constructor(private x: T) { }

    public chain(f: (x: T) => Left<T>): Left<T> {
        return new Left(this.x);
    }

    public map(f: (x: T) => T): Left<T> {
        return new Left(this.x);
    }

    public fold<T1, T2>(f: (x: T) => T1, g: (x: T) => T2): T1 | T2 {
        return f(this.x);
    }

    public inspect(): string {
        return `Left(${this.x})`;
    }
}