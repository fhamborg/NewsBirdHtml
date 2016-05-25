/* 
 * Author: Felix Hamborg <felix.hamborg@uni-konstanz.de>
 */
var coords = {"PR": {"latitude": 18.25, "longitude": -66.5}, "PS": {"latitude": 32.0, "longitude": 35.25}, "PT": {"latitude": 39.5, "longitude": -8.0}, "PW": {"latitude": 7.5, "longitude": 134.5}, "PY": {"latitude": -23.0, "longitude": -58.0}, "QA": {"latitude": 25.5, "longitude": 51.25}, "AD": {"latitude": 42.5, "longitude": 1.5}, "AE": {"latitude": 24.0, "longitude": 54.0}, "AF": {"latitude": 33.0, "longitude": 65.0}, "AG": {"latitude": 17.05, "longitude": -61.8}, "AI": {"latitude": 18.25, "longitude": -63.1667}, "AL": {"latitude": 41.0, "longitude": 20.0}, "AM": {"latitude": 40.0, "longitude": 45.0}, "AN": {"latitude": 12.25, "longitude": -68.75}, "AO": {"latitude": -12.5, "longitude": 18.5}, "AP": {"latitude": 35.0, "longitude": 105.0}, "AQ": {"latitude": -90.0, "longitude": 0.0}, "AR": {"latitude": -34.0, "longitude": -64.0}, "AS": {"latitude": -14.3333, "longitude": -170.0}, "AT": {"latitude": 47.3333, "longitude": 13.3333}, "RE": {"latitude": -21.1, "longitude": 55.6}, "AU": {"latitude": -27.0, "longitude": 133.0}, "AW": {"latitude": 12.5, "longitude": -69.9667}, "AZ": {"latitude": 40.5, "longitude": 47.5}, "RO": {"latitude": 46.0, "longitude": 25.0}, "BA": {"latitude": 44.0, "longitude": 18.0}, "BB": {"latitude": 13.1667, "longitude": -59.5333}, "RS": {"latitude": 44.0, "longitude": 21.0}, "BD": {"latitude": 24.0, "longitude": 90.0}, "BE": {"latitude": 50.8333, "longitude": 4.0}, "RU": {"latitude": 60.0, "longitude": 100.0}, "BF": {"latitude": 13.0, "longitude": -2.0}, "BG": {"latitude": 43.0, "longitude": 25.0}, "RW": {"latitude": -2.0, "longitude": 30.0}, "BH": {"latitude": 26.0, "longitude": 50.55}, "BI": {"latitude": -3.5, "longitude": 30.0}, "BJ": {"latitude": 9.5, "longitude": 2.25}, "BM": {"latitude": 32.3333, "longitude": -64.75}, "BN": {"latitude": 4.5, "longitude": 114.6667}, "BO": {"latitude": -17.0, "longitude": -65.0}, "SA": {"latitude": 25.0, "longitude": 45.0}, "SB": {"latitude": -8.0, "longitude": 159.0}, "BR": {"latitude": -10.0, "longitude": -55.0}, "SC": {"latitude": -4.5833, "longitude": 55.6667}, "BS": {"latitude": 24.25, "longitude": -76.0}, "SD": {"latitude": 15.0, "longitude": 30.0}, "BT": {"latitude": 27.5, "longitude": 90.5}, "SE": {"latitude": 62.0, "longitude": 15.0}, "BV": {"latitude": -54.4333, "longitude": 3.4}, "SG": {"latitude": 1.3667, "longitude": 103.8}, "BW": {"latitude": -22.0, "longitude": 24.0}, "SH": {"latitude": -15.9333, "longitude": -5.7}, "SI": {"latitude": 46.0, "longitude": 15.0}, "BY": {"latitude": 53.0, "longitude": 28.0}, "SJ": {"latitude": 78.0, "longitude": 20.0}, "BZ": {"latitude": 17.25, "longitude": -88.75}, "SK": {"latitude": 48.6667, "longitude": 19.5}, "SL": {"latitude": 8.5, "longitude": -11.5}, "SM": {"latitude": 43.7667, "longitude": 12.4167}, "SN": {"latitude": 14.0, "longitude": -14.0}, "SO": {"latitude": 10.0, "longitude": 49.0}, "CA": {"latitude": 60.0, "longitude": -95.0}, "SR": {"latitude": 4.0, "longitude": -56.0}, "CC": {"latitude": -12.5, "longitude": 96.8333}, "CD": {"latitude": 0.0, "longitude": 25.0}, "ST": {"latitude": 1.0, "longitude": 7.0}, "CF": {"latitude": 7.0, "longitude": 21.0}, "SV": {"latitude": 13.8333, "longitude": -88.9167}, "CG": {"latitude": -1.0, "longitude": 15.0}, "CH": {"latitude": 47.0, "longitude": 8.0}, "CI": {"latitude": 8.0, "longitude": -5.0}, "SY": {"latitude": 35.0, "longitude": 38.0}, "SZ": {"latitude": -26.5, "longitude": 31.5}, "CK": {"latitude": -21.2333, "longitude": -159.7667}, "CL": {"latitude": -30.0, "longitude": -71.0}, "CM": {"latitude": 6.0, "longitude": 12.0}, "CN": {"latitude": 35.0, "longitude": 105.0}, "CO": {"latitude": 4.0, "longitude": -72.0}, "CR": {"latitude": 10.0, "longitude": -84.0}, "TC": {"latitude": 21.75, "longitude": -71.5833}, "TD": {"latitude": 15.0, "longitude": 19.0}, "CU": {"latitude": 21.5, "longitude": -80.0}, "TF": {"latitude": -43.0, "longitude": 67.0}, "CV": {"latitude": 16.0, "longitude": -24.0}, "TG": {"latitude": 8.0, "longitude": 1.1667}, "TH": {"latitude": 15.0, "longitude": 100.0}, "CX": {"latitude": -10.5, "longitude": 105.6667}, "CY": {"latitude": 35.0, "longitude": 33.0}, "TJ": {"latitude": 39.0, "longitude": 71.0}, "CZ": {"latitude": 49.75, "longitude": 15.5}, "TK": {"latitude": -9.0, "longitude": -172.0}, "TM": {"latitude": 40.0, "longitude": 60.0}, "TN": {"latitude": 34.0, "longitude": 9.0}, "TO": {"latitude": -20.0, "longitude": -175.0}, "TR": {"latitude": 39.0, "longitude": 35.0}, "TT": {"latitude": 11.0, "longitude": -61.0}, "DE": {"latitude": 51.0, "longitude": 9.0}, "TV": {"latitude": -8.0, "longitude": 178.0}, "TW": {"latitude": 23.5, "longitude": 121.0}, "DJ": {"latitude": 11.5, "longitude": 43.0}, "TZ": {"latitude": -6.0, "longitude": 35.0}, "DK": {"latitude": 56.0, "longitude": 10.0}, "DM": {"latitude": 15.4167, "longitude": -61.3333}, "DO": {"latitude": 19.0, "longitude": -70.6667}, "UA": {"latitude": 49.0, "longitude": 32.0}, "UG": {"latitude": 1.0, "longitude": 32.0}, "DZ": {"latitude": 28.0, "longitude": 3.0}, "UM": {"latitude": 19.2833, "longitude": 166.6}, "EC": {"latitude": -2.0, "longitude": -77.5}, "US": {"latitude": 38.0, "longitude": -97.0}, "EE": {"latitude": 59.0, "longitude": 26.0}, "EG": {"latitude": 27.0, "longitude": 30.0}, "EH": {"latitude": 24.5, "longitude": -13.0}, "UY": {"latitude": -33.0, "longitude": -56.0}, "UZ": {"latitude": 41.0, "longitude": 64.0}, "VA": {"latitude": 41.9, "longitude": 12.45}, "ER": {"latitude": 15.0, "longitude": 39.0}, "VC": {"latitude": 13.25, "longitude": -61.2}, "ES": {"latitude": 40.0, "longitude": -4.0}, "ET": {"latitude": 8.0, "longitude": 38.0}, "VE": {"latitude": 8.0, "longitude": -66.0}, "EU": {"latitude": 47.0, "longitude": 8.0}, "VG": {"latitude": 18.5, "longitude": -64.5}, "VI": {"latitude": 18.3333, "longitude": -64.8333}, "VN": {"latitude": 16.0, "longitude": 106.0}, "VU": {"latitude": -16.0, "longitude": 167.0}, "FI": {"latitude": 64.0, "longitude": 26.0}, "FJ": {"latitude": -18.0, "longitude": 175.0}, "FK": {"latitude": -51.75, "longitude": -59.0}, "FM": {"latitude": 6.9167, "longitude": 158.25}, "FO": {"latitude": 62.0, "longitude": -7.0}, "FR": {"latitude": 46.0, "longitude": 2.0}, "WF": {"latitude": -13.3, "longitude": -176.2}, "GA": {"latitude": -1.0, "longitude": 11.75}, "GB": {"latitude": 54.0, "longitude": -2.0}, "WS": {"latitude": -13.5833, "longitude": -172.3333}, "GD": {"latitude": 12.1167, "longitude": -61.6667}, "GE": {"latitude": 42.0, "longitude": 43.5}, "GF": {"latitude": 4.0, "longitude": -53.0}, "GH": {"latitude": 8.0, "longitude": -2.0}, "GI": {"latitude": 36.1833, "longitude": -5.3667}, "GL": {"latitude": 72.0, "longitude": -40.0}, "GM": {"latitude": 13.4667, "longitude": -16.5667}, "GN": {"latitude": 11.0, "longitude": -10.0}, "GP": {"latitude": 16.25, "longitude": -61.5833}, "GQ": {"latitude": 2.0, "longitude": 10.0}, "GR": {"latitude": 39.0, "longitude": 22.0}, "GS": {"latitude": -54.5, "longitude": -37.0}, "GT": {"latitude": 15.5, "longitude": -90.25}, "GU": {"latitude": 13.4667, "longitude": 144.7833}, "GW": {"latitude": 12.0, "longitude": -15.0}, "GY": {"latitude": 5.0, "longitude": -59.0}, "HK": {"latitude": 22.25, "longitude": 114.1667}, "HM": {"latitude": -53.1, "longitude": 72.5167}, "HN": {"latitude": 15.0, "longitude": -86.5}, "HR": {"latitude": 45.1667, "longitude": 15.5}, "HT": {"latitude": 19.0, "longitude": -72.4167}, "YE": {"latitude": 15.0, "longitude": 48.0}, "HU": {"latitude": 47.0, "longitude": 20.0}, "ID": {"latitude": -5.0, "longitude": 120.0}, "YT": {"latitude": -12.8333, "longitude": 45.1667}, "IE": {"latitude": 53.0, "longitude": -8.0}, "IL": {"latitude": 31.5, "longitude": 34.75}, "IN": {"latitude": 20.0, "longitude": 77.0}, "IO": {"latitude": -6.0, "longitude": 71.5}, "ZA": {"latitude": -29.0, "longitude": 24.0}, "IQ": {"latitude": 33.0, "longitude": 44.0}, "IR": {"latitude": 32.0, "longitude": 53.0}, "IS": {"latitude": 65.0, "longitude": -18.0}, "IT": {"latitude": 42.8333, "longitude": 12.8333}, "ZM": {"latitude": -15.0, "longitude": 30.0}, "ZW": {"latitude": -20.0, "longitude": 30.0}, "JM": {"latitude": 18.25, "longitude": -77.5}, "JO": {"latitude": 31.0, "longitude": 36.0}, "JP": {"latitude": 36.0, "longitude": 138.0}, "KE": {"latitude": 1.0, "longitude": 38.0}, "KG": {"latitude": 41.0, "longitude": 75.0}, "KH": {"latitude": 13.0, "longitude": 105.0}, "KI": {"latitude": 1.4167, "longitude": 173.0}, "KM": {"latitude": -12.1667, "longitude": 44.25}, "KN": {"latitude": 17.3333, "longitude": -62.75}, "KP": {"latitude": 40.0, "longitude": 127.0}, "KR": {"latitude": 37.0, "longitude": 127.5}, "KW": {"latitude": 29.3375, "longitude": 47.6581}, "KY": {"latitude": 19.5, "longitude": -80.5}, "KZ": {"latitude": 48.0, "longitude": 68.0}, "LA": {"latitude": 18.0, "longitude": 105.0}, "LB": {"latitude": 33.8333, "longitude": 35.8333}, "LC": {"latitude": 13.8833, "longitude": -61.1333}, "LI": {"latitude": 47.1667, "longitude": 9.5333}, "LK": {"latitude": 7.0, "longitude": 81.0}, "LR": {"latitude": 6.5, "longitude": -9.5}, "LS": {"latitude": -29.5, "longitude": 28.5}, "LT": {"latitude": 56.0, "longitude": 24.0}, "LU": {"latitude": 49.75, "longitude": 6.1667}, "LV": {"latitude": 57.0, "longitude": 25.0}, "LY": {"latitude": 25.0, "longitude": 17.0}, "MA": {"latitude": 32.0, "longitude": -5.0}, "MC": {"latitude": 43.7333, "longitude": 7.4}, "MD": {"latitude": 47.0, "longitude": 29.0}, "ME": {"latitude": 42.0, "longitude": 19.0}, "MG": {"latitude": -20.0, "longitude": 47.0}, "MH": {"latitude": 9.0, "longitude": 168.0}, "MK": {"latitude": 41.8333, "longitude": 22.0}, "ML": {"latitude": 17.0, "longitude": -4.0}, "MM": {"latitude": 22.0, "longitude": 98.0}, "MN": {"latitude": 46.0, "longitude": 105.0}, "MO": {"latitude": 22.1667, "longitude": 113.55}, "MP": {"latitude": 15.2, "longitude": 145.75}, "MQ": {"latitude": 14.6667, "longitude": -61.0}, "MR": {"latitude": 20.0, "longitude": -12.0}, "MS": {"latitude": 16.75, "longitude": -62.2}, "MT": {"latitude": 35.8333, "longitude": 14.5833}, "MU": {"latitude": -20.2833, "longitude": 57.55}, "MV": {"latitude": 3.25, "longitude": 73.0}, "MW": {"latitude": -13.5, "longitude": 34.0}, "MX": {"latitude": 23.0, "longitude": -102.0}, "MY": {"latitude": 2.5, "longitude": 112.5}, "MZ": {"latitude": -18.25, "longitude": 35.0}, "NA": {"latitude": -22.0, "longitude": 17.0}, "NC": {"latitude": -21.5, "longitude": 165.5}, "NE": {"latitude": 16.0, "longitude": 8.0}, "NF": {"latitude": -29.0333, "longitude": 167.95}, "NG": {"latitude": 10.0, "longitude": 8.0}, "NI": {"latitude": 13.0, "longitude": -85.0}, "NL": {"latitude": 52.5, "longitude": 5.75}, "NO": {"latitude": 62.0, "longitude": 10.0}, "NP": {"latitude": 28.0, "longitude": 84.0}, "NR": {"latitude": -0.5333, "longitude": 166.9167}, "NU": {"latitude": -19.0333, "longitude": -169.8667}, "NZ": {"latitude": -41.0, "longitude": 174.0}, "OM": {"latitude": 21.0, "longitude": 57.0}, "PA": {"latitude": 9.0, "longitude": -80.0}, "PE": {"latitude": -10.0, "longitude": -76.0}, "PF": {"latitude": -15.0, "longitude": -140.0}, "PG": {"latitude": -6.0, "longitude": 147.0}, "PH": {"latitude": 13.0, "longitude": 122.0}, "PK": {"latitude": 30.0, "longitude": 70.0}, "PL": {"latitude": 52.0, "longitude": 20.0}, "PM": {"latitude": 46.8333, "longitude": -56.3333}};
var _countryCodes = ["PR", "PS", "PT", "PW", "PY", "QA", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "RE", "AU", "AW", "AZ", "RO", "BA", "BB", "RS", "BD", "BE", "RU", "BF", "BG", "RW", "BH", "BI", "BJ", "BM", "BN", "BO", "SA", "SB", "BR", "SC", "BS", "SD", "BT", "SE", "BV", "SG", "BW", "SH", "SI", "BY", "SJ", "BZ", "SK", "SL", "SM", "SN", "SO", "CA", "SR", "CC", "CD", "ST", "CF", "SV", "CG", "CH", "CI", "SY", "SZ", "CK", "CL", "CM", "CN", "CO", "CR", "TC", "TD", "CU", "TF", "CV", "TG", "TH", "CX", "CY", "TJ", "CZ", "TK", "TM", "TN", "TO", "TR", "TT", "DE", "TV", "TW", "DJ", "TZ", "DK", "DM", "DO", "UA", "UG", "DZ", "UM", "EC", "US", "EE", "EG", "EH", "UY", "UZ", "VA", "ER", "VC", "ES", "ET", "VE", "EU", "VG", "VI", "VN", "VU", "FI", "FJ", "FK", "FM", "FO", "FR", "WF", "GA", "GB", "WS", "GD", "GE", "GF", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "YE", "HU", "ID", "YT", "IE", "IL", "IN", "IO", "ZA", "IQ", "IR", "IS", "IT", "ZM", "ZW", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM"];
var cells = [
    {
        "row": "FR",
        "column": "ALL_DOCS",
        "value": [
            {
                "value": "have",
                "score": 6.970723628997803
            },
            {
                "value": "has",
                "score": 6.210158348083496
            },
            {
                "value": "which",
                "score": 4.797419548034668
            },
            {
                "value": "more",
                "score": 4.161744117736816
            },
            {
                "value": "work",
                "score": 3.7601687908172607
            },
            {
                "value": "over",
                "score": 3.447791337966919
            },
            {
                "value": "years",
                "score": 3.447791337966919
            },
            {
                "value": "people",
                "score": 3.256401777267456
            },
            {
                "value": "also",
                "score": 3.078887462615967
            },
            {
                "value": "what",
                "score": 2.8512892723083496
            },
            {
                "value": "been",
                "score": 2.7886157035827637
            },
            {
                "value": "from",
                "score": 2.7042174339294434
            },
            {
                "value": "new",
                "score": 2.591517448425293
            },
            {
                "value": "would",
                "score": 2.412083625793457
            },
            {
                "value": "can",
                "score": 2.2883033752441406
            },
            {
                "value": "year",
                "score": 2.157433271408081
            },
            {
                "value": "he",
                "score": 1.632131576538086
            },
            {
                "value": "its",
                "score": 1.4569934606552124
            },
            {
                "value": "president",
                "score": 1.4569934606552124
            },
            {
                "value": "jobs",
                "score": 1.3897099494934082
            }
        ],
        "countDocs": 71,
        "countTopics": 1
    },
    {
        "row": "GB",
        "column": "ALL_DOCS",
        "value": [
            {
                "value": "said",
                "score": 11.956521987915039
            },
            {
                "value": "he",
                "score": 9.945013999938965
            },
            {
                "value": "have",
                "score": 8.708552360534668
            },
            {
                "value": "has",
                "score": 8.45849323272705
            },
            {
                "value": "his",
                "score": 8.34548282623291
            },
            {
                "value": "had",
                "score": 8.120070457458496
            },
            {
                "value": "been",
                "score": 7.8440842628479
            },
            {
                "value": "who",
                "score": 7.37394380569458
            },
            {
                "value": "from",
                "score": 7.028573036193848
            },
            {
                "value": "after",
                "score": 6.970723628997803
            },
            {
                "value": "police",
                "score": 6.620460033416748
            },
            {
                "value": "were",
                "score": 6.551358699798584
            },
            {
                "value": "out",
                "score": 5.592382907867432
            },
            {
                "value": "people",
                "score": 5.471590042114258
            },
            {
                "value": "which",
                "score": 5.431208610534668
            },
            {
                "value": "up",
                "score": 5.2665886878967285
            },
            {
                "value": "year",
                "score": 5.2665886878967285
            },
            {
                "value": "her",
                "score": 4.9628777503967285
            },
            {
                "value": "would",
                "score": 4.884016990661621
            },
            {
                "value": "when",
                "score": 4.861817359924316
            }
        ],
        "countDocs": 100,
        "countTopics": 2
    },
    {
        "row": "DE",
        "column": "ALL_DOCS",
        "value": [
            {
                "value": "from",
                "score": 8.888094902038574
            },
            {
                "value": "company",
                "score": 7.623353958129883
            },
            {
                "value": "its",
                "score": 7.5648579597473145
            },
            {
                "value": "which",
                "score": 6.329757213592529
            },
            {
                "value": "2014",
                "score": 5.956558704376221
            },
            {
                "value": "other",
                "score": 5.4813408851623535
            },
            {
                "value": "has",
                "score": 5.4483489990234375
            },
            {
                "value": "than",
                "score": 5.053277015686035
            },
            {
                "value": "exchange",
                "score": 4.287251949310303
            },
            {
                "value": "any",
                "score": 4.227968692779541
            },
            {
                "value": "have",
                "score": 4.203996181488037
            },
            {
                "value": "shares",
                "score": 3.8059418201446533
            },
            {
                "value": "forward",
                "score": 3.788328170776367
            },
            {
                "value": "about",
                "score": 3.694366216659546
            },
            {
                "value": "all",
                "score": 3.6164145469665527
            },
            {
                "value": "financial",
                "score": 3.529707193374634
            },
            {
                "value": "common",
                "score": 3.4442524909973145
            },
            {
                "value": "year",
                "score": 3.4395105838775635
            },
            {
                "value": "new",
                "score": 3.265976667404175
            },
            {
                "value": "more",
                "score": 3.2500650882720947
            }
        ],
        "countDocs": 100,
        "countTopics": 2
    },
    {
        "row": "RU",
        "column": "ALL_DOCS",
        "value": [
            {
                "value": "said",
                "score": 7.1182026863098145
            },
            {
                "value": "russian",
                "score": 6.853559970855713
            },
            {
                "value": "russia",
                "score": 5.741756439208984
            },
            {
                "value": "moscow",
                "score": 5.6274333000183105
            },
            {
                "value": "november",
                "score": 5.033329010009766
            },
            {
                "value": "novosti",
                "score": 4.942631244659424
            },
            {
                "value": "ria",
                "score": 4.942631244659424
            },
            {
                "value": "friday",
                "score": 4.929046154022217
            },
            {
                "value": "have",
                "score": 4.6446943283081055
            },
            {
                "value": "states",
                "score": 3.634291410446167
            },
            {
                "value": "its",
                "score": 3.634291410446167
            },
            {
                "value": "united",
                "score": 3.1459827423095703
            },
            {
                "value": "7",
                "score": 3.088923454284668
            },
            {
                "value": "has",
                "score": 3.078887462615967
            },
            {
                "value": "ukraine",
                "score": 2.0299723148345947
            },
            {
                "value": "against",
                "score": 1.7311663627624512
            },
            {
                "value": "we",
                "score": 1.4992339611053467
            },
            {
                "value": "foreign",
                "score": 1.2903132438659668
            },
            {
                "value": "between",
                "score": 1.2376251220703125
            },
            {
                "value": "west",
                "score": 1.1720051765441895
            }
        ],
        "countDocs": 100,
        "countTopics": 2
    },
    {
        "row": "US",
        "column": "ALL_DOCS",
        "value": [
            {
                "value": "court",
                "score": 11.767934799194336
            },
            {
                "value": "health",
                "score": 11.454068183898926
            },
            {
                "value": "law",
                "score": 11.131352424621582
            },
            {
                "value": "states",
                "score": 10.141544342041016
            },
            {
                "value": "have",
                "score": 9.6067476272583
            },
            {
                "value": "said",
                "score": 9.26520824432373
            },
            {
                "value": "insurance",
                "score": 8.957806587219238
            },
            {
                "value": "care",
                "score": 8.584656715393066
            },
            {
                "value": "subsidies",
                "score": 8.420914649963379
            },
            {
                "value": "up",
                "score": 8.346832275390625
            },
            {
                "value": "case",
                "score": 7.8440842628479
            },
            {
                "value": "federal",
                "score": 7.636044502258301
            },
            {
                "value": "who",
                "score": 7.4291863441467285
            },
            {
                "value": "more",
                "score": 6.989936351776123
            },
            {
                "value": "people",
                "score": 6.766794681549072
            },
            {
                "value": "from",
                "score": 6.590175151824951
            },
            {
                "value": "has",
                "score": 6.4893903732299805
            },
            {
                "value": "exchanges",
                "score": 6.3586297035217285
            },
            {
                "value": "supreme",
                "score": 6.260040283203125
            },
            {
                "value": "act",
                "score": 5.981058120727539
            }
        ],
        "countDocs": 100,
        "countTopics": 2
    }
];

function Geo(par) {
    var that = this;
    var parent = par;
    var matrixEntries;
    var countryCodes;

    var margin = {top: 150, right: 10, bottom: 50, left: 100};
    var height = 600;
    var width = 600;
    
    var projection;

    Geo.prototype.draw = function () {
        $('#' + parent.attr('id')).empty();
        var svg = parent.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                ;

        svg.append("g")
                .selectAll(".hi")
                .data(matrixEntries)
                .enter()
                .append("text")
                .attr("x", function (d, i) {
                    return coords[d.row].longitude;
                })
                .attr("y", function (d, i) {
                    return coords[d.row].latitude;
                })
                .text(function (d, i) {
                    return d.row;
                })
                ;
    };

    /**
     * If anything changes which influences the visualization, this needs to be invoked. 
     * This will update the visualization.
     * @returns {undefined}
     */
    Geo.prototype.updateVisualization = function () {
        console.log("need to refresh geo visualization");

        matrixEntries = cells;
        countryCodes = _countryCodes;

        this.draw();
    };

    // FOR DEBUG
    this.updateVisualization();
}
