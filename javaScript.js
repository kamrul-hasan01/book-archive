const searchResult = (id, disp) => {
    document.getElementById(id).style.display = disp;
}

// document.getElementById('result-section').style.display = 'none';
// document.getElementById('error-message').style.display = 'none';
// document.getElementById('spinner').style.display = 'none';
searchResult('result-section', 'none');
searchResult('error-message', 'none');
searchResult('spinner', 'none');

const bookSearch = () => {

    const inputFeild = document.getElementById('input-feild');
    const inputValue = inputFeild.value;
    inputFeild.value = '';
    searchResult('result-section', 'none');
    searchResult('error-message', 'none');

    // document.getElementById('result-section').style.display = 'none';
    // document.getElementById('error-message').style.display = 'none';

    document.getElementById('book-container').innerHTML = ''
    searchResult('spinner', 'block');
    // document.getElementById('spinner').style.display = 'block';

    const url = `http://openlibrary.org/search.json?q=${inputValue}`;


    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))



}

const displayData = data => {



    const totalFound = document.getElementById('total-found');
    totalFound.innerText = data.numFound
    // document.getElementById('spinner').style.display = 'none';
    searchResult('spinner', 'none');


    if (data.numFound !== 0) {
        // document.getElementById('result-section').style.display = 'block';
        searchResult('result-section', 'block');

        const result = data.docs

        // console.log(result)
        const bookContainer = document.getElementById('book-container')
        result.forEach(element => {
            // console.log(element.cover_i)
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.author_name} <br>${element.first_publish_year ? element.first_publish_year : 'Not available'}</p>
                </div>
          
        </div>
        
        `
            bookContainer.appendChild(div);
        });

    } else {
        // document.getElementById('error-message').style.display = 'block';
        searchResult('error-message', 'block');

    }



}

