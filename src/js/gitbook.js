var $ = require('jquery');

var events  = require('./core/events');
var storage = require('./core/storage');
var page = require('./core/page');

var isPageReady = false;
var onLoad = window.gitbook || [];

// Export APIs for plugins
var gitbook = {
    events:   events,
    page:     page,

    // Deprecated
    state:    page.getState(),

    // Read/Write the localstorage
    storage: storage,

    // Push a function to be called once gitbook is ready
    push: function(fn) {
        if (!isPageReady) onLoad.push(fn);
        else fn();
    }
};


// Modules mapping for plugins
var MODULES = {
    'gitbook': gitbook,
    'jquery':  $
};

window.gitbook = gitbook;
window.$ = $;
window.jQuery = $;
window.require = function(mods, fn) {
    mods = mods.map(function(mod) {
        mod = mod.toLowerCase();
        if (!MODULES[mod]) {
            throw new Error('GitBook module '+mod+' doesn\'t exist');
        }

        return MODULES[mod];
    });

    fn.apply(null, mods);
};

$(document).ready(function() {
    isPageReady = true;

    // Call pile of function once GitBook is ready
    $.each(onLoad, function(i, fn) {
        fn();
    });
});


var dropdown =   require('./theme/dropdown');
var keyboard =   require('./theme/keyboard');
var navigation = require('./theme/navigation');
var sidebar =    require('./theme/sidebar');
var toolbar =    require('./theme/toolbar');

function init() {
    // Init sidebar
    sidebar.init();

    // Init keyboard
    keyboard.init();

    // Bind dropdown
    dropdown.init();

    // Init navigation
    navigation.init();

    // Add action to toggle sidebar
    toolbar.createButton({
        index: 0,
        icon: 'fa fa-align-justify',
        onClick: function(e) {
            e.preventDefault();
            sidebar.toggle();
        }
    });
}

gitbook.events.on('start', init);

gitbook.keyboard = keyboard;
gitbook.navigation = navigation;
gitbook.sidebar = sidebar;
gitbook.toolbar = toolbar;
