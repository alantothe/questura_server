export type CreateUserDto ={
    username: string;
    email:string;
    password:string;
}

function idValue<Type>(arg:Type): Type{
    return arg
}

const number = idValue(7)

const string =idValue('alan')

console.log(number)
console.log(string)