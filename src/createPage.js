import CreateElem from './createElem.js'
function CreatePage(){
    const btnName =['Shuffle and start', 'Pause', 'Sound', 'Save', 'Result']
    const arrSizes = ['3x3','4x4','5x5','6x6','7x7','8x8'];

    // header
    let header = CreateElem('header', ['header' ,'wrapper']);
    let options = CreateElem('div', ['header__options']);
    let btnWrapper = CreateElem('div', ['btn__wrapper']);
    btnName.map(el => {
        let btn;
        if(el === 'Sound'){
            btn =CreateElem('button', ['btn','volume'], '');
        }else if(el === 'Save'){
            btn =CreateElem('button', ['btn','save'], 'Save');  
        } else{
            btn = CreateElem('button', ['btn'], el);
        }
        btn.id = (el === 'Shuffle and start')? 'Shuffle' : el;
        // if(el === 'Sound') btn.classList.add('volume');
        btnWrapper.append(btn)
    })

    let stateWrapper = CreateElem('div', ['state__wrapper']);
    let moves = CreateElem('p', ['moves'], 'Moves: ');
    let countMoves = CreateElem('span', ['count__moves'], '0');
    moves.append(countMoves);
    let time = CreateElem('p', ['time'], 'Time: ');
    let timer = CreateElem('span', ['timer'], '00 : 00');
    // let separator = CreateElem('span', ['count__times'], ':');
    // let sec = CreateElem('span', ['count__times'], '00');
    time.append(timer);

    stateWrapper.append(moves,time);
    options.append(btnWrapper,stateWrapper);
    header.append(options);


// main
    let main = CreateElem('main', ['main' ,'wrapper']);
    let mainWrapper = CreateElem('div', ['main__wrapper']);
    let field = CreateElem('div', ['field']);
    mainWrapper.append(field);
    main.append(mainWrapper);


// footer
    let footer = CreateElem('footer', ['footer' ,'wrapper']);
    let sizeWrapper = CreateElem('div', ['footer__wrapper']);

    let frameSize = CreateElem('div', ['frame__size']);
    let text = CreateElem('p', ['footer__text'], 'Frame size: ');
    let countsize = CreateElem('span', ['count__size'], '4x4');
    text.append(countsize);
    frameSize.append(text);

    let allSize = CreateElem('div', ['all__size']);
    let text2 = CreateElem('p', ['footer__text'], 'Other sizes: ');
    let ul = CreateElem('ul', ['size__list']);
    arrSizes.map(el =>{
        let li = CreateElem('li', ['size__item'], el);
        ul.append(li);
    })
    allSize.append(text2, ul);
    sizeWrapper.append(frameSize,allSize);
    footer.append(sizeWrapper);

    document.body.append(header);
    document.body.append(main);
    document.body.append(footer);
}


export default CreatePage();