(function (app) {
    
    app.component('conversations', {
        templateUrl: '/app/components/conversations/conversations.html',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['$scope']

    function controller($scope) {

    }

})(angular.module('conversations'));