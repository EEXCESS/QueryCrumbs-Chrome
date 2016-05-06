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
        }, 200);
        $('button.lsb').click();
//        var searchquery = "";
//        var comparequery = "";
//        for (var i = 0; i < query.profile.contextKeywords.length; i++) {
//            comparequery += encodeURIComponent(query.profile.contextKeywords[i].text) + ' ';
//            searchquery += encodeURIComponent(query.profile.contextKeywords[i].text) + '+';
//        }
//
//        var tabUrl = encodeURIComponent(window.location.host);
//        var tabquery = '#q=' + searchquery;
//        //console.log(previousquerytext);
//        //console.log(comparequery);
//        //console.log(searchquery);
//
//
//        if (comparequery != previousquerytext) {
//            chrome.extension.sendRequest('https://' + tabUrl + tabquery);    
//        }

    }

    //add html container to google    
    $("#searchform").append("<div id='querycrumbs' style='position:absolute; left: 130px; top: 140px; height:40px;padding:15px 0 15px 0;'></div>");

    //add querycrumbs to html
    function addQueryCrumbDiv() {
        $("#center_col").css('margin-top', '75px');
    }

    //wait for domelements loaded trigger style change on google result
    window.addEventListener('DOMNodeInserted', addQueryCrumbDiv);

    //init querycrumbs
    qc.init($('#querycrumbs').get(0), navigateToQuery);

    //receive search requests
//    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
//        if (msg.action == 'searchComplete') {
//            setTimeout(function() { addQueryCrumb(); }, 800);
//        }
//    });


    function hashHandler() {
        console.log('test');
        this.oldHash = window.location.hash;
        this.Check;

        var that = this;
        var detect = function() {
            if (that.oldHash != window.location.hash) {
                console.log(prevent);
                console.log("HASH CHANGED - new has" + window.location.hash);
                if (!prevent) {
                    setTimeout(function() {
                        addQueryCrumb();
                    }, 800);
                } else {
                    prevent = false;
                }
                that.oldHash = window.location.hash;
            }
        };
        this.Check = setInterval(function() {
            detect()
        }, 100);
    }

    hashHandler();


    //get url parameter
    $.urlParam = function(name) {
        var results = new RegExp('[\#&?]' + name + '=([^&#]*)').exec(window.location.href);
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
        console.log('bof');
        if (window.location.href.indexOf('#q=') !== -1) {
            console.log('no');
            var querytext = window.location.href.slice(window.location.href.indexOf('#q=') + 3);
        } else {
            var querytext = $.urlParam('q');
        }
        console.log(querytext);
        querytext = decodeURIComponent(querytext);
        querytext = querytext.replace(/\+/g, ' ');




        getLinks(function(links) {
            data = {
                query: querytext,
                results: links
            };

            console.log(data);
            qc.addNewQuery(data);
        });
//        }
    }

    // Returns array with the 10 first links delivered by google
    function getLinks(callback) {
        var links = [];
        $('#main').ready(function() {
            $('#main').find('.rc ').each(function() {
                var link = {
                    /*title: $(this).find('.r a').text(),
                     description: $(this).find('.st').text(),*/
                    uri: $(this).find('.r a').attr('href')
                };
                links.push(link);
            });
            callback(links);
        });
    }

    function addResults(links) {
        var results = [];
        // console.log("results:");
        for (var i = links.length - 1; i >= 0; i--) {
            var result = {
                "documentBadge": {
                    "uri": links[i].uri
                }
            };
            results.push(result);
        }
        return results;
    }

    function guid() {
        return Math.round(+new Date() / 1000);
    }



    $('#main').ready(function() {
        addQueryCrumb();
    });
});
