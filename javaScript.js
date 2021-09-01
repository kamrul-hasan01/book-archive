document.getElementById('result-section').style.display = 'none';
document.getElementById('error-message').style.display = 'none';
const bookSearch = () => {

    const inputFeild = document.getElementById('input-feild');
    const inputValue = inputFeild.value;
    inputFeild.value = '';
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('book-container').innerHTML = ''

    const url = `http://openlibrary.org/search.json?q=${inputValue}`;


    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))



}

const displayData = data => {



    const totalFound = document.getElementById('total-found');
    totalFound.innerText = data.numFound
    if (data.numFound !== 0) {
        document.getElementById('result-section').style.display = 'block';
        const result = data.docs

        console.log(result)
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
                    <p class="card-text">${element.author_name} <br>${element.first_publish_year}</p>
                </div>
          
        </div>
        
        `
            bookContainer.appendChild(div);
        });

    } else {
        document.getElementById('error-message').style.display = 'block';
    }



}

