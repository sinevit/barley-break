import CreateElem from './createElem.js'
import Sound from './Sound.js'

class Cells{
    constructor(size, table){
        this.size = size;
        this.EMPTY ={value: 0, top:0, left: 0}
        this.count = 0;
        this.CEIL_SIZE = Math.floor(300/Math.sqrt(this.size));
        this.cells = [];
        this.tableResult=table;

        this.FIELD = document.querySelector('.field');
        this.BTN_SOUND = document.getElementById('Sound');
        this.COUNT_MOVES = document.querySelector('.count__moves');
        this.TIME =document.querySelector('.timer');
        this.sound = new Sound();
        this.isWin =false;
        // this.randomArr=[];
    }


    createCells(s, randomArr){
        this.randomArr = randomArr;
        this.count = 0;
        this.COUNT_MOVES.innerHTML = this.count;
        this.size = s;
        this.isWin =false;
        


        if(this.checkArr(this.randomArr) === false){
            this.createCells(this.size, [...Array(this.size-1).keys()].sort(() => Math.random() - 0.5));
        }else{
            // console.log('РЕШАЕМЫЙ')
        }
        this.cells = [];
        this.EMPTY ={value: 0,top: (this.size-1 -((this.size-1) % Math.sqrt(this.size))) /  Math.sqrt(this.size),left: (this.size-1) % Math.sqrt(this.size)}
    
        this.CEIL_SIZE = Math.floor(300/Math.sqrt(this.size));
        this.FIELD.innerHTML ='';
        for(let i = 0; i<this.size; i++){
            let cell = CreateElem('div', ['cell','cell__nopointer',`cell${Math.sqrt(this.size)}x${Math.sqrt(this.size)}` ], this.randomArr[i-1] +1);
            cell.draggable ='true';
            cell.id = i;
            if(i===0){
                cell.classList.add('empty');
                cell.removeAttribute('draggable');
            }
            const left = (i===0)? this.EMPTY.left : (i-1) % Math.sqrt(this.size);
            const top = (i===0)? this.EMPTY.top : (i-1 -left) /  Math.sqrt(this.size);
            this.cells.push({
                value: (i===0)? 0: this.randomArr[i-1] +1,
                left: left,
                top: top,
                element : cell
            })
            // console.log(this.cells)
            cell.style.left = `${left * this.CEIL_SIZE}px`;
            cell.style.top = `${top * this.CEIL_SIZE}px`;
            this.FIELD.append(cell);
    

            cell.addEventListener('click', ()=>{
                this.move(i);
    
            })
            document.querySelector('.empty').ondragover =(event)=>{
                event.preventDefault();
            }
            cell.ondragstart = drag;

            function drag(event){
                event.dataTransfer.setData("id", event.target.id); 
            }
            document.querySelector('.empty').ondrop =(event)=>{
                let id = event.dataTransfer.getData('id');
                this.move(id)
                // event.target.append(document.getElementById(id))
            }
           
        }

    }

   createSaveCells(size,randomArr){
        this.isWin =false;
        this.randomArr = randomArr;
        this.count = this.COUNT_MOVES.innerHTML;
        this.size = size;
        this.EMPTY ={value: 0,top: randomArr[0].top ,left: randomArr[0].left}
        this.cells = [];

        this.CEIL_SIZE = Math.floor(300/Math.sqrt(this.size));
        this.FIELD.innerHTML ='';
        for(let i = 0; i<this.size; i++){
            let cell = CreateElem('div', ['cell',`cell${Math.sqrt(this.size)}x${Math.sqrt(this.size)}` ], this.randomArr[i].value);
            cell.draggable ='true';
            cell.id = i;
            if(i===0){
                cell.classList.add('empty');
                cell.removeAttribute('draggable');
            }
            this.cells.push({
                value: (i===0)? 0: this.randomArr[i].value,
                left: this.randomArr[i].left,
                top: this.randomArr[i].top,
                element : cell
            })
    
            cell.style.left = `${this.randomArr[i].left * this.CEIL_SIZE}px`;
            cell.style.top = `${this.randomArr[i].top * this.CEIL_SIZE}px`;
            this.FIELD.append(cell);
    
            cell.addEventListener('click', ()=>{
                this.move(i);
    
            })
            document.querySelector('.empty').ondragover =(event)=>{
                event.preventDefault();
            }
            cell.ondragstart = drag;

            function drag(event){
                event.dataTransfer.setData("id", event.target.id); 
            }
            document.querySelector('.empty').ondrop =(event)=>{
                let id = event.dataTransfer.getData('id');
                this.move(id)
            }
        
        }
        
    }

    checkArr(a) {
        let r = a.map(el=>el+1)
        for (var mSort = 0, i = 0; i < r.length; i++){
            for (var j = i+1; j < r.length; j++){
                if (r[j] < r[i])mSort++;
            } 
        }
        // console.log(mSort,Math.sqrt(this.size),Math.sqrt(this.size)%2)
        return (Math.sqrt(this.size)%2 !==0)? (!(mSort % 2)): ((mSort+ Math.sqrt(this.size)) % 2 === 0)  
    }

    move(index) {
        let cell = this.cells[index];
        let leftDiff = Math.abs(this.cells[0].left - cell.left);
        let topDiff = Math.abs(this.cells[0].top - cell.top);
        if(leftDiff +topDiff >1){
            return;
        }else{
            (this.BTN_SOUND.classList.contains('volume'))? this.sound.playSound() : this.sound.muteSound();
            this.count++;
            this.COUNT_MOVES.innerHTML = this.count;
        }
        cell.element.style.left = `${this.cells[0].left * this.CEIL_SIZE}px`;
        cell.element.style.top = `${this.cells[0].top * this.CEIL_SIZE}px`;
        this.cells[0].element.style.left = `${cell.left * this.CEIL_SIZE}px`;
        this.cells[0].element.style.top = `${cell.top * this.CEIL_SIZE}px`;
    
        // console.log( cell);
        let emptyLeft =this.cells[0].left;
        let emptyTop =this.cells[0].top;
        this.cells[0].left = cell.left;
        this.cells[0].top = cell.top;
        cell.left =emptyLeft;
        cell.top =emptyTop;
        this.checkResult(this.cells);
    }
    checkResult(arr){ 

        let r = arr.slice(1, arr.length)
        const isFinish = r.every(cell =>{
            return cell.value === cell.top*Math.sqrt(this.size) + cell.left+1;
        })
        if (isFinish){
            this.isWin =true;
            alert(`"Hooray! You solved the puzzle in ${this.TIME.innerHTML} and ${this.COUNT_MOVES.innerHTML} moves!"`);
            this.tableResult.push({time: this.TIME.innerHTML, moves: this.COUNT_MOVES.innerHTML, size: this.size});
            // console.log(this.tableResult);
            this.getResult()
            let res =arr.map(el => {if(el.element)el.element.classList.add('cell__nopointer')})
        }
    }
    getResult(){
        return this.tableResult;
    }
    getCellArr(){
        return this.cells;
    }
    win(){
        return this.isWin;
    }


}

export default Cells;