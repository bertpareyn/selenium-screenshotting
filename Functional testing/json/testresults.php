<?php header('Content-type: application/json'); ?>
{
    "tests": [
        {
            "testId": 1,
            "testresults": [
                {
                    "osId": "macosx",
                    "ostests": [
                        {
                            "testId": "1",
                            "description": "assertTrue(isTextPresent(\\\"Hi admin!\\\"))",
                            "tooltip": "assertTrue"
                        },
                        {
                            "testId": "1",
                            "description": "takeScreenshot",
                            "tooltip": "takeScreenshot"
                        },
                        {
                            "testId": "1",
                            "description": "assertTrue(isTextPresent(\\\"newts live longer\\\"))",
                            "tooltip": "assertTrue"
                        },
                        {
                            "testId": "1",
                            "description": "takeScreenshot",
                            "tooltip": "takeScreenshot"
                        }
                    ],
                    "osresults": [
                        {
                            "browserId": "firefox",
                            "browserresults": [
                                {
                                    "testId": "1",
                                    "subTestId": "1",
                                    "screenshot": "",
                                    "reference": null,
                                    "success": "1"
                                },
                                {
                                    "testId": "1",
                                    "subTestId": "2",
                                    "screenshot": "\/Users\/hh354\/Sites\/php-src\/screenshots\/2010\/4\/27\/osTest_1\/macosx\/firefox\/merged\/merged0.png",
                                    "reference": "",
                                    "success": "1"
                                },
                                {
                                    "testId": "1",
                                    "subTestId": "3",
                                    "screenshot": "",
                                    "reference": "",
                                    "success": "1"
                                },
                                {
                                    "testId": "1",
                                    "subTestId": "4",
                                    "screenshot": "\/Users\/hh354\/Sites\/php-src\/screenshots\/2010\/4\/27\/osTest_1\/macosx\/firefox\/merged\/merged1.png",
                                    "reference": "",
                                    "success": "1"
                                }
                            ]
                        },
                        {
                            "browserId": "safari",
                            "browserresults": [
                                {
                                    "testId": "1",
                                    "subTestId": "1",
                                    "screenshot": "",
                                    "reference": null,
                                    "success": "1"
                                },
                                {
                                    "testId": "1",
                                    "subTestId": "2",
                                    "screenshot": "\/Users\/hh354\/Sites\/php-src\/screenshots\/2010\/4\/27\/osTest_1\/macosx\/firefox\/merged\/merged0.png",
                                    "reference": "",
                                    "success": "1"
                                },
                                {
                                    "testId": "1",
                                    "subTestId": "3",
                                    "screenshot": "",
                                    "reference": "",
                                    "success": "1"
                                },
                                {
                                    "testId": "1",
                                    "subTestId": "4",
                                    "screenshot": "\/Users\/hh354\/Sites\/php-src\/screenshots\/2010\/4\/27\/osTest_1\/macosx\/firefox\/merged\/merged1.png",
                                    "reference": "",
                                    "success": "1"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}