$(function () {
    var chart;
    var comperformancechart;

    $(document).ready(function(){
        $.getJSON('/ajax/ajaxclassgrades/', 
            function(data) {
                chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'classchart',
                    type: 'line',
                    marginRight: 130,
                    marginBottom: 25
                },
                title: {
                    text: '班级成绩查看',
                    x: -20 //center
                },
                subtitle: {
                    text: '比较各班成绩平均分',
                    x: -20
                },
                xAxis: {
                    categories: data[0],
                },
                yAxis: {
                    title: {
                        text: '平均分'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function() {
                            return '<b>'+ this.series.name + '班' +'</b><br/>'+
                            this.x +': '+ this.y +'分';
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 100,
                    borderWidth: 0
                },
                series: data[1],
            });
        });
    });
    
    $(document).ready(function(){
        $.getJSON('/ajax/ajaxclasscomperformances/', 
            function(data) {
                comperformancechart = new Highcharts.Chart({
                chart: {
                    renderTo: 'classcomperformancechart',
                    type: 'line',
                    marginRight: 130,
                    marginBottom: 25
                },
                title: {
                    text: '班级综合成绩查看',
                    x: -20 //center
                },
                subtitle: {
                    text: '比较各班综合成绩平均分',
                    x: -20
                },
                xAxis: {
                    categories: data[0],
                },
                yAxis: {
                    title: {
                        text: '综合成绩平均分'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function() {
                            return '<b>'+ this.series.name + '班' +'</b><br/>'+
                            this.x +': '+ this.y +'分';
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 100,
                    borderWidth: 0
                },
                series: data[1],
            });
        });
    });
});
