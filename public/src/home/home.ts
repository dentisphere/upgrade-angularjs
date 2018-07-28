export let homeComponent: ng.IComponentOptions = {
    templateUrl: './home.html',
    bindings: {},
    controller,
};

function controller() {
    let ctrl = this;

    ctrl.title = 'Awesome, Inc. Internal Ordering System';
}
