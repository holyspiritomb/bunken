cat userscript-header.js support/goodreads/script.js > bunken.user.js
git add bunken.user.js
cat userscript-header.js support/goodreads/script.js > bunken-adguard.user.js
sed -i 's/grant       none/grant       unsafeWindow/g' bunken-adguard.user.js
sed -i "s/bunken.user.js/bunken-adguard.user.js/g" bunken-adguard.user.js
git add bunken-adguard.user.js
