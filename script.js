let searchInputEl=document.getElementById("searchInput");
let searchResultsEl=document.getElementById("searchResults");

let spinnerEl=document.getElementById("spinner");

function createAndAppendsearchResults(result){
    let{
        title,
        link,
        description
    }=result;
    
    let resultItemEl=document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    
    let resultTitleEl=document.createElement("a");
    resultItemEl.classList.add("result-title");
    resultTitleEl.textContent=title;
    resultTitleEl.href=link;
    resultTitleEl.target="_blank";
    resultItemEl.appendChild(resultTitleEl);
    
    
    let titleBreakEl=document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    
    
    let urlEl=document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent=link;
    urlEl.href=link;
    urlEl.target="_blank";
    resultItemEl.appendChild(urlEl);
    
    let linkBreakEl=document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);
    
    let descriptionEl=document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent=description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(search_Results){
    spinnerEl.classList.toggle("d-none");
    searchResultsEl.classList.toggle("d-none");
    
    for(let result of search_Results){
        createAndAppendsearchResults(result);
    }
}

function searchResultHttpRequest(event){
    if (event.key ==="Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.classList.toggle("d-none");
        searchResultsEl.textContent="";
        let searchInputValue=searchInputEl.value;
        let url="https://apis.ccbp.in/wiki-search?search="+searchInputValue;
        let options={
            method:"GET"
        };
        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {
                search_results
            }=jsonData;
            displayResults(search_results);
           });
    }
}
searchInputEl.addEventListener("keydown",searchResultHttpRequest);


