(function (angular) {

    angular
        .module('conversations', ['ui.router', 'ui.bootstrap'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    run.$inject = ['$rootScope', '$state', '$transitions', 'NavigationListenerService'];

    function config($stateProvider, $locationProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state({
                name: 'app',
                url: '/conversationapp',
                component: 'conversationApp'
            })
            .state('app.profiles', {
                url: '/profiles',
                component: 'profiles',
            })
            .state('app.conversations', {
                url: '/conversations',
                component: 'conversations'
            })
            .state({
                name: 'app.conversation',
                url: '/conversation/:id',
                component: 'conversation'
            })
            .state({
                name: 'app.conversation.attributes',
                views: {
                    'conversation-attributes': 'conversationAttributes'
                }
            })
            .state({
                name: 'app.error',
                url: '/error',
                component: 'errorPage'
            });
    }

    function run($rootScope, $state, $transitions, NavigationListenerService) {

        NavigationListenerService.init();
    }
})(angular);



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
            $state.go('app.profiles');
           
        }

        vm.go = function(){
            console.log('go')
            $state.go('app.profiles');
        }

       
    }

})(angular.module('conversations'));


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


(function (app) {
    
    app.component('conversation', {
        templateUrl: '/app/components/conversation/conversation.html',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['$scope', '$state', '$timeout']

    function controller($scope, $state, $timeout) {
        
        var vm = this;

        vm.$onInit = onInit;

        function onInit(){

            console.log('Error in 2 seconds')

            $timeout(function(){
                $state.go('app.error');
            }, 2000);

            
        }

    }

})(angular.module('conversations'));
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



(function (app) {

    app.component('profiles', {
        templateUrl: '/app/components/profile/profile.html',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['$scope', '$state']

    function controller($scope, $state) {

        var vm = this;

        vm.$onInit = onInit;

        function onInit(){
            console.log('Profile init');
        }

        vm.startConversation = function () {
            $scope.$emit('Conversation.Start');
            $state.go('app.conversation', { id: 1 });
        }
    }

})(angular.module('conversations'));


(function (app) {
    
    app.factory('NavigationListenerService', NavigationListenerService);

    NavigationListenerService.$inject = ['$transitions', '$state', '$stateParams']
    
    function NavigationListenerService($transitions, $state, $stateParams) {

        var previousState = {};
        var retryState = {};

        return {
            getPreviousState: getPreviousState,
            getRetryState: getRetryState,
            init: init
        };

        function init(){

            $transitions.onExit({}, function(transition){

                if(transition.to().name === 'app.error'){
                    
                    retryState = { 
                        name: transition.from().name, 
                        stateParams: JSON.parse(JSON.stringify($stateParams)) 
                    };
                }
                else if(transition.from() && (transition.from().name !== 'app.error' && transition.from().name !== retryState.name)){
                    
                    previousState = { 
                        name: transition.from().name, 
                        stateParams: JSON.parse(JSON.stringify($stateParams)) 
                    };
                }
            })
        }

        function getPreviousState(){
            return previousState;
        }

        function getRetryState(){
            return retryState;
        }

    }

})(angular.module('conversations'));