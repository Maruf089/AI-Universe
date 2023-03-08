
var IdArray = [];
let url = 'https://openapi.programming-hero.com/api/ai/tools';
const CallApi = async (url) => {
    try {
        let data = await fetch(url);
        let JsonData = await data.json();
        JsonData = JsonData.data.tools;
        makeCard(JsonData, true);
    }
    catch (err) {
        // Show Error for Bad Api
        alert(err);
    }
}
CallApi(url);



function makeCard(JsonData, noSorted) {

    // data loading finished , stop spinner
    myFunction();
    IdArray = [];
    let count = 1;
    JsonData.forEach((val) => {
        IdArray.push(val.id);
        // add data to card
        addDataIntoCard(val, count);
        count++;

    });
}

function addDataIntoCard(val, count) {
    let element = document.getElementById(`card${count}Img`.toString());
    element.setAttribute("src", val.image);

    // added features
    let list = document.getElementById(`card${count}Feature-list`.toString());
    list.innerHTML = "";

    val.features.forEach((title) => {
        let entry = document.createElement('li');
        entry.classList.add('mx-2');
        entry.innerHTML = `${title}`;
        list.appendChild(entry);
    });

    /// added name and date
    let Name = document.getElementById(`card${count}Name`.toString());
    Name.innerHTML = "";
    let entry = document.createElement('div');
    entry.innerHTML = `
    <h5>${val.name}</h5>
    <i class="fa-regular fa-calendar-days">  ${val.published_in}</i>
    `;
    Name.appendChild(entry);
}


// Spinner Hide Control
function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("DataSection").style.display = "block";
}
function myFunction() {
    setTimeout(showPage, 1000);
}


// Spinner Show Control
function showSpinner() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("DataSection").style.display = "none";
}

//  / Show All and Hide Some functionality 

let toggle = button => {
    let element = document.getElementById("mydiv");
    let hidden = element.getAttribute("hidden");

    if (hidden) {
        element.removeAttribute("hidden");
        button.innerText = "Hide Some";
    } else {
        element.setAttribute("hidden", "hidden");
        button.innerText = "Show All";
    }
}


/// For Sorting
document.getElementById("sortButton").addEventListener('click', function (e) {

    setTimeout(showSpinner, 1000);
    let url = 'https://openapi.programming-hero.com/api/ai/tools';
    CallApiSort(url, true);
});

const CallApiSort = async (url) => {
    let data = await fetch(url);
    let JsonData = await data.json();
    let SortedJsonData = JsonData.data.tools.sort((a, b) => {
        if (new Date(a.published_in) < new Date(b.published_in)) {
            return -1;
        }
    });
    makeCard(SortedJsonData);
    setTimeout(showPage, 1000);
}



/// Modal Details

document.getElementById('card1details').addEventListener('click', function (e) {
    let id = IdArray[0];
    makeDataIntoModal(id);

});

document.getElementById('card2details').addEventListener('click', function (e) {
    let id = IdArray[1];
    makeDataIntoModal(id);

});

document.getElementById('card3details').addEventListener('click', function (e) {
    let id = IdArray[2];
    makeDataIntoModal(id);

});

document.getElementById('card4details').addEventListener('click', function (e) {
    let id = IdArray[3];
    makeDataIntoModal(id);
});

document.getElementById('card5details').addEventListener('click', function (e) {
    let id = IdArray[4];
    makeDataIntoModal(id);

});

document.getElementById('card6details').addEventListener('click', function (e) {
    let id = IdArray[5];
    makeDataIntoModal(id);

});

document.getElementById('card7details').addEventListener('click', function (e) {
    let id = IdArray[6];
    makeDataIntoModal(id);

});

document.getElementById('card8details').addEventListener('click', function (e) {
    let id = IdArray[7];
    makeDataIntoModal(id);

});

document.getElementById('card9details').addEventListener('click', function (e) {
    let id = IdArray[8];
    makeDataIntoModal(id);

});

document.getElementById('card10details').addEventListener('click', function (e) {
    let id = IdArray[9];
    makeDataIntoModal(id);

});

document.getElementById('card11details').addEventListener('click', function (e) {
    let id = IdArray[10];
    makeDataIntoModal(id);

});

document.getElementById('card12details').addEventListener('click', function (e) {
    let id = IdArray[11];
    makeDataIntoModal(id);

});



