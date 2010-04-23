<?php header('Content-type: application/json'); ?>
{
    "tests": [
        {
            "testId" : "0001",
            "testresults" : [
                {
                    "osId" : "macosx",
                    "ostests" : [
                                {
                                    "testId" : "0001",
                                    "description" : "AssertTrue",
                                    "tooltip" : "assertTrue(isTextPresent('you can test your webpages'));"
                                },
                                {
                                    "testId" : "0002",
                                    "description" : "TakeScreenshot",
                                    "tooltip" : "Take a screenshot"
                                },
                                {
                                    "testId" : "0002",
                                    "description" : "TakeScreenshot",
                                    "tooltip" : "Take a screenshot"
                                }
                            ],
                    "osresults" : [
                        {
                            "browserId" : "firefox",
                            "browserresults" : [
                                {
                                    "testId" : "0001",
                                    "screenshot" : "null",
                                    "reference" : "null",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "false"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "null",
                                    "success" : "true"
                                }
                            ]
                        },
                         {
                            "browserId" : "safari",
                            "browserresults" : [
                                {
                                    "testId" : "0001",
                                    "screenshot" : "null",
                                    "reference" : "null",
                                    "tooltip" : "assertTrue(isTextPresent('you can test your webpages'));"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "tooltip" : "Take a screenshot"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "null",
                                    "success" : "false"
                                }
                            ]
                        }
                    ]
                },
                {
                    "osId" : "windowsseven",
                    "ostests" : [
                                {
                                    "testId" : "0001",
                                    "description" : "AssertTrue",
                                    "tooltip" : "assertTrue(isTextPresent('you can test your webpages'));"
                                },
                                {
                                    "testId" : "0002",
                                    "description" : "TakeScreenshot",
                                    "tooltip" : "Take a screenshot"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "false"
                                }
                            ],
                    "osresults" : [
                        {
                            "browserId" : "firefox",
                            "browserresults" : [
                                {
                                    "testId" : "0001",
                                    "screenshot" : "null",
                                    "reference" : "null",
                                    "success" : "false"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "false"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "null",
                                    "success" : "false"
                                }
                            ]
                        },
                        {
                            "browserId" : "safari",
                            "browserresults" : [
                                {
                                    "testId" : "0001",
                                    "screenshot" : "null",
                                    "reference" : "null",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "false"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "false"
                                }
                            ]
                        },
                        {
                            "browserId" : "ie6",
                            "browserresults" : [
                                {
                                    "testId" : "0001",
                                    "screenshot" : "null",
                                    "reference" : "null",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "false"
                                }
                            ]
                        },
                        {
                            "browserId" : "ie7",
                            "browserresults" : [
                                {
                                    "testId" : "0001",
                                    "screenshot" : "null",
                                    "reference" : "null",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "null",
                                    "success" : "false"
                                }
                            ]
                        },
                        {
                            "browserId" : "ie8",
                            "browserresults" : [
                                {
                                    "testId" : "0001",
                                    "screenshot" : "null",
                                    "reference" : "null",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "screenshot.png",
                                    "reference" : "screenshot.png",
                                    "success" : "true"
                                }
                            ]
                        }
                    ]
                }     
            ]
        }
    ]
}