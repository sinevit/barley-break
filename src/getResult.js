import CreateElem from './createElem.js'

function getresultTable(array){
    if(!array) array=[];

    if(document.querySelector('.overlay') !== null) document.querySelector('.overlay').remove();
    let overlay = CreateElem('div', ['overlay']);
    let popup = CreateElem('div', ['popup__wrapper']);
    let close = CreateElem('span', ['popup__close'])
    let results = CreateElem('ul', ['results']);
    let title = CreateElem('p', ['popup__title'], 'TOP10 RESULTS');
    
    if(array.length !== 0){
        let arr = (array.length >10)? chekResultArr(array): array;
        let item = CreateElem('li', ['result__item']);
        let number= CreateElem('span', ['span'], 'N' );
        let time= CreateElem('span', ['span'], 'TIME' );
        let moves= CreateElem('span', ['span'], 'MOVES');
        item.append(number,time, moves)
        results.append(item)
        let res = arr.map((el,i) => {
            let item = CreateElem('li', ['result__item']);
            let number= CreateElem('span', ['span'], i +1 );
            let time= CreateElem('span', ['span'], el.time );
            let moves= CreateElem('span', ['span'], el.moves);
            item.append(number,time, moves)
            results.append(item)
        })
    }else{
        let item = CreateElem('li', ['result__item'],'NO RESULT');
        results.append(item)
    } 

    popup.append(close);
    popup.append(title);
    popup.append(results);
    overlay.append(popup);
    document.body.append(overlay);
}

function chekResultArr(arr){
    let check=[]
    arr.map((el,i) =>{
        let time= Number(el.time.split(':')[0]) *60 + Number(el.time.split(':')[1])
        check.push({id: i, value: time/el.moves * el.moves,time: el.time, moves: el.moves});
    })
    // console.log(check.sort((a,b) => a.value-b.value).slice(0,10));
    return check.sort((a,b) => a.value-b.value).slice(0,10);
}


export default getresultTable;