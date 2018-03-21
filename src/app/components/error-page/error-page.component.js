(function (app) {

    app.component('errorPage', {
        templateUrl: '/app/components/error-page/error-page.component.html',
        controllerAs: 'vm',
        controller: econtroller
    });

    econtroller.$inject = ['NavigationListenerService', '$state']

    function econtroller(NavigationListenerService, $state) {

        var vm = this;
        
        vm.getPreviousState = function(){
            console.log(JSON.stringify(NavigationListenerService.getPreviousState()))
        }

        vm.getRetryState = function(){
            console.log(JSON.stringify(NavigationListenerService.getRetryState()))
        }

        vm.retry = function(){

            var retryState = NavigationListenerService.getRetryState();

            $state.go(retryState.name, retryState.stateParams);
        }

        vm.cancel = function(){
            var cancel = NavigationListenerService.getPreviousState();
            $state.go(cancel.name, cancel.stateParams);
        }

    }

})(angular.module('conversations'));