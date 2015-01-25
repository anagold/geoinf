var app = angular.module('myApp', ['firebase'])

app.constant('FIREBASE_URI', 'https://anagold.firebaseio.com/')
app.controller('myCtrl', function($scope, ItemsService){
    $scope.items = ItemsService.getItems();
    $scope.isUpdated = false;
    
    $scope.addItem = function(text) {
        ItemsService.addItem({text: text});
    };
    $scope.removeItem = function (id) {
        ItemsService.removeItem(id);
    };
    $scope.updateItem = function (id) {
        ItemsService.upadeItem(id);
    };
})
 
app.factory('ItemsService', function($firebase, FIREBASE_URI) {
    var ref = new Firebase(FIREBASE_URI + "/items/");
    var sync = $firebase(ref);
    var items = sync.$asArray();
    
    var getItems = function() {
        return items;
    };
    
    var addItem = function(item) {
        items.$add(item);
    };
    
    var removeItem = function(id) {
        items.$remove(id);
    };
    
    var updateItem = function(id) {
        items.$save(id);
    }
    
    return {
        getItems: getItems,
        addItem: addItem,
        removeItem: removeItem,
        upadeItem: updateItem
    }
})


        
