# bunken (文献) userscript fork

A user script to download ebooks directly from Goodreads. Fetches ebooks from [LibGen](http://libgen.is), [LibGen Fiction](http://libgen.is/fiction), [Memory Of The World](http://library.memoryoftheworld.org) & [OpenLibrary](https://openlibrary.org).

Modified from upstream to work with Violentmonkey on Firefox and Vivaldi, Android Firefox versions that allow installing the Violentmonkey extension (Iceraven, Firefox Nightly, etc), and Android Kiwi Browser via Violentmonkey.

## Modifications I've made from upstream:

* Took the onchange attribute out of the select tag in the template variable and made it into a completely separate function, outside the setupUI function (required for userscript functionality)
* Moved the injected content to be below the book description instead of under related books (cosmetic, enables use on mobile pages)
* Added css properties to improve appearance on mobile (cosmetic)
* Added text indicating which source is being searched (cosmetic)

## Other information

laxyapahuja's API repository is available at [laxyapahuja/bunken-api](https://github.com/laxyapahuja/bunken-api).
