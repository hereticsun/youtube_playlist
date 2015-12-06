/* use strict */
(function(){
	var app = angular.module('playlistApp', ['ngRoute', 'ngSanitize']);

	/* Service to get JSON feed and provide data to any controllers in the application */
	app.service('playlistService', function($http, $q)
	{
		var deferred = $q.defer();

		/* Define playlist source */
		var playlistSrc = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw';

		$http.get(playlistSrc).then(function(data)
		{
			deferred.resolve(data);
		});

		this.getVideos = function()
		{
			return deferred.promise;
		}
	})

	/* Configure routes */
	app.config(function($routeProvider, $locationProvider)
	{
		$routeProvider
			.when('/',
			{
				templateUrl: '/views/list.html',
				controller: 'playlistController as playlistCtrl'
			})
			.when('/video/:videoId',
			{
				templateUrl: '/views/detail.html',
				controller: 'videoController as videoCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	})

	/* Controller for the playlist */
	app.controller('playlistController', function($scope, playlistService, $route, $routeParams, $location)
	{
		var promise = playlistService.getVideos();
		promise.then(function(data)
		{
			$scope.videos = data.data.items;
			$scope.excerptLength = 255;
			$scope.params = $routeParams;
		});
	})

	/* Controller for the detail view */
	app.controller('videoController', function($scope, $sce, playlistService, $route, $routeParams, $location)
	{
		var videoDetail = this;
		var videoId = $routeParams.videoId, videoIndex;


		var promise = playlistService.getVideos();
		promise.then(function(data)
		{
			$scope.video = data.data.items[videoId];
			var youTubeSrc = 'http://www.youtube.com/embed/' + data.data.items[videoId].contentDetails.videoId;
			$scope.youTubeSrc = $sce.trustAsResourceUrl(youTubeSrc);
		});
	})
})();

