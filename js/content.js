require(['QueryCrumbs/querycrumbs-settings', 'QueryCrumbs/querycrumbs', 'jquery'], function(qc_settings, qc, $) {

    // save last result
    var previousquerytext = "";

    //clickevent for crumb to switch back to previous searchresult
    function navigateToQuery(query) {
        var searchquery = "";
        var comparequery = "";
        comparequery = searchquery;
        for (var i = 0; i < query.profile.contextKeywords.length; i++) {
            searchquery += encodeURIComponent(query.profile.contextKeywords[i].text) + '+';
        }

        var tabUrl = encodeURIComponent(window.location.host);
        var tabquery = '#q=' + searchquery;
        console.log(previousquerytext);
        console.log(comparequery);
        console.log(searchquery);


        if (comparequery != previousquerytext) {
            chrome.extension.sendRequest('https://' + tabUrl + tabquery);    
        }
        
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
    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action == 'searchComplete') {
            setTimeout(function() { addQueryCrumb(); }, 800);
        }
    });

    //get url parameter
    $.urlParam = function(name) {
        var results = new RegExp('[\#&]' + name + '=([^&#]*)').exec(window.location.href);
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
        var querytext = $.urlParam('q');
        querytext = decodeURIComponent(querytext);

        if (querytext != previousquerytext) {
            var data = getQueryCrumbInputData();

            previousquerytext = querytext;
            querytext = querytext.rtrim().split(' ');

            var keywords = [];
            for (var i = 0; i < querytext.length; i++) {
                keywords.push({ text: querytext[i] });
            }
            var profile = {
                contextKeywords: keywords
            };

            data.profile = profile;
            data.result = addResults(getLinks());
            // console.log(data);
            qc.addNewQuery(data);
        }
    }

    // Returns array with the 10 first links delivered by google
    function getLinks() {
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
        });
        return links;

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
});
