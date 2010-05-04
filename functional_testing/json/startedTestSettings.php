<?php header('Content-type: application/json'); ?>
{
    "testId": "1",
    "description": "Sakai test",
    "url": "http:\/\/3akai.sakaiproject.org\/dev\/",
    "codeInput": [
        {
            "codeName": "AssertTrue",
            "tooltip": "assertTrue(isTextPresent(\\\"Hi admin!\\\"))"
        },
        {
            "codeName": "TakeScreenshot",
            "tooltip": "takeScreenshot"
        },
        {
            "codeName": "AssertTrue",
            "tooltip": "assertTrue(isTextPresent(\\\"newts live longer\\\"))"
        },
        {
            "codeName": "TakeScreenshot",
            "tooltip": "takeScreenshot"
        }
    ],
    "operatingsystems": [
        {
            "osName": "MAC OSX 10.6",
            "osId": "macosx",
            "osVersion": "",
            "browsers": [
                {
                    "browserName": "Mozilla Firefox 3.5",
                    "browserId": "firefox",
                    "browserVersion": "",
                    "browserPic": "firefox-icon.png"
                },
                {
                    "browserName": "Safari 4",
                    "browserId": "safari",
                    "browserVersion": "",
                    "browserPic": "safari-icon.png"
                }
            ]
        }
    ]
}