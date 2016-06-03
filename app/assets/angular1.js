var myApp = angular.module('myApp', ['ngSanitize']);

myApp.constant("AllserviceLinks", [
                            { "name": "BodyTemplate", "value": "https://cdn.contentful.com/spaces/8qulg98piw8g/entries/4kFE9vkYcwayiKsAy88qk4?access_token=71e4b1a9712dd91d2d905aef1e27d6afe6028d0018346ee2ed43ea3a61b96460" },
                            { "name": "CssTemplate", "value": "https://cdn.contentful.com/spaces/8qulg98piw8g/entries/27Ew1MUFpyCcu6uiuO2SiG?access_token=71e4b1a9712dd91d2d905aef1e27d6afe6028d0018346ee2ed43ea3a61b96460" },
                            { "name": "loadCss", "value": "https://cdn.contentful.com/spaces/8qulg98piw8g/assets/4Snf1JG3X2KM28QCeIGO8G?access_token=71e4b1a9712dd91d2d905aef1e27d6afe6028d0018346ee2ed43ea3a61b96460" },
                            { "name": "HeaderLogo", "value": "https://cdn.contentful.com/spaces/8qulg98piw8g/assets/5MMZJezmA8SoWK2uKEIAO?access_token=71e4b1a9712dd91d2d905aef1e27d6afe6028d0018346ee2ed43ea3a61b96460" },
                            { "name": "MenuList", "value": "https://cdn.contentful.com/spaces/8qulg98piw8g/entries/3Fje8VZWoE8CeGuk4ksYWS?access_token=71e4b1a9712dd91d2d905aef1e27d6afe6028d0018346ee2ed43ea3a61b96460" },
                            { "name": "ContentImage", "value": "https://cdn.contentful.com/spaces/8qulg98piw8g/assets/3xxzvCwjEIeE2WAkyCwsQY?access_token=71e4b1a9712dd91d2d905aef1e27d6afe6028d0018346ee2ed43ea3a61b96460" }
]);

myApp.factory('TemplateFactory', function ($http, TemplateService, AllserviceLinks) {

    var fac = {};

    fac.BodyTemplate = function () {
        var CssUrl = fac.FindTemplateUrl("BodyTemplate");

        return $http.get(CssUrl).then(function (response) {
            var getCssTemplate = "";
            var data2 = Object.keys(response.data.fields);

            for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
                var getkey = data2[i];
                getCssTemplate = response.data.fields[getkey];
            }

            return getCssTemplate;
        });
    };

    fac.CssTemplate = function () {
        var CssUrl = fac.FindTemplateUrl("CssTemplate");
        return $http.get(CssUrl).then(function (response) {
            var getCssTemplate = "";
            var data2 = Object.keys(response.data.fields);

            for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
                var getkey = data2[i];
                getCssTemplate = response.data.fields[getkey];
            }

            return getCssTemplate;
        });
    };

    fac.loadCss = function () {

        var CssUrl = fac.FindTemplateUrl("loadCss");
        return $http.get(CssUrl).then(function (response) {
            var getCss = response.data.fields.file["url"];
            return getCss;
        });
    };

    fac.SiteLogo = function () {
        var SiteLogoUrl = fac.FindTemplateUrl("HeaderLogo");
        return $http.get(SiteLogoUrl).then(function (response) {
            var getLogo = response.data.fields.file["url"];
            return getLogo;
        });
    };

    fac.MenuList = function () {
        var getMenuUrl = fac.FindTemplateUrl("MenuList");
        return $http.get(getMenuUrl).then(function (response) {

            var getMenu = response.data.fields.items;

            return getMenu;

        });
    };

    fac.ContentImage = function () {

        var ContentImage = fac.FindTemplateUrl("ContentImage");
        var getContentImage = "";

        return $http.get(ContentImage).then(function (response) {
            getContentImage = response.data.fields.file["url"];

            return getContentImage;

        });

    }

    fac.FindTemplateUrl = function (name) {

        var found = AllserviceLinks.filter(function (item) {

            return item.name === name;
        });
        return found[0]["value"];
    };

    return fac;

});

myApp.factory('TemplateService', function ($http) {
    return {
        GetImage: function () {
            var ContentImage = "https://cdn.contentful.com/spaces/8qulg98piw8g/assets/3xxzvCwjEIeE2WAkyCwsQY?access_token=71e4b1a9712dd91d2d905aef1e27d6afe6028d0018346ee2ed43ea3a61b96460";
            return $http.get(ContentImage).then(function (response) {
                var getContentImage = response.data.fields.file["url"];

                return getContentImage;

            });

        }
    }

});



myApp.directive('bodypart', function ($compile, $http, TemplateFactory) {
    var template = "";
    var InnerHtml = "";
    var WelcomePageTemplate = '';
    var getTemplate = function (contentType) {

        if (contentType == "Header") {
            $http.get(url).then(function (response) {

                var data2 = Object.keys(response.data.fields);
                for (var i = 0; i < Object.keys(response.data.fields).length; i++) {
                    var getkey = data2[i];
                    InnerHtml = response.data.fields[getkey];


                }

                WelcomePageTemplate = InnerHtml;
            });

            template = WelcomePageTemplate;
        }

        return template;
    };

    var linker = function (scope, element, attrs) {
        var GetBodyTemplate = TemplateFactory.BodyTemplate().then(function (data) {

            element.html(data);
            $compile(element.contents())(scope);
        });
    };

    return {
        restrict: "EA",
        replace: true,

        link: linker,

        controller: function ($scope) {

            // $scope.welcome = "Hello ....";

        }
    };

});

myApp.directive('header', function ($compile, $http, TemplateFactory, TemplateService) {

    var loadCssUrl = "";
    var CssTemplate = "";
    var LoadTemplate = TemplateFactory.CssTemplate().then(function (data) {
        CssTemplate = data;
    });
    var SiteLogo = "";
    var SiteLogoImage = TemplateFactory.SiteLogo().then(function (data) {
        SiteLogo = data;
    });

    //var MenuList = "";
    //var GetMenu = TemplateFactory.MenuList().then(function (data) {
    //    MenuList = data;
    //});


    var ContentImage = "";
    var GetImage = TemplateFactory.ContentImage().then(function (data) {
        ContentImage = data;
    });

    var CssTemplate = "";

    var linker = function (scope, element, attrs) {

        var LoadCss = TemplateFactory.loadCss().then(function (data) {
            scope.item = data;
            scope.logo = SiteLogo;
            scope.ContentImage = ContentImage;
            element.html(CssTemplate);
            $compile(element.contents())(scope);

        });

    };

    return {
        restrict: "EA",
        replace: true,
        link: linker,
        controller: function ($scope) {
            var GetMenu = TemplateFactory.MenuList().then(function (data) {
                $scope.menulist = data;
            });
        }
    };


});

angular.module('myApp').controller('MyCtrl', function ($scope, $http, TemplateService) {


});



