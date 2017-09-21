var HoneywellBarcodeReaderUtils = {
    BRIDGE_TYPE_AJAX: "AJAX",
    BRIDGE_TYPE_NATIVE_WINRT_OBJECT: "NativeWinRTObject",
    BRIDGE_TYPE_NPAPI: "NPAPI",
    BRIDGE_TYPE_NONE: "None",
    DECODER_TYPE_SWIFT: "Swift",
    DECODER_TYPE_INTERMEC: "In2Decode",
    MSG_OPERATION_COMPLETED: "Operation completed successfully.",
    embedNode: null,
    bridgeType: null,
    bcrPlugin: null,
    barcodeReaderObjName: null,
    checkNpapiPlugin: function() {
        if (!this.embedNode) try {
            this.embedNode = document.createElement("embed"), this.embedNode.setAttribute("id", "bcrPlugin"), this.embedNode.setAttribute("width",
                "0"), this.embedNode.setAttribute("height", "0"), this.embedNode.setAttribute("type", "application/x-npBarcodeReaderPlugin"), document.body.appendChild(this.embedNode), this.bcrPlugin = document.getElementById("bcrPlugin"), this.bcrPlugin.ITCLogString("Found bcrPlugin element"), this.bridgeType = this.BRIDGE_TYPE_NPAPI
        } catch (a) {
            return !1
        }
        return !0
    },
    convertScannerSettingValue: function(a, d, e) {
        var g = !1;
        if (e && this.hasProperty(a, "valueType", !0))
            if ("map" === a.valueType)
                if (this.hasProperty(a, "reverseValueMap", !0) && a.reverseValueMap instanceof Array) {
                    for (var c, h = 0, b = a.reverseValueMap.length; h < b; h++)
                        for (var l in a.reverseValueMap[h])
                            if (l === d) {
                                e.value = a.reverseValueMap[h][l];
                                g = !0;
                                break
                            } else "*" === l && (c = a.reverseValueMap[h][l]);
                    g || "undefined" === typeof c || (e.value = c, g = !0)
                } else {
                    if (this.hasProperty(a, "valueMap", !0) && a.valueMap instanceof Array)
                        for (h = 0, b = a.valueMap.length; h < b; h++)
                            for (l in a.valueMap[h])
                                if (a.valueMap[h][l] === d) {
                                    e.value = l;
                                    g = !0;
                                    break
                                }
                }
        else "int" === a.valueType ? (e.value = d.toString(), g = !0) : "string" === typeof d && (e.value = d, g = !0);
        return g
    },
    getRandomInt: function(a, d) {
        return Math.floor(Math.random() * (d - a + 1)) + a
    },
    getSettingDef: function(a, d, e, g, c, h) {
        var b = {},
            l = !1;
        b.status = 0;
        b.message = this.MSG_OPERATION_COMPLETED;
        b.family = d;
        b.key = e;
        b.option = g;
        if (a && a instanceof Array) {
            for (var n = 0, m = a.length; n < m && 0 === b.status; n++) {
                var f = a[n];
                if (this.hasProperty(f, "family", !0) && f.family === d && (l || (l = !0), this.hasProperty(f, "key", !0) && f.key === e && this.hasProperty(f, "option", !0) && f.option === g)) {
                    if (this.hasProperty(f, "command", !0)) b.command = f.command;
                    else {
                        b.status =
                            HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF;
                        b.message = "Setting definition missing command property.";
                        break
                    }
                    if (this.hasProperty(f, "valueType", !0))
                        if (b.valueType = f.valueType, "map" === f.valueType) {
                            if (this.hasProperty(f, "valueMap", !0))
                                if (f.valueMap instanceof Array) {
                                    if (b.valueMap = f.valueMap, h)
                                        if ("undefined" !== typeof c) {
                                            for (var k = 0, p = f.valueMap.length; k < p; k++)
                                                if (this.hasProperty(f.valueMap[k], c, !0)) {
                                                    b.value = f.valueMap[k][c];
                                                    break
                                                }
                                            "undefined" === typeof b.value && (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE,
                                                b.message = "Invalid setting value.")
                                        } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Invalid setting value."
                                } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Settings definition has invalid valueMap property, not an array.";
                            else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Settings definition missing valueMap property for map type.";
                            this.hasProperty(f, "reverseValueMap", !0) && (f.reverseValueMap instanceof Array ? b.reverseValueMap =
                                f.reverseValueMap : (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Settings definition has invalid reverseValueMap property, not an array."))
                        } else if ("int" === f.valueType) this.hasProperty(f, "valueRange", !0) ? f.valueRange instanceof Array ? (b.valueRange = f.valueRange, h && (c && !isNaN(c) ? b.value = parseInt(c) : (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Invalid setting value, not a number."))) : (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message =
                        "Setting definition has invalid valueRange property, not an array.") : (b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Setting definition missing valueRange property for int type.");
                    else if ("string" === f.valueType) h && (b.value = c);
                    else if ("list" === f.valueType)
                        if (this.hasProperty(f, "values", !0))
                            if (f.values instanceof Array) {
                                if (b.values = f.values, h)
                                    if ("undefined" !== typeof c) {
                                        k = 0;
                                        for (p = f.values.length; k < p; k++)
                                            if (f.values[k] === c) {
                                                b.value = c;
                                                break
                                            }
                                        "undefined" === typeof b.value && (b.status =
                                            HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Invalid setting value.")
                                    } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTING_VALUE, b.message = "Invalid setting value."
                            } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Setting definition has invalid values property, not an array.";
                    else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Setting definition missing values property for list type.";
                    else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF,
                        b.message = "Unsupported setting value data type: " + f.valueType;
                    else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message = "Setting definition missing valueType property."
                }
            }
            0 !== b.status || b.command || (l ? (b.status = HoneywellBarcodeReaderErrors.UNSUPPORTED_KEY_OR_OPTION, b.message = "Unsupported key or option name") : (b.status = HoneywellBarcodeReaderErrors.UNSUPPORTED_FAMILY_NAME, b.message = "Unsupported family name: " + d))
        } else b.status = HoneywellBarcodeReaderErrors.INVALID_SETTINGS_DEF, b.message =
            "Invalid settings definition object, needs to be an array.";
        return b
    },
    getSymbologyName: function(a, d) {
        var e = "",
            g = HoneywellSymbologyIDTable.length,
            c, h = 0;
        if (!a) return e;
        for (c = 0; c < g; c++)
            if (a === HoneywellSymbologyIDTable[c].honeywellId) {
                e = HoneywellSymbologyIDTable[c].name;
                h = c;
                break
            }
        if (e && d && "j" === a)
            for (c = h; c < g; c++)
                if (1 === d.indexOf(HoneywellSymbologyIDTable[c].aimId, 1)) {
                    e = HoneywellSymbologyIDTable[c].name;
                    break
                }
        return e
    },
    hasJsonRpcError: function(a) {
        return "object" === typeof a && a.hasOwnProperty("error") && a.error ?
            a.error.hasOwnProperty("code") && a.error.hasOwnProperty("message") : !1
    },
    hasProperty: function(a, d, e) {
        return "object" === typeof a && a.hasOwnProperty(d) ? e ? null !== a[d] : !0 : !1
    },
    isFunction: function(a) {
        return typeof a == typeof Function
    },
    loadJavaScript: function(a, d) {
        var e = document.createElement("script");
        e.setAttribute("type", "text/javascript");
        e.setAttribute("src", a);
        this.isFunction(d) && (e.onload = d);
        document.getElementsByTagName("head")[0].appendChild(e)
    },
    sendJsonRpcRequestSubSys: function(a, d, e) {
        var g = this,
            c, h =
            this.getRandomInt(1E4, 99999);
        d.id = h;
        d.jsonrpc = "2.0";
        if (window.XMLHttpRequest) c = new XMLHttpRequest, c.onreadystatechange = function() {
            if (4 == c.readyState)
                if (200 == c.status) {
                    var b;
                    try {
                        b = JSON.parse(c.responseText)
                    } catch (a) {
                        g.isFunction(e) && (b = {
                            jsonrpc: "2.0"
                        }, b.id = h, b.error = {}, b.error.code = HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR, b.error.message = "JSON-RPC parsing error in response.", setTimeout(function() {
                            e(b)
                        }, 0));
                        return
                    }
                    h == b.id && g.isFunction(e) && setTimeout(function() {
                        e(b)
                    }, 0)
                } else g.isFunction(e) && (b = {
                    jsonrpc: "2.0"
                }, b.id = h, b.error = {}, b.error.code = HoneywellBarcodeReaderErrors.WEB_SERVICE_NOT_RESPONDING, b.error.message = "Web service not responding.", setTimeout(function() {
                    e(b)
                }, 0))
        }, c.open("POST", "http://127.0.0.1:8080/jsonrpc/" + a, !0), c.send(JSON.stringify(d));
        else if (g.isFunction(e)) {
            var b = {
                jsonrpc: "2.0"
            };
            b.id = h;
            b.error = {};
            b.error.code = HoneywellBarcodeReaderErrors.AJAX_NOT_SUPPORTED;
            b.error.message = "Browser does not support XMLHttpRequest";
            setTimeout(function() {
                e(b)
            }, 0)
        }
    },
    setup: function() {
        var a =
            this;
        a.bridgeType || ("undefined" !== typeof win10EnterpriseBrowserInfo ? (a.bridgeType = a.BRIDGE_TYPE_NATIVE_WINRT_OBJECT, "undefined" === typeof HoneywellBarcodeReaderSwiftWin && a.loadJavaScript("BarcodeReader-Swift-Win.js", function() {
                a.barcodeReaderObjName = "HoneywellBarcodeReaderSwiftWin"
            }), "undefined" === typeof HowneywellBarcodeReaderSwiftSettings && a.loadJavaScript("BarcodeReader-SwiftSettings.js"), "undefined" === typeof HowneywellBarcodeReaderRingSettings && a.loadJavaScript("BarcodeReader-WinRingSettings.js")) :
            !1 == a.checkNpapiPlugin() && a.sendJsonRpcRequestSubSys("datacollection", {
                method: "scanner.getInfo"
            }, function(d) {
                if (a.hasProperty(d, "result", !0) || a.hasJsonRpcError(d)) a.bridgeType = a.BRIDGE_TYPE_AJAX, "undefined" === typeof HoneywellBarcodeReaderAjax && a.loadJavaScript("BarcodeReader-Ajax.js", function() {
                    a.barcodeReaderObjName = "HoneywellBarcodeReaderAjax"
                }), "undefined" === typeof HowneywellBarcodeReaderSwiftSettings && a.loadJavaScript("BarcodeReader-SwiftSettings.js")
            }))
    },
    stdParamCheck: function(a, d, e, g) {
        if (typeof a ===
            e) return !0;
        this.isFunction(g) && setTimeout(function() {
            g({
                status: HoneywellBarcodeReaderErrors.INVALID_PARAMETER,
                message: "Invalid parameter: " + d + ", must be " + e
            })
        }, 0);
        return !1
    },
    stdParamCheckResult: function(a, d, e, g, c) {
        if (typeof a === e) return !0;
        this.isFunction(c) && (g ? (g.status = HoneywellBarcodeReaderErrors.INVALID_PARAMETER, g.message = "Invalid parameter: " + d + ", must be " + e, setTimeout(function() {
            c(g)
        }, 0)) : setTimeout(function() {
            c({
                status: HoneywellBarcodeReaderErrors.INVALID_PARAMETER,
                message: "Invalid parameter: " +
                    d + ", must be " + e
            })
        }, 0));
        return !1
    },
    stdErrorCheck: function(a, d) {
        var e = this;
        if (this.hasProperty(a, "result", !1)) return this.isFunction(d) && setTimeout(function() {
            d({
                status: 0,
                message: e.MSG_OPERATION_COMPLETED
            })
        }, 0), !0;
        this.hasJsonRpcError(a) ? this.isFunction(d) && setTimeout(function() {
            d({
                status: a.error.code,
                message: a.error.message
            })
        }, 0) : this.isFunction(d) && setTimeout(function() {
            d({
                status: HoneywellBarcodeReaderErrors.JSON_PARSE_ERROR,
                message: "JSON-RPC parsing error in response."
            })
        }, 0);
        return !1
    }
},
HoneywellBarcodeReaderErrors = {
    JS_BARCODE_READER_FACILITY_CODE: 2337,
    ERROR_CODE_BASE: 16500,
    JSON_PARSE_ERROR: -32700,
    FEATURE_NOT_SUPPORTED: -1994391502,
    FUNCTION_FAILED: -1994389925,
    INVALID_PARAMETER: -1994391465,
    INSUFFICIENT_BUFFER_SIZE: -1994391430,
    OUT_OF_MEMORY: -1994391544,
    INVALID_SETTING_VALUE: -1994326003,
    SCANNER_NOT_FOUND: -1994375551,
    SETTING_VALUE_EXCEED_MAX_LEN: -1994309986,
    SETTING_VALUE_OUT_OF_RANGE: -1994309985,
    UNSUPPORTED_FAMILY_NAME: -1994309984,
    UNSUPPORTED_KEY_OR_OPTION: -1994309983,
    CHAR_CONVERSION_ERROR: -1994309982,
    get NO_CONNECTION() {
        return this.formatError(1229)
    },
    get NO_AVAILABLE_BRIDGE() {
        return this.formatError(this.ERROR_CODE_BASE + 1)
    },
    get AJAX_NOT_SUPPORTED() {
        return this.formatError(this.ERROR_CODE_BASE + 2)
    },
    get WEB_SERVICE_NOT_RESPONDING() {
        return this.formatError(this.ERROR_CODE_BASE + 3)
    },
    get MISSING_SETTINGS_DEF() {
        return this.formatError(this.ERROR_CODE_BASE + 4)
    },
    get INVALID_SETTINGS_DEF() {
        return this.formatError(this.ERROR_CODE_BASE + 5)
    },
    get EMPTY_COMMIT_BUFFER() {
        return this.formatError(this.ERROR_CODE_BASE + 6)
    },
    formatError: function(a) {
        var d = 0;
        0 != a && 0 == (a &
            4294901760) && (d = 2147483648 | this.JS_BARCODE_READER_FACILITY_CODE << 16 | a);
        return d
    }
},
HoneywellSymbologyIDTable = [{
        name: "AUSTRALIAPOST",
        honeywellId: "A",
        aimId: "X0"
    }, {
        name: "AZTEC",
        honeywellId: "z",
        aimId: "z3"
    }, {
        name: "BPO",
        honeywellId: "B",
        aimId: "X0"
    }, {
        name: "CANADAPOST",
        honeywellId: "C",
        aimId: "X0"
    }, {
        name: "CODABAR",
        honeywellId: "a",
        aimId: "F0"
    }, {
        name: "CodablockA",
        honeywellId: "V",
        aimId: "O6"
    }, {
        name: "CodablockF",
        honeywellId: "q",
        aimId: "O4"
    }, {
        name: "Code11",
        honeywellId: "h",
        aimId: "H1"
    }, {
        name: "Code39",
        honeywellId: "b",
        aimId: "A0"
    },
    {
        name: "Code93",
        honeywellId: "i",
        aimId: "G0"
    }, {
        name: "Code128",
        honeywellId: "j",
        aimId: "C0"
    }, {
        name: "GS1_128",
        honeywellId: "I",
        aimId: "C1"
    }, {
        name: "ISBT128",
        honeywellId: "j",
        aimId: "C4"
    }, {
        name: "DATAMATRIX",
        honeywellId: "w",
        aimId: "d1"
    }, {
        name: "EAN8",
        honeywellId: "D",
        aimId: "E4"
    }, {
        name: "EAN13",
        honeywellId: "d",
        aimId: "E0"
    }, {
        name: "CHINAPOST",
        honeywellId: "Q",
        aimId: "X0"
    }, {
        name: "DUTCHPOST",
        honeywellId: "K",
        aimId: "X0"
    }, {
        name: "GS1EX",
        honeywellId: "}",
        aimId: "e0"
    }, {
        name: "GS1LI",
        honeywellId: "{",
        aimId: "e0"
    }, {
        name: "GS1OD",
        honeywellId: "y",
        aimId: "e0"
    }, {
        name: "HANXIN",
        honeywellId: "H",
        aimId: "X0"
    }, {
        name: "INFOMAIL",
        honeywellId: ",",
        aimId: "X0"
    }, {
        name: "INTELLIGENTMAIL",
        honeywellId: "M",
        aimId: "X0"
    }, {
        name: "ITF",
        honeywellId: "e",
        aimId: "I0"
    }, {
        name: "ITFMatrix",
        honeywellId: "m",
        aimId: "X0"
    }, {
        name: "ITFStandard",
        honeywellId: "f",
        aimId: "S0"
    }, {
        name: "JAPANPOST",
        honeywellId: "J",
        aimId: "X0"
    }, {
        name: "KOREANPOST",
        honeywellId: "?",
        aimId: "X0"
    }, {
        name: "MAXICODE",
        honeywellId: "x",
        aimId: "U0"
    }, {
        name: "MICROPDF",
        honeywellId: "R",
        aimId: "L0"
    }, {
        name: "MSI",
        honeywellId: "g",
        aimId: "M0"
    },
    {
        name: "PDF417",
        honeywellId: "r",
        aimId: "L0"
    }, {
        name: "PLANET",
        honeywellId: "L",
        aimId: "X0"
    }, {
        name: "POSTNET",
        honeywellId: "P",
        aimId: "X0"
    }, {
        name: "QR",
        honeywellId: "s",
        aimId: "Q1"
    }, {
        name: "SWEDENPOST",
        honeywellId: "[",
        aimId: "X0"
    }, {
        name: "TELEPEN",
        honeywellId: "t",
        aimId: "B1"
    }, {
        name: "TLC39",
        honeywellId: "T",
        aimId: "L2"
    }, {
        name: "TRIOPTIC",
        honeywellId: "\x3d",
        aimId: "X0"
    }, {
        name: "UPCA",
        honeywellId: "c",
        aimId: "E0"
    }, {
        name: "UPCE",
        honeywellId: "E",
        aimId: "E0"
    }
],
HoneywellBarcodeReaderWebEventDispatcher = {
    defaultScannerName: "dcs.scanner.imager",
    create: function(a) {
        function d(b, g) {
            if (typeof HoneywellBarcodeReaderUtils.log === typeof Function) {
                var a = b ? b + " " : "";
                "object" === typeof g ? HoneywellBarcodeReaderUtils.log(a + JSON.stringify(g)) : HoneywellBarcodeReaderUtils.log(a + g)
            }
        }
        var e = "http://127.0.0.1:8080/jsonrpc/" + a + "/events",
            g = !1,
            c = null,
            h = null,
            b = 1,
            l = function() {},
            n = function() {},
            m, f, k, p = function() {
                f || ("undefined" !== typeof document.webkitHidden ? (f = "webkitHidden", k = "webkitvisibilitychange") : "undefined" !== typeof document.hidden && (f = "hidden", k = "visibilitychange"));
                f && "undefined" !== typeof document.addEventListener && !m && (m = function() {
                    document[f] || (g = !0, q(), d("handleDocVisibilityChangeEvent", "requestEvents"))
                }, document.addEventListener(k, m, !1))
            },
            r = function(b) {
                b != g && (g = b) && q();
                b ? p() : m && (document.removeEventListener(k, m), m = null)
            },
            q = function() {
                var a = new XMLHttpRequest;
                a.open("POST", e, !0);
                a.setRequestHeader("Content-Type", "application/json");
                a.onreadystatechange = function() {
                    var b;
                    if (4 == a.readyState)
                        if (200 == a.status) try {
                            if (b = JSON.parse(a.responseText), HoneywellBarcodeReaderUtils.hasProperty(b,
                                    "result", !0)) {
                                var e = b.result.session;
                                e && (c = e);
                                if (HoneywellBarcodeReaderUtils.hasProperty(b.result, "events", !0)) {
                                    0 < b.result.events.length && d("Barcode event response:", b);
                                    var f, k;
                                    for (f = 0; f < b.result.events.length; f++) k = b.result.events[f], l(k.method, k.params, h)
                                }
                                g && q()
                            } else b.error && (n(b.error.code, b.error.message), d("events.getNext error response:", "code: " + b.error.code + " message: " + b.error.message))
                        } catch (m) {
                            d("Failed to handle response", a.responseText), n(-1, m.message), g = !1
                        } else d("HTTP error", "status " +
                            a.status + " " + a.statusText), n(a.status, a.statusText), g = !1
                };
                var f = {
                    id: b++,
                    jsonrpc: "2.0",
                    method: "events.getNext",
                    params: {
                        timeout: s.eventTimeout
                    }
                };
                c && (f.params.session = c);
                null !== h && (f.params.filter = h);
                try {
                    a.send(JSON.stringify(f))
                } catch (k) {
                    n(a.status, a.statusText), g = !1
                }
            },
            s = {
                eventTimeout: 60,
                startSession: function(b) {
                    l = HoneywellBarcodeReaderUtils.hasProperty(b, "event", !0) ? b.event : function() {};
                    n = HoneywellBarcodeReaderUtils.hasProperty(b, "error", !0) ? b.error : function() {};
                    h = HoneywellBarcodeReaderUtils.hasProperty(b,
                        "filter", !0) ? b.filter : null;
                    r(!0);
                    d(null, "Event session started")
                },
                stopSession: function() {
                    r(!1);
                    d(null, "Event session stopped")
                }
            };
        return s
    }
};
(function(a) {
var d = 0;
HoneywellBarcodeReaderUtils.setup();
var e = function(a) {
    HoneywellBarcodeReaderUtils.barcodeReaderObjName ? setTimeout(function() {
        a()
    }, 0) : 5E3 > d ? (d += 100, setTimeout(function() {
        e(a)
    }, 100)) : setTimeout(function() {
        a()
    }, 0)
};
a.BarcodeReader = function(a, c) {
    var d = this;
    e(function() {
        HoneywellBarcodeReaderUtils.barcodeReaderObjName ? "HoneywellBarcodeReaderSwiftWin" === HoneywellBarcodeReaderUtils.barcodeReaderObjName ? d.barcodeReader = new HoneywellBarcodeReaderSwiftWin(a, c) : "HoneywellBarcodeReaderAjax" ===
            HoneywellBarcodeReaderUtils.barcodeReaderObjName ? d.barcodeReader = new HoneywellBarcodeReaderAjax(a, c) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function() {
                c({
                    status: HoneywellBarcodeReaderErrors.NO_AVAILABLE_BRIDGE,
                    message: "No available JavaScript to Native bridge found."
                })
            }, 0) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function() {
                c({
                    status: HoneywellBarcodeReaderErrors.NO_AVAILABLE_BRIDGE,
                    message: "No available JavaScript to Native bridge found."
                })
            }, 0)
    })
};
a.BarcodeReader.prototype = {
    version: "1.20.00.0334",
    barcodeReader: null,
    activate: function(a, c) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.activate ? this.barcodeReader.activate(a, c) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function() {
            c({
                status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                message: "Method is not supported"
            })
        }, 0)
    },
    addEventListener: function(a, c, d) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.addEventListener && this.barcodeReader.addEventListener(a, c, d)
    },
    clearBuffer: function() {
        this.barcodeReader &&
            "undefined" !== typeof this.barcodeReader.clearBuffer && this.barcodeReader.clearBuffer()
    },
    close: function(a) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.close ? this.barcodeReader.close(a) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function() {
            a({
                status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                message: "Method is not supported"
            })
        }, 0)
    },
    commitBuffer: function(a) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.commitBuffer ? this.barcodeReader.commitBuffer(a) : HoneywellBarcodeReaderUtils.isFunction(a) &&
            setTimeout(function() {
                a({
                    status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                    message: "Method is not supported"
                })
            }, 0)
    },
    directIO: function(a, c) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.directIO ? this.barcodeReader.directIO(a, c) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function() {
            c({
                status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                message: "Method is not supported"
            })
        }, 0)
    },
    enableTrigger: function(a, c) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.enableTrigger ?
            this.barcodeReader.enableTrigger(a, c) : HoneywellBarcodeReaderUtils.isFunction(c) && setTimeout(function() {
                c({
                    status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                    message: "Method is not supported"
                })
            }, 0)
    },
    get: function(a, c, d, b) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.get ? this.barcodeReader.get(a, c, d, b) : HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function() {
            b({
                status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                message: "Method is not supported"
            })
        }, 0)
    },
    getBuffered: function(a,
        c, d, b) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.getBuffered ? this.barcodeReader.getBuffered(a, c, d, b) : HoneywellBarcodeReaderUtils.isFunction(b) && setTimeout(function() {
            b({
                status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                message: "Method is not supported"
            })
        }, 0)
    },
    getLicenseInfo: function(a) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.getLicenseInfo ? this.barcodeReader.getLicenseInfo(a) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function() {
            a({
                status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                message: "Method is not supported"
            })
        }, 0)
    },
    removeEventListener: function(a, c) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.removeEventListener && this.barcodeReader.removeEventListener(a, c)
    },
    set: function(a, c, d, b, e) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.set ? this.barcodeReader.set(a, c, d, b, e) : HoneywellBarcodeReaderUtils.isFunction(e) && setTimeout(function() {
            e({
                status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                message: "Method is not supported"
            })
        }, 0)
    },
    setBuffered: function(a,
        c, d, b, e) {
        this.barcodeReader && "undefined" !== typeof this.barcodeReader.setBuffered ? this.barcodeReader.setBuffered(a, c, d, b, e) : HoneywellBarcodeReaderUtils.isFunction(e) && setTimeout(function() {
            e({
                status: HoneywellBarcodeReaderErrors.FEATURE_NOT_SUPPORTED,
                message: "Method is not supported"
            })
        }, 0)
    }
};
a.BarcodeReaders = function(a) {
    var c = this;
    e(function() {
        HoneywellBarcodeReaderUtils.barcodeReaderObjName ? "HoneywellBarcodeReaderSwiftWin" === HoneywellBarcodeReaderUtils.barcodeReaderObjName ? c.barcodeReaders = new HoneywellBarcodeReadersSwiftWin(a) :
            "HoneywellBarcodeReaderAjax" === HoneywellBarcodeReaderUtils.barcodeReaderObjName ? c.barcodeReaders = new HoneywellBarcodeReadersAjax(a) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function() {
                a({
                    status: HoneywellBarcodeReaderErrors.NO_AVAILABLE_BRIDGE,
                    message: "No available JavaScript to Native bridge found."
                })
            }, 0) : HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function() {
                    a({
                        status: HoneywellBarcodeReaderErrors.NO_AVAILABLE_BRIDGE,
                        message: "No available JavaScript to Native bridge found."
                    })
                },
                0)
    })
};
a.BarcodeReaders.prototype = {
    version: "1.20.00.0334",
    barcodeReaders: null,
    getAvailableBarcodeReaders: function(a) {
        var c;
        this.barcodeReaders && "undefined" !== typeof this.barcodeReaders.getAvailableBarcodeReaders ? c = this.barcodeReaders.getAvailableBarcodeReaders(a) : (c = [], HoneywellBarcodeReaderUtils.isFunction(a) && setTimeout(function() {
            a(c)
        }, 0));
        return c
    }
}
})(this);