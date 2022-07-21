console.log('This is postman clone project');

// Use url = https://randomuser.me/api/ in the live page

//Utility functions
//1. Utility function to get DOM from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Initialize no. of parameters
let addedParamsCount = 0;

let parametersBox = document.getElementById('parametersBox');
let parametersBox2 = document.getElementById('parametersBox2');
parametersBox.style.display = 'none';


let jsonRadio = document.getElementById('jsonRadio');
let jsonRequestBox = document.getElementById('jsonRequestBox');
jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = 'none';
    jsonRequestBox.style.display = 'block';
})

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = 'block';
    jsonRequestBox.style.display = 'none';
})

let addParamBtn = document.getElementById('addParamBtn');
addParamBtn.addEventListener('click', () => {
    let string = `<div class="row g-2 my-2" id="parametersbox2">
    <label for="" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}:</label>

    <div class="col">
        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key"
            aria-label="Parameter 1">
    </div>
    <div class="col">
        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value"
            aria-label="Parameter 2">
    </div>
    <div class="col">
        <button type="button" class="btn btn-primary deleteParam"> - </button>
    </div>
</div>`

    //Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    // console.log(paramElement);

    let params = document.getElementById('params');
    params.appendChild(paramElement);
    addedParamsCount++;

    //Add an even listener to remove the parameter on clicking -button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();  //e.target matlab wo button jispr click kiya gya hai mand parentElment jo poora backticks me html likha hai(insert kr rhe hai)
        })
    }

})

//If the user clicks on submit button
let responsePrism = document.getElementById('responsePrism');
let submit = document.getElementById('submitBtn');
submit.addEventListener('click', () => {
    //Show please wait in the response box to request patience from the user

    // responsePrism.innerText = `Please wait....fetching response!`;


    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;






    //If user has choosen the custom parameters option instead of json 
    if (contentType != 'jsonRadio') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                // console.log(key);
                // console.log(value);
                data[key] = value;
                // console.log(data);
                // console.log('jsonRadio worked')
            }
        }

        data = JSON.stringify(data);

    }
    else {
        data = document.getElementById('requestJsonBox').value;
    }


    //Log all the values for debugging

    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    // console.log('Your data is ', data);

    //If the request type is get, invoke fetch api to create a get request


    if (requestType == 'GET') {
        console.log('this is get');
        responsePrism.innerText = `Please wait....fetching response!`;

        fetch(url, {
            method: 'GET',
        }).then(response =>
            response.text()
        ).then((text) => {
            //  document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();


        });
    }

    else {
        console.log('this is post');
        responsePrism.innerText = `Please wait....fetching response!`;

        fetch(url, {
            method: 'POST',
            body: data,     //body ko ek string chahiye hoti hai and yaha data string hi hai kyoki application json ko ek string chahiye hota hai
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(response =>
            response.text()
        ).then((text) => {

            //  document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }

})


