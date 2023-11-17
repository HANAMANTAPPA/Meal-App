(function (){
    console.log("working");

// let favList=[];   // initialise it only when there is no fav in favList 
let searchedResult =[]; 
let Dishdetail;     
// web elements  ----------------------- 
const addDishInput =document.getElementById("input-textbox");
const dishContainerDOM =document.getElementById("dishes-container");
//  Data -------------------------------
// dish={
//     "idMeal": 1,
//     "strMeal" : "death by chocolate",
//     "strMealThumb" : "https://th.bing.com/th/id/R.5de2d5a1b07d637b4e9c91b1474512e4?rik=TiXiDIqeEChbFQ&riu=http%3a%2f%2fimages.bigoven.com%2fimage%2fupload%2fv1419101912%2fdeath-by-chocolate-3.jpg&ehk=EEDIwFIlwGsLY6SbC41ZrquhA6Fw0R8na2%2fHpIaCvbw%3d&risl=&pid=ImgRaw&r=0",
//     "strInstructions" : "Add anythng",
//     "fav" : false
// } 

function fetchSearchReasult(apiLink){   // use async if u use 2nd approach to fetch 
    // 1st approach 
    fetch(apiLink)
    .then(function(response){
        // will have the response in  object formate 
        // console.log(response);
        return response.json();
    }).then(function (data){ 
        // console.log(data);
        searchedResult=data.meals; // add to result list
        for(let i of searchedResult){
            i.fav =(i.fav===true);   //  addedd fav item to list 
        }
        renderToHome(searchedResult);
        let SR=JSON.stringify(searchedResult); 
        localStorage.setItem("SR", SR); 
    }).catch(function(error){
        console.log("error", error );
    })

    // 2nd approach using async and await 
    // try{
    //     const response = await fetch(apiLink);
    //     // console.log(response);
    //     const data = await response.json();
    //     // console.log(data);
    //     searchedResult=data.meals;
    //     // console.log(searchedResult);
    //     renderToHome();
    // }
    // catch(error){
    //     console.log(error);
    // }
}
function renderToHome(){
    dishContainerDOM.innerHTML= '';
    for(let i of searchedResult){ 
        renderToHomeDom(i);
    }
    return;
}
function checkItemInFavList(id1){
    let tempFavList=localStorage.getItem("favList");
    tempFavList=JSON.parse(tempFavList);
    for(let i of tempFavList){
        // console.log(i[0]);
        if(i[0].idMeal ==id1){
            return true;
        }
    }

    return false;
}

function renderToHomeDom(dish){
    let heartId="heart"; 
    if(checkItemInFavList(dish.idMeal)){
        dish.fav=true;
        heartId="heart-checked" 
    }
    const divTohome =document.createElement('div'); 

    divTohome.innerHTML=`<div ><a  href="mealDetailPage.html" >
                <img src=  ${dish.strMealThumb}
                alt="dishImage not showing" id="srcimg" data-id="${dish.idMeal}">
                    </a>
                </div>
                <div  style="display: flex; "> 
                    <div style="font-size: x-large; margin: auto 5px;">  <i class="fa-solid fa-heart" id="${heartId}" data-id="${dish.idMeal}"></i></div>
                    <span >${dish.strMeal}</span> 
                </div>` ;

    dishContainerDOM.append(divTohome);
    return;
}

 

function suggesation(text){

}

function search(text){ // Create searchedResult array from result  
    const apiLink="https://www.themealdb.com/api/json/v1/1/search.php?s="+text;
    // console.log(apiLink);
    fetchSearchReasult(apiLink);
}

function toggleFav(id){
    // add toggled list to HOME-DOM
    for(let i of searchedResult){
        if(i.idMeal === id){
            i.fav= (!i.fav);
         }
    }
}
function addTofavList(id){
    // // add list to fav list 
    const Dish = searchedResult.filter((dish)=>{
        return dish.idMeal === id;
    } );
    // console.log(Dish); 
    let favList=localStorage.getItem("favList");
    favList=JSON.parse(favList);
    console.log(favList);


    favList.push(Dish); 
    const favList1=JSON.stringify(favList);
    localStorage.setItem("favList",favList1); 
    renderToHome();
    return;
}
function removeFromfavList(id){
    // fetch the FAV list 
    let favList=localStorage.getItem("favList");
    favList=JSON.parse(favList);
    // filter FAV LIST
    favList=favList.filter((dish)=>{
        return dish[0].idMeal!=id;
    }  );
    //  ADD FAV LIST to JSON
    const favList1=JSON.stringify(favList);
    localStorage.setItem("favList",favList1);
    
    renderToHome();
    return;
}
function showNotification(text){
    alert(text);
}

function handleInputKeyPress(e){
    if(e.key =='Enter'){
        const text=e.target.value;
        if(text.length <1 ){
            showNotification("Enter atleat four characters");
            return;
        } 
        search(text);
        e.target.value ='';
    }
}
function handleClick(e){
    const target=e.target;
    // console.log(target);   // To check the target
    if(target.id === 'search-icon' ){
        const text=addDishInput.value;
        // console.log("check");
        if(text.length <1 ){ 
            showNotification("Enter atleat one characters");
            return;
        } 
        search(text);
        addDishInput.value ='';
    }else if(target.id === 'heart'){
        console.log("clicked to add");
        const taaskID=target.dataset.id; 
        toggleFav(taaskID);
        addTofavList(taaskID); 
    }else if(target.id === 'heart-checked'){
        console.log("clicked to remove"); 
        const taaskID=target.dataset.id; 
        toggleFav(taaskID);
        removeFromfavList(taaskID);

    }if(target.id ==='srcimg'){ 
        const taaskID=target.dataset.id;
        // console.log(taaskID);
        Dishdetail = searchedResult.filter((dish)=>{
            return dish.idMeal === taaskID;
        } );
        // console.log(Dishdetail); 
        Dishdetail=JSON.stringify(Dishdetail);
        localStorage.setItem("Dishdetail",Dishdetail);
        return;
    }
}

// Event delegation 
function appInitilize(){
    // Add event listener   
    addDishInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click',handleClick);
} 
appInitilize();  
})();