let APIKEY = 'OwAIchynWVcleuw9kIHxNe6smK7hiGSL';
document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('btnSearch').addEventListener('click', ev => {
        ev.preventDefault();
        let url = `http://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=100&q=`
        let str = document.getElementById('search').value.trim(); // we get user`s wish
        url = url.concat(str); // connect two parts and get adress 
        console.log(url);
        fetch(url)
        .then( function (response) {return response.json()})
        .then( content => {
            console.log(content.data);
            let outDivs = document.getElementsByClassName('out'); //get all divs from html
            for(let i = 0; i < outDivs.length; i++) {
                let fig = document.createElement('figure');
                let img = document.createElement('img');
                let fc = document.createElement('figcaption');
                let btnInfo = document.createElement('button');
                btnInfo.textContent = 'i'; //for our button 'info'
                img.src = content.data[i].images.downsized.url; //get our gif
                img.alt = content.data[i].title; 
                fc.textContent = content.data[i].title;
                outDivs[i].innerHTML = ''; //we delete content inside div if we make a new request
                outDivs[i].insertAdjacentElement('afterbegin', fig); //add content inside every div
                fig.append(img);
                fig.append(fc);
                fc.append(btnInfo);
                fig.classList.add('content__figure');
                fc.classList.add('content__figcaption');
                btnInfo.classList.add('content__button-info');
            }
            let infoArr = document.getElementsByClassName('content__button-info'); //here we get all our buttons 'info'            
            for(let j = 0; j < infoArr.length; j++) {
                infoArr[j].onclick = function () { //when we click on button 'info'
                    let sizeAdress = document.createElement('div');
                    let sizeGif = document.createElement('div');
                    let adressGif = document.createElement('a');
                    sizeGif.textContent = `${content.data[j].images.downsized.height}x${content.data[j].images.downsized.width}`; //get gif`s size
                    adressGif.href = content.data[j].url;
                    adressGif.textContent = 'Оригинал';
                    sizeAdress.append(sizeGif);
                    sizeAdress.append(adressGif)
                    outDivs[j].append(sizeAdress);
                    sizeAdress.classList.toggle('size-adress');
                    sizeGif.classList.add('content__size');
                    adressGif.classList.add('content__button-url');
                }
            }
            document.getElementById('search').value = '';
        })
        .catch(err=>{
            console.error(err);
        })
    })
}