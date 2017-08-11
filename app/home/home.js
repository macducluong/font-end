
angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: '/home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', ['$scope','$interval', '$http', 'BACK_END_URL', function($scope,$interval, $http, BACK_END_URL) {
        $scope.BACK_END_URL = BACK_END_URL;
        $scope.posts=[];
        $scope.newPost={
            content:'',
            image:'',
            user:{
                _id:'1',
                profile:'',
                name:""
            },
            comment:{
                _id:'',
                content:'',
                user:{
                    _id:'',
                    name:'',
                    profile:''
                },
                create_at:''
            },
            like:0,
            date_create:''
        };
        $scope.loadPosts = function(){
            $http.get(BACK_END_URL + '/posts')
                .then(function(response){
                    $scope.posts = response.data.posts;
                });
        };
        $scope.sendPost = function(){
            $http.post(BACK_END_URL + '/posts', {
                title:'new title',
                content: $scope.newPost.content
            })
                .then(function (response) {
                    $scope.posts.splice(0, 0, response.data.post);
                    $scope.newPost.content = "";
                });
        };
        $scope.like=function (post) {
          post.likes++;
        };
        $scope.sendComment=function (post) {
            var newComment={
                _id:'',
                content:post.newComment,
                user:{
                    _id:'',
                    name:'',
                    profile:''
                },
                likes:0
            }
            $http.put(BACK_END_URL + '/posts/59898211b3fa0149a8bfd8a7/comments/', {
                content:post.newComment

            })
                .then(function (response) {
                   post.comments.push(response.data.post.newComment);
                   post.newComment = "";
            });
        };
        $scope.loadComments = function(post){
            $http.get(BACK_END_URL + '/posts/59898211b3fa0149a8bfd8a7/comments')
                .then(function(response){
                    post.comments = response.data.post.newComment;
                });
        };
        $scope.keyword='';
        $scope.friends=[
            'mac duc luong',
            'nguyen binh duong',
            'nguyen dinh dung',
            'pham van luan',
            'nguyen thi dao',
            'nguyen van trung',
            'nguen van thang',
            'nguyen van huy',
            'nguyen thi nga',
            'nguyen thi nhung'
        ];
        $scope.filteredFriends = $scope.friends;
        $scope.filter = function(){
            if($scope.keyword !== ''){
                $scope.filteredFriends = [];
                angular.forEach($scope.friends, function(friend){
                    if(friend.indexOf($scope.keyword) >= 0){
                        $scope.filteredFriends.push(friend);
                    }
                });
            } else {
                $scope.filteredFriends = $scope.friends;
            }
        };
        var tick = function() {
            $scope.clock = Date.now();
        }
        tick();
        $interval(tick, 1000);
    }]);


