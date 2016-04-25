require(['QueryCrumbs/querycrumbs-settings', 'QueryCrumbs/querycrumbs'], function(qc_settings, qc) {
    var qc_div = $('<div id="QueryCrumbs" style="position:fixed;width:100%;height:100px;top:0;left:0;"></div>');
    $('body').append(qc_div);
    qc.init(qc_div.get(0), function(query) {
        console.log(query);
    });
    qc.addNewQuery(
            {
                profile: {
                    /*List of selected partners for this query. */
                    /*If the list is empty all registered partners, except if source selection is switched on, are queried. May be left empty.*/
                    /*Considered is only the SystemID of the given partnerbadge which has to be unique.*/
                    /*Datatype: PartnerBadge*/
                    "partnerList": [
                        {
                            /*System ID of the partner. Has to be unique in the system.*/
                            /*Datatype: String*/
                            "systemId": "Europeana"
                        }
                    ],
                    /* AgeRange of the user: child (0), young adult (1) or adult (2). May be left empty (default is 2).*/
                    /*Datatype: Integer*/
                    "ageRange": 2,
                    /*Amount of items the result should return. Default is 10*/
                    /*Datatype: Integer*/
                    "numResults": 10,
                    /*Gender of the User. May be left empty.*/
                    /*Datatype: String*/
                    "gender": "female",
                    /*Address of the User. May be left empty.*/
                    /*Datatype: Address*/
                    "address": {
                        /*Country of the user. May be left empty.*/
                        /*Datatype: String*/
                        "country": "testcountry",
                        /*City of the user. May be left empty.*/
                        /*Datatype: String*/
                        "city": "testcity"
                    },
                    /*Time range of the query if supported by the partners search engine. May be left empty.*/
                    /*Datatype: TimeRange*/
                    "timeRange": {
                        /*Start date of the query*/
                        /*Datatype: String*/
                        "start": "1980",
                        /*End date of the query*/
                        /*Datatype: String*/
                        "end": "2000"
                    },
                    /*Spoken language of the user. Partners that don't support the language will be left out. May be left empty.*/
                    /*Datatype: Language*/
                    "languages": [
                        {
                            /*Language in iso format.*/
                            /*Datatype: String*/
                            "iso2": "de",
                            /*Level of competence for weighting.*/
                            /*Datatype: Double*/
                            "languageCompetenceLevel": 0.1
                        },
                        {
                            "iso2": "en",
                            "languageCompetenceLevel": 0.1
                        }
                    ],
                    /*List of Partners that are "protected" by a partnerKey to query them. May be left empty.*/
                    /*Datatype: PartnerBadge*/
                    "userCredentials": [
                        {
                            /*System ID of the partner. Has to be unique in the system.*/
                            /*Datatype: String*/
                            "systemId": "Wissenmedia",
                            /*Login name*/
                            /*Datatype: String*/
                            "login": "me@partner.x",
                            /*Security Token or password*/
                            /*Datatype: String*/
                            "securityToken": "sdjalkej21!#"
                        }
                    ],
                    /*The actual query terms. At least one has to be there*/
                    /*Datatype: Contextkeyword*/
                    "contextKeywords": [
                        {
                            /*Keyword or phrase, phrases might be handled differently depending on the partner (as conjunctive query).*/
                            /*Datatype: String*/
                            "text": "women",
                            /*type of the entity (person, location, organization, misc) [optional] */
                            /*Datatype: String*/
                            "type": "misc",
                            /*Uri of the entity [optional]*/
                            /*Datatype: String*/
                            "uri": "http://dbpedia.com/resource/woman",
                            /* Indicator, if the keywordt is a main topic */
                            /* Datatype:Boolean */
                            "isMainTopic": false
                        }
                    ],
                    /*The context of the given contextkeywords. May be left empty.*/
                    /*Datatype: Context*/
                    "context": {
                        /*Reason for the query generation. Might be automaticly extraced or manualy entered.*/
                        /*Datatype: String*/
                        "reason": "manual",
                        /*Additional value. E.g. the Page from which the query was generated*/
                        /*Datatype: String*/
                        "value": "www.wikipedia.at"
                    },
                    /*Interests of the user. Might be added to the query depending on the used query formulation algorithms. May be left empty.*/
                    /*Datatype: Interest*/
                    "interests": [
                        {
                            /*Entered interest text*/
                            /*Datatype: String*/
                            "text": "text",
                            /*User might give a weight to the interest. May be left empty.*/
                            /*Datatype: String*/
                            "weight": 0.1,
                            /*User might give a confidence of the competence level. May be left empty.*/
                            /*Datatype: String*/
                            "confidence": 0.1,
                            /*User might give a competence level. May be left empty.*/
                            /*Datatype: Double*/
                            "competenceLevel": 0.1
                                    /*Possible source of the interest. May be left empty.*/
                                    /*Datatype: String*/,
                            "source": "source",
                            /*Possible URI to the interest*/
                            /*Datatype: String*/
                            "uri": "http://dsjkdjas.de"
                        },
                        {
                            "text": "text2",
                            "weight": 0.2,
                            "confidence": 0.2,
                            "competenceLevel": 0.2,
                            "source": "source2",
                            "uri": "http://google.de"
                        }
                    ]
                },
                /*Might contain further information how the system generated the given result list*/
                /*Datatype: String*/
                "provider": "federated",
                /*Amout of returned results*/
                /*Datatype: Integer*/
                "totalResults": 10,
                /*Contains information which partner returned results and why if it didn't return results*/
                /*Datatype:  PartnerResponseState*/
                "partnerResponseState": [
                    {
                        /*The unique system id of the partner.*/
                        /*Datatype:  String*/
                        "systemID": "Deutsche Digitale Bibliothek",
                        /*Returns if the partner had some error.*/
                        /*Datatype:  Boolean*/
                        "success": false,
                        /*Errormessage of the system if there was some error.*/
                        /*Datatype:  String*/
                        "errorMessage": "Waited too long for partner system 'Deutsche Digitale Bibliothek' to respond 2972 ms "
                    },
                    {
                        "systemID": "Europeana",
                        "success": true
                    },
                    {
                        "systemID": "Wikipedia-Local",
                        "success": false,
                        "errorMessage": "Waited too long for partner system 'Wikipedia-Local' to respond 2972 ms "
                    },
                    {
                        "systemID": "Wissenmedia",
                        "success": true
                    },
                    {
                        "systemID": "Mendeley",
                        "success": true
                    },
                    {
                        "systemID": "ZBW",
                        "success": false,
                        "errorMessage": "Timeout"
                    },
                    {
                        "systemID": "KIMPortal",
                        "success": true
                    }
                ],
                /*Returned Results of the partner systems aggregated in one list.*/
                /*Datatype: Result*/
                "result": [
                    {
                        /*Group of too similar results that didn't end up in the result list for that reason.*/
                        /*Datatype: Result*/
                        "resultGroup": [
                            {
                                "documentBadge": {
                                    "id": "sl23394330",
                                    "uri": "http://service.wissens-server.com/wissensserver/view.html?a=t&r=CURRENT&i=sl23394330&s=BEP&v=eexcess&w=EEXCESS",
                                    "provider": "Wissenmedia"
                                },
                                "mediaType": "unknown",
                                "previewImage": "http://service.wissens-server.com/wissensserver/media/?a=v&c=file-system&v=ws-mediensuche&reswidth=98&resheight=98&width=100&height=100&origin=center&border=1x1&background=FAFAFA&bordercolor=ddd&u=jadis/incoming/1569868.jpg",
                                "title": "Computer",
                                "description": "ComputerComputer [kɔmˈpjuːtər; englisch, zu to compute »(be)rechnen«, von lateinisch computare] der, -s/-, Rechner, Datenverarbeitungsanlage, Abkürzung DVA, elektronisch arbeitende Einrichtung, die Probleme dadurch löst, dass sie...",
                                "date": "2014-04-28T07:55:00Z",
                                "language": "de",
                                "licence": "restricted"
                            }
                        ],
                        /*The indentifier of the document.*/
                        /*Datatype: DocumentBadge*/
                        "documentBadge": {
                            /*Document identifier*/
                            /*Datatype: String*/
                            "id": "sl23394330",
                            /*Uri of the document*/
                            /*Datatype: String*/
                            "uri": "http://service.wissens-server.com/wissensserver/view.html?a=t&r=CURRENT&i=sl23394330&s=BEP&v=eexcess&w=EEXCESS",
                            /*Source which produced the result./
                             /*Datatype: String*/
                            "provider": "Wissenmedia"
                        },
                        /*Media type like image or video and so on.*/
                        /*Datatype: String*/
                        "mediaType": "unknown",
                        /*Link to a previewimage if avaiable.*/
                        /*Datatype: String*/
                        "previewImage": "http://service.wissens-server.com/wissensserver/media/?a=v&c=file-system&v=ws-mediensuche&reswidth=98&resheight=98&width=100&height=100&origin=center&border=1x1&background=FAFAFA&bordercolor=ddd&u=jadis/incoming/1569868.jpg",
                        /*Title of the document.*/
                        /*Datatype: String*/
                        "title": "Computer",
                        /*Description or snippet of the document.*/
                        /*Datatype: String*/
                        "description": "ComputerComputer [kɔmˈpjuːtər; englisch, zu to compute »(be)rechnen«, von lateinisch computare] der, -s/-, Rechner, ...",
                        /*Date of the document dependent on which date the source has in the.*/
                        /*Datatype: String*/
                        "date": "2014-04-28T07:55:00Z",
                        /*Language of the document, should be in ISO 639-1 format*/
                        /*Datatype: String*/
                        "language": "de",
                        /*Licence of the given document*/
                        /*Datatype: String*/
                        "licence": "restricted"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "/9200386/BibliographicResource_3000095846216",
                            "uri": "http://europeana.eu/resolve/record/9200386/BibliographicResource_3000095846216",
                            "provider": "Europeana"
                        },
                        "mediaType": "unknown",
                        "previewImage": "http://europeanastatic.eu/api/image?uri=http%3A%2F%2Fbsb0mdz-upload.bsb.lrz.de%2F%7Eeuropeana%2Fbsb11072436%2Fdownload%2Fthumbs%2Fbsb11072436_00023.jpg&size=LARGE&type=TEXT",
                        "title": "The works of Lord Byron complete in one volumeThe works",
                        "date": "unknown",
                        "language": "de",
                        "licence": "http://www.europeana.eu/rights/out-of-copyright-non-commercial/"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "DIST_000004550",
                            "uri": "http://www.kim.bl.openinteractive.ch/sammlungen#6a06900a-68fa-4d5f-82d5-6290264cafaa",
                            "provider": "KIMPortal"
                        },
                        "mediaType": "unknown",
                        "previewImage": "https://kgapi.bl.ch/media/kim-collect/resources/images/thumbs/6a06900a-68fa-4d5f-82d5-6290264cafaa_0001.jpg",
                        "title": "Fotografie, Zeichnung von Georg Herwegh (Foto)",
                        "description": "Burg (oder Stadteingang) über Mauer und Fels. Davor freies Feld mit Bauer, Kuh und Ziege. Im Hintergrund ein rosses Kreuz. Auf der Rückseite handschriftlicher Eintrag .....",
                        "date": "unknown",
                        "language": "de",
                        "licence": "\n\t\t\t\t\t\t\t    http://creativecommons.org/licenses/by-nc-sa/4.0/\n\t\t\t\t\t\t\t"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "/9200386/BibliographicResource_3000044999678",
                            "uri": "http://europeana.eu/resolve/record/9200386/BibliographicResource_3000044999678",
                            "provider": "Europeana"
                        },
                        "mediaType": "unknown",
                        "previewImage": "http://europeanastatic.eu/api/image?uri=http%3A%2F%2Fbsb0mdz-upload.bsb.lrz.de%2F%7Eeuropeana%2Fbsb10745363%2Fdownload%2Fthumbs%2Fbsb10745363_00027.jpg&size=LARGE&type=TEXT",
                        "title": "The Works of Lord Byron complete in one volumeThe works",
                        "date": "unknown",
                        "language": "de",
                        "licence": "http://www.europeana.eu/rights/out-of-copyright-non-commercial/"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "10001571124",
                            "uri": "http://www.econbiz.de/Record/10001571124",
                            "provider": "ZBW"
                        },
                        "mediaType": "unknown",
                        "title": "Frauen - Technik - Evaluation : Frauenförderung als Qualitätskriterium in technisch-naturwissenschaftlichen Studiengängen; Bonn, 6./7. Juli 2000 ; [diese Publikation ist im Rahmen des Projektes Qualitätssicherung entstanden]",
                        "date": "2001",
                        "language": "de",
                        "licence": "restricted"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "34a40c2f-7850-365a-af5b-1253dfc0e028",
                            "uri": "http://www.mendeley.com/research/critique-lovelace-metaanalysis",
                            "provider": "mendeley"
                        },
                        "mediaType": "unknown",
                        "title": "Critique of Lovelace Meta-Analysis",
                        "date": "2007",
                        "language": "unknown",
                        "licence": "https://creativecommons.org/licenses/by/3.0/legalcode"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "DIST_000003457",
                            "uri": "http://www.kim.bl.openinteractive.ch/sammlungen#9ef343c7-aa70-487f-bcbe-64a5bdf1affa",
                            "provider": "KIMPortal"
                        },
                        "mediaType": "unknown",
                        "title": "Notizbuch",
                        "description": "Notizbuch (kleinformatig), brauner Ledereinband und goldener Verschluss. Text auf 52 Seiten.",
                        "date": "unknown",
                        "language": "de",
                        "licence": "\n\t\t\t\t\t\t\t    http://creativecommons.org/licenses/by-nc-sa/4.0/\n\t\t\t\t\t\t\t"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "1ec04663-27ad-3292-aff5-163b9bea9fab",
                            "uri": "http://www.mendeley.com/research/byrons-voice",
                            "provider": "mendeley"
                        },
                        "mediaType": "unknown",
                        "title": "Byron's Voice",
                        "date": "2010",
                        "language": "unknown",
                        "licence": "https://creativecommons.org/licenses/by/3.0/legalcode"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "10010480859",
                            "uri": "http://www.econbiz.de/Record/10010480859",
                            "provider": "ZBW"
                        },
                        "mediaType": "unknown",
                        "title": "Taking the Lord's Name in Vain: The Impact of Connected Directors on 19th Century British Banks",
                        "description": "This paper utilizes data on the presence of prominent individualsthat is, those with political (e.g., Members of Parliament) and aristocratic titles (e.g., lords)--...",
                        "date": "2014",
                        "language": "de",
                        "licence": "restricted"
                    },
                    {
                        "resultGroup": [
                        ],
                        "documentBadge": {
                            "id": "/9200386/BibliographicResource_3000045256289",
                            "uri": "http://europeana.eu/resolve/record/9200386/BibliographicResource_3000045256289",
                            "provider": "Europeana"
                        },
                        "mediaType": "unknown",
                        "previewImage": "http://europeanastatic.eu/api/image?uri=http%3A%2F%2Fbsb0mdz-upload.bsb.lrz.de%2F%7Eeuropeana%2Fbsb10701385%2Fdownload%2Fthumbs%2Fbsb10701385_00025.jpg&size=LARGE&type=TEXT",
                        "title": "The poetical works of Lord Byron With Life. 6 engravings on steel",
                        "date": "unknown",
                        "language": "de",
                        "licence": "http://www.europeana.eu/rights/out-of-copyright-non-commercial/"
                    }
                ]
            });
});
