const API = 'https://api.bunken.tk/'

let isRedesign = !document.querySelector("[property='books:isbn']")
let isOldMobile = !!(document.querySelector("html.mobile"))
let bookJSON = isRedesign ? JSON.parse(document.querySelector('[type="application/ld+json"]').innerText) : {}
let ebookElement = document.createElement('div')
let ebookResultsElement;
let relatedElement = isRedesign ? document.querySelector('.BookPageMetadataSection__description') : isOldMobile ? document.querySelector('div.bookDescription') : document.querySelector('div#buyButtonContainer')
let bookTitle = document.querySelector("[property='og:title']").getAttribute("content");
let ISBNCode = isRedesign ? bookJSON.isbn : document.querySelector("[property='books:isbn']").getAttribute("content");
let authorName = isRedesign ? bookJSON.author[0].name : document.getElementsByClassName('authorName')[0].innerText

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function titleCleanup(title) {
    return title.replace(/\(.*\)/, "").replace(/^\s+|\s+$/g, '').replace(/[&|,]/g, ' ').replace(/: .*/, '').replace(/[ ]+/, ' ');
}

bookTitle = titleCleanup(bookTitle);

function ebookElementInflator(results) {
    ebookResultsElement.innerHTML = ''
    results.forEach(book => {
        let resultElement = document.createElement('div')
        resultElement.className = 'elementList'
        let bookElement = document.createElement('div')
        let bookLinkElement = document.createElement('a')
        bookLinkElement.href = book.link
        bookLinkElement.textContent = book.title
        bookLinkElement.className = 'actionLinkLite bookPageGenreLink'
        bookLinkElement.target = "_blank"
        bookElement.appendChild(bookLinkElement)
        resultElement.appendChild(bookElement)

        if (book.downloads != null) {
            book.downloads.forEach(download => {
                let downloadElement = document.createElement('div')
                let downloadLinkElement = document.createElement('a')
                downloadLinkElement.href = download.link
                downloadLinkElement.textContent = download.format
                downloadLinkElement.style.color = 'limegreen'
                downloadElement.appendChild(downloadLinkElement)
                resultElement.appendChild(downloadElement)
            })
        }

        let authorElement = document.createElement('div')
        authorElement.style = "padding-bottom:10px;"
        authorElement.textContent = book.author
        resultElement.appendChild(authorElement)

        let clearElement = document.createElement('div')
        clearElement.className = 'clear'
        resultElement.appendChild(clearElement)

        ebookResultsElement.appendChild(resultElement)
    })
}

var value;

function sourceSelect() {
    let e = document.getElementById("source");
    value = e.options[e.selectedIndex].value;
    search(value)
}

function setupUI() {
    let template = `<div class="h2Container gradientHeaderContainer" style="margin-bottom:10px;">
                        <h2 class="brownBackground">E-Books</h2>
                    </div>
                    <div style="width:80%;margin-left:auto;margin-right:auto;margin-top:10px;">
                    <select id="source">
                    <option value="libgen">Source: LibGen</option>
                    <option value="libgen/fiction">Source: LibGen Fiction</option>
                    <option value="motw">Source: Memory Of The World</option>
                    <option value="audiobookbay">Source: AudioBookBay</option>
                    <option value="openlibrary">Source: OpenLibrary</option>
                    </select> 
                    <div id="ebookResults" class="bigBoxContent containerWithHeaderContent" style="overflow-y: auto; max-height: 300px;" id="resultsDiv">Searching...</div>`
    ebookElement.innerHTML = template
    ebookElement.className = 'bigBox'
    ebookElement.style = 'border-bottom: 1px solid #CCCCCC;'
    ebookElement.innerHTML +=  `<h4>made by <a target="_blank" href="https://laxya.co">laxyapahuja</a></h4><h4>modified by <a href="https://github.com/holyspiritomb">holyspiritomb</a></h4><h4>extension not working? message me on <a target="_blank" href="https://discord.gg/GwDraJjMga">discord</a>.</h4>`
    insertAfter(relatedElement, ebookElement)
    ebookResultsElement = document.getElementById('ebookResults')
}

function search(source) {
    ebookResultsElement.innerHTML = `Searching ${source}...`
    var apiFetch;
	if (ISBNCode != undefined) {
		apiFetch = `${API}${source}?title=${encodeURIComponent(bookTitle)}&isbn=${encodeURIComponent(ISBNCode)}&author=${encodeURIComponent(authorName)}`
	} else {
		apiFetch = `${API}${source}?title=${encodeURIComponent(bookTitle)}&author=${encodeURIComponent(authorName)}`
	}
    fetch(apiFetch).then(response => {
        response.json().then(res => {
            ebookElementInflator(res)
        })
    })
}

setupUI();

$(document).ready(function() {
    $("select#source").change(function() {
        sourceSelect();
    });
});

if (document.querySelector("a[href$='genres/non-fiction']") != null) {
	search('libgen');
} else {
	search('libgen/fiction');
}
