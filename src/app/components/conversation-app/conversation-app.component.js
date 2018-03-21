

(function (app) {

    app.component('conversationApp', {
        template: '<ui-view></ui-view>',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['$state']

        function controller($state) {

        var vm = this;

        vm.$onInit = onInit;

        function onInit(){
            console.log('App init');
            $state.go('app.conversations');
           
        }

        vm.go = function(){
            console.log('go')
            $state.go('app.profiles');
        }

       
    }

})(angular.module('conversations'));