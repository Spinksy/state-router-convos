

(function (app) {
    
    app.component('conversationAttributes', {
        templateUrl: '/app/components/conversation/conversation-attributes/conversation-attributes.html',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['$scope']

    function controller($scope) {

    }

})(angular.module('conversations'));