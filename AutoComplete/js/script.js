// Getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");

let linkTag = searchWrapper.querySelector("a");
let webLink;


// If user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value; // data entered by the user
    let emptyArray = [];

    // If the user entered any value...
    if (userData) {
        icon.onclick = () => {
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }

        emptyArray = suggestions.filter((data) => {
            // Filtering array value and user character to lowercase and return only those words which starts with the user entered value
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());          
        });

        emptyArray = emptyArray.map((data) => {
            // Passing the return data inside the li tag
            return data = `<li>${data}</li>`;
        });

        searchWrapper.classList.add("active"); // Show autocomplete box
        showSuggestions(emptyArray);

        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            // Adding onclick attribute to all li tags
            allList[i].setAttribute("onclick", "select(this)");
        }
    } else {
        searchWrapper.classList.remove("active"); // Hide autocomplete box
    }
}

function select(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = () => {
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}