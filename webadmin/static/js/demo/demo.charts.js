/*
 * MWS Admin v2.1 - Charts Demo JS
 * This file is part of MWS Admin, an Admin template build for sale at ThemeForest.
 * All copyright to this file is hold by Mairel Theafila <maimairel@yahoo.com> a.k.a nagaemas on ThemeForest.
 * Last Updated:
 * December 08, 2012
 *
 */

;(function( $, window, document, undefined ) {

    $(document).ready(function() {
        
        if($.plot) {
            var sin = [],
                cos = [];
            for (var i = 0; i < 3 * Math.PI; i += 0.25) {
                sin.push([i, Math.sin(i) * Math.sin(i)]);
                cos.push([i, Math.cos(i)]);
            }

            var plot = $.plot($("#mws-line-chart"), [{
                data: sin,
                label: "Sin(x) * Sin(x)",
                color: "#c75d7b"
            }, {
                data: cos,
                label: "Cos(x)",
                color: "#c5d52b"
            }], {
                tooltip: true, 
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                grid: {
                    borderWidth: 0, 
                    hoverable: true,
                    clickable: true
                }
            });

            var data = [{
                label: "American",
                data: 41
            }, {
                label: "Indonesian",
                data: 12
            }, {
                label: "Dutch",
                data: 55
            }, {
                label: "Japanese",
                data: 12
            }, {
                label: "Korean",
                data: 11
            }, {
                label: "French",
                data: 66
            }, {
                label: "Chinese",
                data: 11
            }];

            $.plot($("#mws-pie-1"),
            data, {
                series: {
                    pie: {
                        show: true
                    }
                }
            });

            $.plot($("#mws-pie-2"),
            data, {
                series: {
                    pie: {
                        show: true
                    }
                },
                legend: {
                    show: false
                }
            });

            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);

            var d2 = [];
            for (var i = 0; i <= 10; i += 1)
            d2.push([i, parseInt(Math.random() * 30)]);

            var d3 = [];
            for (var i = 0; i <= 10; i += 1)
            d3.push([i, parseInt(Math.random() * 30)]);

            var stack = 0,
                bars = true,
                lines = false,
                steps = false;

            $.plot($("#mws-bar-chart"), [d1, d2, d3], {
                series: {
                    stack: stack,
                    lines: {
                        show: lines,
                        fill: true,
                        steps: steps
                    },
                    bars: {
                        show: bars,
                        barWidth: 0.6
                    }
                }, 
                grid: {
                    borderWidth: 0
                }
            });
        }
    });

}) (jQuery, window, document);