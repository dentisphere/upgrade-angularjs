export let navigationComponent: ng.IComponentOptions = {
    templateUrl: './navigation.html',
    bindings: {},
    controller,
};

function controller() {
    const ctrl = this;

    this.companyName = 'Awesome, Inc.';
}
