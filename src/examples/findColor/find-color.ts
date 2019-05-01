import { Left, Right } from '../../models/monads';

// function findColor(name: string): Either<string> {
//     const colors: IColorIndexable = { red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' };
//     const found: string = <string>colors[name];
//     return found
//         ? new Right(found)
//         : new Left(null);
// }



// console.log(findColor('green').fold<string, string>(x => 'error', x1 => x1.toUpperCase()))
// console.log(findColor('yellow').fold<string, string>(x => 'error', x1 => x1.toUpperCase()))

// Code goes here

interface IColorIndexable {
    [key: string]: string
}

const colors: IColorIndexable = { red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' };

const fromNullable = (x:any) =>
  x != null ? new Right(x) : new Left(null)

const findColor = (name:string) =>
  fromNullable(colors[name])

const res = findColor('blue')
            .map((c:any) => c.slice(1))
            .map((c:any) => c.toUpperCase())
            .fold((e:any) => 'no color', x => x)

console.log(res)