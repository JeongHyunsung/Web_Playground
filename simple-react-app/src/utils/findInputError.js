export function findInputError(errors, name){
    let ms = ""
    console.log(name);
    console.log(Object.keys(errors));
    if(Object.keys(errors).includes(name)){
        ms = errors[name].message;
    }
    return ms;
}