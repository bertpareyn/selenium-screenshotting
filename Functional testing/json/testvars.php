<?php header('Content-type: application/json'); ?>
{
    "browser": [
        {
            "browserName": "Firefox",
            "browserId": "firefox",
            "browserpic" : "firefox.png",
            "isSupported": "true" 
        },
        {
            "browserName": "Chrome",
            "browserId": "chrome",
            "browserpic" : "chrome.png",
            "isSupported": "true" 
        },
        {
            "browserName": "Safari",
            "browserId": "safari",
            "browserpic" : "safari.png",
            "isSupported": "true" 
        },
        {
            "browserName": "IE6",
            "browserId": "ie6",
            "browserpic" : "ie6.png",
            "isSupported": "true" 
        },
        {
            "browserName": "IE7",
            "browserId": "ie7",
            "browserpic" : "ie7.png",
            "isSupported": "true" 
        },
        {
            "browserName": "IE8",
            "browserId": "ie8",
            "browserpic" : "ie8.png",
            "isSupported": "true" 
        }
    ],
    "os": [
        {
            "osName": "Windows XP",
            "osId" : "windowsxp",
            "isSupported": "true",
            "supportedBrowsers" : [
                {
                    "browserName":"Firefox"
                },
                {
                    "browserName":"Chrome"
                },
                {
                    "browserName":"IE6"
                },
                {
                    "browserName":"IE7"
                },
                {
                    "browserName":"IE8"
                }
            ] 
        },
        {
            "osName": "Windows Vista",
            "osId" : "windowsvista",
            "isSupported": "true",
            "supportedBrowsers" : [
                {
                    "browserName":"Firefox"
                },
                {
                    "browserName":"Chrome"
                },
                {
                    "browserName":"IE6"
                },
                {
                    "browserName":"IE7"
                },
                {
                    "browserName":"IE8"
                }
            ] 
        },
        {
            "osName": "Windows 7",
            "osId" : "windowsseven",
            "isSupported": "true",
            "supportedBrowsers" : [
                {
                    "browserName":"Firefox"
                },
                {
                    "browserName":"Chrome"
                },
                {
                    "browserName":"IE6"
                },
                {
                    "browserName":"IE7"
                },
                {
                    "browserName":"IE8"
                }
            ] 
        },
        {
            "osName": "Mac OSX",
            "osId" : "macosx",
            "isSupported": "true",
            "supportedBrowsers" : [
                {
                    "browserName":"Firefox"
                },
                {
                    "browserName":"Chrome"
                }
            ] 
        },
        {
            "osName": "Ubuntu",
            "osId" : "ubuntu",
            "isSupported": "true",
            "supportedBrowsers" : [
                {
                    "browserName":"Firefox"
                },
                {
                    "browserName":"Safari"
                }
            ] 
        }
    ]
}