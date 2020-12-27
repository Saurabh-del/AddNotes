console.log('working');
show();

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click",function(e)
{
    let txt = document.getElementById("addtxt");
    let storage = localStorage.getItem("notes");

    if(storage==null)
    {
        obj=[];
    }
    else
    {
        obj=JSON.parse(storage);    
    }

    obj.push(txt.value);
    localStorage.setItem("notes" , JSON.stringify(obj));
    txt.value="";
    //console.log(localStorage);

    show();

});

function show()
{
    let txt = document.getElementById("addtxt");
    let storage = localStorage.getItem("notes");

    if(storage==null)
    {
        obj=[];
    }
    else
    {
        obj=JSON.parse(storage);    
    }

    let html="";
    obj.forEach(function(element, index){
        html += `
            <div class="noteCard my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    if(obj.length!=0)
    {
        document.getElementById('notes').innerHTML=html;
    }
    else
    document.getElementById('notes').innerHTML=`Nothing to show use "Add a note" to add notes`;
}

function deleteNote(id)
{
    let storage = localStorage.getItem("notes");

    if(storage==null)
    {
        obj=[];
    }
    else
    {
        obj=JSON.parse(storage);    
    }

    obj.splice(id,1);
    localStorage.setItem("notes",JSON.stringify(obj));
    show();
}

let search = document.getElementById('searchtxt');
search.addEventListener("input", function(){
    //console.log('inputevent fired');

    let inputvalue = search.value.toLowerCase;
    let notecards= document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function(element){
        let cardtxt=element.getElementByTagName("p")[0].innerText;
        if(cardtxt.includes(inputvalue)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
