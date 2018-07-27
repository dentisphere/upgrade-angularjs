(function() {
    'use strict';

    let homeComponent = {
        templateUrl: './home/home.html',
        bindings: {},
        controller,
    };

    function controller() {
        let ctrl = this;

        ctrl.title = 'Awesome, Inc. Internal Ordering System';
    }

    module.exports = { homeComponent };
})();