function makeDataIntoModal(id) {
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    console.log(url);
    CallApiSingleData(url);

}


const CallApiSingleData = async (url) => {
    try {
    let data = await fetch(url);
    let JsonData = await data.json();

    console.log(JsonData);
    UpdateModal(JsonData);
    }
    catch (err) {
        // Show Error for Bad Api
        alert(err);
    }
}

function UpdateModal(JsonData) {
    let val = JsonData.data;



    let HtmlElement =
        `
    <div class="containerModal">
    <img class="card-img-top img-fluid" src='${val.image_link[0]}' alt=''>
    <button id='${val.id}accuracy'  hidden="hidden" class="btn"></button>
    </div>

    ${InputOutputValidate(val)};

    `
    document.getElementById('modalCard2').innerHTML = HtmlElement;

    if (val.accuracy.score) {

        let element = document.getElementById(`${val.id}accuracy`.toString());
        let hidden = element.getAttribute("hidden");

        if (hidden) {
            element.removeAttribute("hidden");
            element.innerText = `${val.accuracy.score}`;
        } 

    }


    HtmlElement = `
    <div> ${val.description} </div>
    ${checkPackage(val)}
    <div class='container'>
    ${checkFeaturesIntegration(val)}
    </div>
    `;


    document.getElementById('modalCard1').innerHTML = HtmlElement;
}

function InputOutputValidate(val)
{
    let html = `
    `;

    if(val.input_output_examples)
    {
        html += `
        <p> ${val.input_output_examples[0].input} </p>
        <br>
        <p> ${val.input_output_examples[0].output} </p>
        `

    }
    else html += `<p> Can You Give me an example?  </p>
    <br>
    <p> Not Yet, Take a Break </p>`;

    return html;


}


function checkPackage(val) {

    let valPrice = [val.pricing ? val.pricing[0].price : "Free Of Cost",
    val.pricing ? val.pricing[1].price : "Free Of Cost",
    val.pricing ? val.pricing[2].price : "Free Of Cost"];

    let valPlan = [val.pricing ? val.pricing[0].plan : "",
    val.pricing ? val.pricing[1].plan : "",
    val.pricing ? val.pricing[2].plan : ""]

    let HtmlElement = `
    <div class='container'>
    <div class="row">
        <div class="card col-4">
            <div class="box">
            ${val.pricing && val.pricing[0].plan != 'Free' ? valPrice[0] : 'Free of Cost/Basic'}
            ${val.pricing && val.pricing[0].plan != 'Free' ? valPlan[0] : ''} 
            </div>
        </div>
        <div class="card col-4">
        <div class="box">
        ${val.pricing && val.pricing[1].plan != 'Free' ? valPrice[1] : 'Free of Cost/Pro'}
            ${val.pricing && val.pricing[1].plan != 'Free' ? valPlan[1] : ''} 
        </div>
        </div>
        <div class="card col-4">
        <div class="box">
        ${val.pricing && val.pricing[2].plan != 'Free' ? valPrice[2] : 'Free of Cost/Enterprise'}
            ${val.pricing && val.pricing[2].plan != 'Free' ? valPlan[2] : ''}  
         </div>
        </div>

    </div>
    </div>
    `;

    return HtmlElement;
}

function checkFeaturesIntegration(val) {

    let HtmlElement = `
    <div class="row">
        <div class='col-6' >
            <p> Features </p>
            <p>${val.features ? "" : "No Data Found"}</p>
            <ol id='${val.id}features' type='1' style="margin: 0;"></ol>
             ${getFeatures(val.features)}
        </div>

        <div class='col-6'>
            <p> Integrations </p>
            <p>${val.integrations ? "" : "No Data Found"}</p>
            <ol id='${val.id}integrations' type='1' style="margin: 0;"></ol>
            ${getintegrations(val.integrations)}
            
        </div>
    </div >
    `;

    return HtmlElement;

}

function getFeatures(features) {
    let htmlContent = ``;
    if (features) {
        for (const key in features) {
            if (Object.hasOwnProperty.call(features, key)) {
                const element = features[key];
                htmlContent += `<li>${element.feature_name}</li>`;
            }
        }
    }
    return htmlContent;
}

function getintegrations(val) {
    let htmlContent = ``;
    if (val) {
        val.forEach((ele) => {
            htmlContent += `<li>${ele}</li>`;
        });
    }
    return htmlContent;
}