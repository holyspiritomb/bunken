cat userscript-header.js support/goodreads/script.js > bunken.user.js
git add bunken.user.js
head -n 5 userscript-header.js > bunken-adguard.user.js
echo '// @grant       unsafeWindow' >> bunken-adguard.user.js
tail -n 6 userscript-header.js >> bunken-adguard.user.js
cat support/goodreads/script.js >> bunken-adguard.user.js
sed -i "s/bunken.user.js/bunken-adguard.user.js/g" bunken-adguard.user.js
git add bunken-adguard.user.js
