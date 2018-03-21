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