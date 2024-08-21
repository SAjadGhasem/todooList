let InputElem=document.getElementById('itemInput')
let addBtn=document.getElementById('addButton');
let clearBtn=document.getElementById('clearButton')
let listOfTodods=document.getElementById('todoList');
let btnSucces=document.querySelector('.btn-success')
let btnDanger=document.querySelector('.btn-danger')

let todosArrayObj=[];

let falgComp=true
console.log(addBtn)

function loadinHandler(){
    let items=localStorage.getItem('items');
    let js=JSON.parse(items)
    let Childrens=listOfTodods.children
    console.log(js)
    let NewItem
    let newLabel
    let newButtonCompelete
    let newButtonDelete
    if(js!=null){
        js.forEach(function(json) {
            NewItem=document.createElement('li')
            newLabel=document.createElement('label');
            newButtonCompelete=document.createElement('button');
            newButtonDelete=document.createElement('button');
            newButtonCompelete.className='btn btn-success';
            newButtonCompelete.innerHTML=json.stattus;
            newButtonDelete.className='btn btn-danger';
            newButtonDelete.innerHTML='Delete'
            NewItem.className='completed well';
            newLabel.innerHTML=json.name;
            NewItem.append(newLabel,newButtonCompelete,newButtonDelete)
            listOfTodods.append(NewItem)
            if(newButtonCompelete.innerHTML=='unComplete'){
                newLabel.style.textDecorationLine='line-through'
                newLabel.style.color='grey'
                newButtonCompelete.innerHTML='unComplete'
                falgComp=false;
            }
            newButtonCompelete.addEventListener('click',function(){
                if(falgComp){
                    let num=js.indexOf(json)
          
                    Childrens[num].children[0].style.textDecorationLine='line-throuwgh'
                    Childrens[num].children[0].style.color='grey'
                    Childrens[num].children[1].innerHTML='unComplete'
                    json.stattus='unComplete'
                    falgComp=false;
                }
                else{
                    // newLabel.style.textDecorationLine='none'
                    // newLabel.style.color='black'
                    // newButtonCompelete.innerHTML="Complete"
                    let num=js.indexOf(json)
                    console.log(Childrens[num])
                    Childrens[num].children[0].style.textDecorationLine='none'
                    Childrens[num].children[0].style.color='black'
                    Childrens[num].children[1].innerHTML='Complete'
                    json.stattus='Complete'
                    falgComp=true;
                }
                localStorage.setItem('items',JSON.stringify(js))
            })
            newButtonDelete.addEventListener('click',function(){

                let num=js.indexOf(json)
                js.splice(js.indexOf(json),1)
                Childrens[num].remove()
                
                localStorage.setItem('items',JSON.stringify(js))
                // todosArrayObj.splice(todosArrayObj.indexOf(todosObj),1)
            })
        });
        
    }




   
}
loadinHandler()



document.body.addEventListener('submit',function(event){
    event.preventDefault()
   
})

addBtn.addEventListener('click',function(){

    let NewItem=document.createElement('li')
    let newLabel=document.createElement('label');
    let newButtonCompelete=document.createElement('button');
    let newButtonDelete=document.createElement('button');
    newButtonCompelete.className='btn btn-success';
    newButtonCompelete.innerHTML='Complete';
    newButtonDelete.className='btn btn-danger';
    newButtonDelete.innerHTML='Delete'
    NewItem.className='completed well';
    newLabel.innerHTML=InputElem.value;
    NewItem.append(newLabel,newButtonCompelete,newButtonDelete)
    listOfTodods.append(NewItem)
    InputElem.value='';
    let todosObj={};
    todosObj['name']=newLabel.innerHTML;
    todosObj['stattus']='Complete';
    todosArrayObj.push(todosObj)
    console.log(todosArrayObj)
    let JsonFil=JSON.stringify(todosArrayObj)
    localStorage.setItem('items',JsonFil)

    newButtonCompelete.addEventListener('click',function(){

        if(falgComp){
            newLabel.style.textDecorationLine='line-through'
            newLabel.style.color='grey'
            newButtonCompelete.innerHTML="unComplete"
            todosArrayObj.forEach(function(list){
                if(list.name==newLabel.innerHTML){
                    list.stattus=newButtonCompelete.innerHTML
                }
            })
            falgComp=false;
            localStorage.setItem('items',JSON.stringify(todosArrayObj))
        
        }
        else{
            newLabel.style.textDecorationLine='none'
            newLabel.style.color='black'
            newButtonCompelete.innerHTML="Complete"
            todosArrayObj.forEach(function(list){
                if(list.name==newLabel.innerHTML){
                    list.stattus=newButtonCompelete.innerHTML
                }
            })
            falgComp=true;
            localStorage.setItem('items',JSON.stringify(todosArrayObj))
        
        }
        
    })
    newButtonDelete.addEventListener('click',function(){
        todosArrayObj.forEach(function(list){
            if(list.name==newLabel.innerHTML){
                todosArrayObj.splice(todosArrayObj.indexOf(list),1)
            }
        })
        NewItem.remove()
        localStorage.setItem('items',JSON.stringify(todosArrayObj))
        
       
        
    })
})

clearBtn.addEventListener('click',function(){
    
    InputElem.value='';
    InputElem.innerHTML='';
    let lengthChild=listOfTodods.childElementCount;
    while(lengthChild>0){
        listOfTodods.lastChild.remove()
    }
  
    
    
})



