(function (){ // web element 
    const detailDom =document.getElementById("dishes-container");
    
    let Dishdetail=localStorage.getItem("Dishdetail");
    Dishdetail=JSON.parse(Dishdetail); // this is any array
    Dishdetail=Dishdetail[0];          // this is an object 
    console.log(Dishdetail.fav);
    
    function addToMealDetailDOM(dish){
        detailDom.innerHTML ='';
        let heartId="heart";
        if(dish.fav){
            heartId="heart-checked" 
        }
        const divimg =document.createElement('div');
    
        divimg.innerHTML=`<div id="dish-image-container">
                                <div >
                                    <img src= "${dish.strMealThumb}"
                                    alt="" id="srcimgDetail">
                                </div>
                                    <div  style="display: flex; "> 
                                        <div style="font-size: x-large; margin: auto 5px;">  <i class="fa-solid fa-heart" id="${heartId}"></i></div>
                                        <span >${dish.strMeal}</span> 
                                    </div>
                            </div>
                            <div id="Instructions">
                                <span style="font-size: 1.3rem; text-decoration: underline;"><b>Instructions</b> for ${dish.strMeal}</span>
                                <div  > 
                                    <p>${dish.strInstructions}</p>
                                </div>
                            </div>
        `; 
        detailDom.append(divimg); 
        return; 
    }
    
    addToMealDetailDOM(Dishdetail);
    
    /*   below functions,functionality and events are out of scope */
    /*function toggleFav(){
        let Dishdetail=localStorage.getItem("Dishdetail");
        Dishdetail=JSON.parse(Dishdetail); // this is any array
        Dishdetail=Dishdetail[0];       
        Dishdetail.fav=(!Dishdetail.fav);
        addToMealDetailDOM(Dishdetail); 
        Dishdetail =JSON.stringify(Dishdetail);
        localStorage.setItem("Dishdetail",Dishdetail);
        // add favlist function
        return;
    }
    
    function handleClick(e){
        const target=e.target;
        if(target.id=='heart' || target.id === 'heart-checked'){
            // console.log("clicked");
            toggleFav();
        }
    }
    
    // Event delegation 
    function appInitilize(){
        // Add event listener   
        document.addEventListener('click',handleClick);
    } 
    appInitilize(); */
    
})();