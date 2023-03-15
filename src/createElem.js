function CreateElem(elem, clases, value, attr){
    // console.log(elem, clases, value)
    let el = document.createElement(`${elem}`);
    el.classList.add(...clases);
    if(value) el.innerHTML = value;
    if(attr) el.id=123;
    // console.log(el);
    return el;
}

export default CreateElem;