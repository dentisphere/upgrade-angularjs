(function() {
    'use strict';

    let componentOptions = {
        templateUrl: './customerDetail/discount.html',
        bindings: {
            customerDiscount: '<',
            update: '&',
        },
        controller,
    };

    function controller() {
        let ctrl = this;
        ctrl.edited = false;
        ctrl.selectedDiscount = null;
        ctrl.discounts = [
            {
                discountId: 2,
                discountPercent: 5,
                discountName: 'Friends & Family',
            },
            {
                discountId: 1,
                discountPercent: 10,
                discountName: 'Employee',
            },
            {
                discountId: 3,
                discountPercent: 20,
                discountName: 'Famous Drummer',
            },
        ];

        ctrl.$onInit = function() {
            ctrl.selectedDiscount = _.find(
                ctrl.discounts,
                discount => discount.discountId === ctrl.customerDiscount.discountId,
            );
        };

        ctrl.edit = function() {
            ctrl.isEdited = true;
        };

        ctrl.save = function() {
            ctrl.isEdited = false;
            ctrl.update({ selectedDiscount: ctrl.selectedDiscount });
        };
    }

    angular.module('app').component('discount', componentOptions);
})();
