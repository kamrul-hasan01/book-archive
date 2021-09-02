document.getElementById('result-section').style.display = 'none';
document.getElementById('no-book-found').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
//   seaching book 
const bookSearch = () => {
    const inputFeild = document.getElementById('input-feild');
    const inputValue = inputFeild.value;
    inputFeild.value = '';

    document.getElementById('result-section').style.display = 'none';
    document.getElementById('no-book-found').style.display = 'none';

    document.getElementById('book-container').innerHTML = ''
    //  showing spinner 
    document.getElementById('spinner').style.display = 'block';

    const url = `https://openlibrary.org/search.json?q=${inputValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))
}

//  display all books 
const displayData = data => {
    //   total books founds 
    document.getElementById('total-found').innerText = data.numFound
    // spninner display none
    document.getElementById('spinner').style.display = 'none';

    if (data.numFound !== 0) {
        document.getElementById('result-section').style.display = 'block';
        const bookContainer = document.getElementById('book-container')
        data.docs.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `<div class="card h-100">
           
                <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="h-50 p-3"  alt="Pic not found">
                <div class="card-body">
                   
                    <h5 class="card-title">${element.title}</h5>
                    <h6 class="card-title"> Author:${element.author_name ? element.author_name : 'Author not found'}</h6>
                    <p class="card-text">Publisher: <i>${element.publisher ? element.publisher : 'Publisher not found'}</i></p>
                    <p class="card-text">First Published: ${element.first_publish_year ? element.first_publish_year : ' '}</p>
                </div>
          
        </div>`
            bookContainer.appendChild(div);
        });

    } else {
        //   no books found result 
        document.getElementById('no-book-found').style.display = 'block';
    }
}

