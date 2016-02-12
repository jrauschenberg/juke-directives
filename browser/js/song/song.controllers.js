'use strict';

juke.controller('SongChooseCtrl', function ($scope, SongFactory) {

  $scope.songs = [];

  SongFactory.fetchAll()
  .then(function (songs) {
    $scope.songs = songs;
  });

  $scope.reset = function () {
    $scope.toAdd = null;
  };

  $scope.addIt = function () {
    $scope.addSong($scope.toAdd)
    .then(function () {
      $scope.reset();
    });
  };

});

juke.directive('songtable', function(PlayerFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/song/songtable.html',
    link: function(scope) {
      scope.toggle = function (song) {
          if (song !== PlayerFactory.getCurrentSong()) {
          PlayerFactory.start(song, scope.songs);
        } else if ( PlayerFactory.isPlaying() ) {
          PlayerFactory.pause();
        } else {
          PlayerFactory.resume();
        }
      };

      scope.getCurrentSong = function () {
        return PlayerFactory.getCurrentSong();
      };

      scope.isPlaying = function (song) {
        return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
      };
    },
    scope: {
      songs: "="
    }
  };
});

juke.directive('doubleclick', function() {
  return {
    restrict: 'A',
    scope: {
      doubleclick: '&'
    },
    link: function(scope, element) {
      element.on('dblclick', function() {
        scope.doubleclick();
      });
    }
  };

});





