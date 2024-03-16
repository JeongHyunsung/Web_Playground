export function findInputError(errors, name){
    let ms = ""
    if(Object.keys(errors).includes(name)){
        ms = errors[name].message;
    }
    return ms;
}