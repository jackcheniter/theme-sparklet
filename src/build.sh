#! /bin/bash

# Cleanup folder
rm -rf _assets

# Recreate folder
mkdir -p _assets/website/
mkdir -p _assets/ebook/

# Compile JS
# browserify src/js/core/index.js | uglifyjs -mc > _assets/website/gitbook.js
# browserify src/js/theme/index.js | uglifyjs -mc > _assets/website/theme.js
browserify src/js/gitbook.js | uglifyjs -mc > _assets/website/gitbook.js

# Compile Website CSS
lessc -clean-css src/less/website.less _assets/website/style.css

# Compile eBook CSS
lessc -clean-css src/less/ebook.less _assets/ebook/ebook.css
lessc -clean-css src/less/pdf.less _assets/ebook/pdf.css
lessc -clean-css src/less/mobi.less _assets/ebook/mobi.css
lessc -clean-css src/less/epub.less _assets/ebook/epub.css

# Copy fonts
mkdir -p _assets/website/fonts
# cp -R node_modules/font-awesome/fonts/ _assets/website/fonts/fontawesome/
cp -R icomoon/fonts/ _assets/website/fonts/

# Copy icons
mkdir -p _assets/website/images
cp favicon.ico _assets/website/images/
cp apple-touch-icon-precomposed.png _assets/website/images/apple-touch-icon-precomposed.png
cp apple-touch-icon.png _assets/website/images/apple-touch-icon.png