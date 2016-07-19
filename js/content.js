require(['QueryCrumbs/querycrumbs-settings', 'QueryCrumbs/querycrumbs', 'jquery'], function(qc_settings, qc, $) {

    // save last result
    var previousquerytext = "";
    var prevent = false;
    //clickevent for crumb to switch back to previous searchresult
    function navigateToQuery(query) {
        prevent = true;
        $('input.gsfi').val(query);
        $('input.gsfi').focus();
        $('input.gsfi').blur();
        window.setTimeout(function() {
            $('button.lsb').click();
            $('input.gsfi').attr("placeholder", "");
            $('input.gsfi').css("background", "none");
            $('#gs_taif0').val('');
        }, 5);

        $('button.lsb').click();
    }

    //add querycrumb to html 
    $("#searchform").append("<div id='querycrumbs' style='position:absolute; left: 130px; top: 140px; height:40px;padding:10px 0 10px 0;'></div>");

    //Positions and visibility on different statements
    function addQueryCrumbDiv() {
        //splash page google
        // console.log("event: addQueryCrumbDiv");
        if ($('#hdtb-msb').length == 0) {
            $('#querycrumbs').show();
            $('#querycrumbs').center();
        } else if ($('#hdtb-msb').children().first().hasClass('hdtb-msel')) {
            $('#querycrumbs').show();
            $("#center_col").css('margin-top', '85px');
            $('#querycrumbs').css('left', 130);
        } else {
            $('#querycrumbs').hide();
        }
        //Fix Position if appbar contains programm information etc
        if ($('.appbar').height() > 150) {
            $('#querycrumbs').css('top', $('.appbar').height() + 120 + 'px');
        } else {
            $('#querycrumbs').css('top', '140px');
        }
    }

    //function to center the crumbs on the splash page
    jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }

    //wait for domelements loaded trigger style change on google result
    window.addEventListener('DOMNodeInserted', addQueryCrumbDiv);

    //init querycrumbs
    qc.init($('#querycrumbs').get(0), navigateToQuery);

    //add button to call current search on eexcess
    function addEexcessButton() {

        var imageurl = chrome.extension.getURL("/media/icons/eexcess.png");
        var button = '<a href="" id="eexcesslink"><img src="' + imageurl + '" alt="eexcess" width="28" height="28" style="margin-bottom:3px"></a>';
        $('#querycrumbs').prepend(button);
        updateEexcessLink();
    }

    //update the query
    function updateEexcessLink() {
        var lastquery = encodeURIComponent(qc.getLastCrumb());
        $('#eexcesslink').attr('href', "http://www.eexcess.eu?query=" + lastquery);
    }

    var oldHash;
    function hashHandler() {
        if (oldHash != window.location.hash) {
            if (!prevent) {
                setTimeout(function() {
                    addQueryCrumb();
                }, 600);
            } else {
                prevent = false;
            }

            oldHash = window.location.hash;
        }
    }

    //get url parameter
    $.urlParam = function(name) {
        var results = new RegExp('[\#&?]' + name + '=([^&#]*)').exec(window.location.href);
        // console.log(results);
        if (results == null) {
            return null;
        } else {
            return results[1].replace(/\+/g, ' ') || 0;
        }
    }

    //add right trim 
    String.prototype.rtrim = function() {
        return this.replace(/((\s*\S+)*)\s*/, "$1");
    }

    function getQueryCrumbInputData() {
        return {
            "totalResults": 10,
            "queryID": guid(),
            "profile": {
                contextKeywords: []
            },
            "result": []
        };
    }

    //addquerycrumb
    function addQueryCrumb(crumb) {
        var querytext = '';
        if (window.location.href.indexOf('#q=') !== -1) {
            // querytext = window.location.href.slice(window.location.href.indexOf('#q=') + 3);

            var results = new RegExp('[\#]q=([^&#]*)').exec(window.location.href);

            if (results != null) querytext = results[1].replace(/\+/g, ' ') || 0;

        } else {
            querytext = $.urlParam('q');
        }

        if (querytext !== null) {
            querytext = decodeURIComponent(querytext);
            querytext = querytext.replace(/\+/g, ' ');

            getLinks(function(links) {
                data = {
                    query: querytext,
                    results: links/*,
                    children: [],
                    isChild: false*/
                };

                if (qc.getLastCrumb() !== querytext) {
                    qc.addNewQuery(data);
                    sendLog(data);
                    updateEexcessLink();
                }

            });
        }
    }

    function throttle(fn, time) {
        var t = 0;
        return function() {
            var args = arguments,
                ctx = this;

            clearTimeout(t);

            t = setTimeout(function() {
                fn.apply(ctx, args);
            }, time);
        };
    }

    $("#main").bind("DOMSubtreeModified", throttle(function() {
        // console.log('trigger hashhandler');
        hashHandler();
    }, 850));

    // Returns array with the 10 first links delivered by google
    function getLinks(callback) {
        var links = [];
        $(document).ready(function() {
            $('#main').find('.rc ').each(function() {
                var link = {
                    /*title: $(this).find('.r a').text(),
                     description: $(this).find('.st').text(),*/
                    uri: $(this).find('.r a').attr('href')
                };
                // console.log(link.uri);
                links.push(link);
            });
            callback(links);
        });
    }

    $('#main').ready(function() {
        addQueryCrumb();
        addEexcessButton();
    });

    //send log to background.js (eexcess api)
    function sendLog(data) {
        chrome.runtime.sendMessage(data, function(response) {
            // console.log(response.success);
        });
    }

});
