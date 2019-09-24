/*Copyright (c) 2013 NTS Corp. All Rights Reserved.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
/*Developed by Insook Choe (choe.insook@nhn.com), Inho Jung(inho.jung@nhn.com)*/

var CONST_SVG_URL = 'http://www.w3.org/2000/svg';
var VML_NAME_SPACE = 'urn:schemas-microsoft-com:vml'
var CONST_MAX_RADIUS = 100;
var CONST_DECREMENT = 20;

var Nwagon = {

    chart: function(options){
        var isIE_old = false;
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
            var ieversion = new Number(RegExp.$1); // capture x.x portion and store as a number
            if (ieversion <= 8){

                isIE_old = true;
                if(!document.namespaces['v']) {
                   document.namespaces.add('v', VML_NAME_SPACE);
                }
            }
        }
        var chartObj = new Object();
        chartObj.chartType = options['chartType'];
        chartObj.dataset = options['dataset'];
        chartObj.legend = options['legend'];
        chartObj.width = options['chartSize']['width'];
        chartObj.height = options['chartSize']['height'];
        chartObj.chart_div = options['chartDiv'];

        //************ values.length should be equal to names.length **************// 
        switch (chartObj.chartType)
        {
        case ('line') :
            case ('jira') :
                if (options.hasOwnProperty('bottomOffsetValue')) chartObj.bottomOffsetValue = options['bottomOffsetValue']; 
                if (options.hasOwnProperty('leftOffsetValue')) chartObj.leftOffsetValue = options['leftOffsetValue']; 
                if (options['maxValue']) chartObj.highest = options['maxValue'];
                if (options['minValue']) chartObj.lowest = options['minValue'];
                if (options['increment']) chartObj.increment = options['increment'];
                if (options['isGuideLineNeeded']) chartObj.isGuideLineNeeded = options['isGuideLineNeeded'];
                isIE_old ? Nwagon_ie.line.drawLineChart(chartObj) : this.line.drawLineChart(chartObj);
                break;
            case ('column'):
            case ('stacked_column') :
            case ('multi_column') :
                if (options.hasOwnProperty('bottomOffsetValue')) chartObj.bottomOffsetValue = options['bottomOffsetValue']; 
                if (options.hasOwnProperty('leftOffsetValue')) chartObj.leftOffsetValue = options['leftOffsetValue']; 
                if (options.hasOwnProperty('topOffsetValue')) chartObj.topOffsetValue = options['topOffsetValue']; 
                if (options.hasOwnProperty('rightOffsetValue')) chartObj.rightOffsetValue = options['rightOffsetValue']; 
                if (options['maxValue']) chartObj.highest = options['maxValue'];
                if (options['increment']) chartObj.increment = options['increment'];
                
                isIE_old ? Nwagon_ie.column.drawColumnChart(chartObj) : this.column.drawColumnChart(chartObj);
                break;
        }
    },

    createChartArea: function(parentSVG, chartType, viewbox, width, height){

        var chartDiv = document.getElementById(parentSVG);
      /*  var textArea = document.createElement('ul');
        textArea.className = 'accessibility';
        chartDiv.appendChild(textArea);*/
        var attr = {'version':'1.1', 'width':500, 'height':400, 'viewBox':viewbox, 'class':'Nwagon_' + chartType, 'aria-hidden':'true'};
        var svg = Nwagon.createSvgElem('svg', attr);
        chartDiv.appendChild(svg);

        return svg;
    },

    createSvgElem: function(elem, attr){
        var svgElem = document.createElementNS(CONST_SVG_URL, elem);
        Nwagon.setAttributes(svgElem, attr);
        return svgElem;
    },

    setAttributes: function(svgObj, attributes){
        var keys_arr = Object.keys(attributes);
        var len = keys_arr.length;
        for(var i = 0; i<len; i++){
            svgObj.setAttribute(keys_arr[i], attributes[keys_arr[i]]);
        }
    },

    getMax: function(a){
        var maxValue = 0;
        if(a.length){
            for (var j = 0; j < a.length; j++)
            {
                var a_sub = a[j];
                if(a_sub.length){
                    for(var k = 0; k<a_sub.length; k++){
                        if (typeof(a_sub[k]) == 'number' && a_sub[k] > maxValue) maxValue = a_sub[k];    
                    }
                }
                else{
                    if (typeof(a[j]) == 'number' && a[j] > maxValue) maxValue = a[j];
                }
            }
        }
        return maxValue;
    },

    createTooltip: function(){
        var tooltip = Nwagon.createSvgElem('g', {'class':'tooltip'});
        var tooltipbg = Nwagon.createSvgElem('rect', {});
        tooltip.appendChild(tooltipbg);

        var tooltiptxt = Nwagon.createSvgElem('text', {});
        tooltip.appendChild(tooltiptxt);

        return tooltip;
    },

    showToolTip: function(tooltip, px, py, value, height, ytextOffset, yRectOffset){
        return function(){
            tooltip.style.cssText = "display: block";
            var text_el = tooltip.getElementsByTagName('text')[0];
            text_el.textContent = ' '+value;
            Nwagon.setAttributes(text_el, {'x':px, 'y':py-ytextOffset, 'text-anchor':'middle'});
            var width = text_el.getBBox().width;
            Nwagon.setAttributes(tooltip.getElementsByTagName('rect')[0], {'x':(px-width/2)-5, 'y':py-yRectOffset, 'width':width+10,'height':height});
        }
    },

    hideToolTip: function(tooltip){
        return function(){
            tooltip.style.cssText = "display: none";
        }
    },

    getAngles: function(arr, angles){
                    
        var total = 0;
        for(var i=0; i<arr.length; i++){
            total+=arr[i];
        }
        for(i=0; i<arr.length; i++){
            var degree = 360 * (arr[i]/total);
            angles['angles'].push(degree);
            angles['percent'].push(arr[i]/total);
            angles['values'].push(arr[i]);
        }
        return angles;
    },
    getOpacity: function(opa, r, max_r){
                var len  = opa.length;
                var interval = max_r/len;
                var value = Math.ceil(r/interval);
                return opa[value-1];
    },

    line:{
        points:[],
        guide_line: null, 

        drawLabels: function(x, y, labelText){
            var attributes = {'x':x, 'y':y, 'text-anchor':'end'};
            var text = Nwagon.createSvgElem('text', attributes);
            text.textContent = labelText;
            return text;
        },
        drawLineChart: function(obj){
            var type = obj.chartType;
            var isAreaChart = (type == 'area'), isJira = (type == 'jira');
            var width = obj.width, height = obj.height;
            var values = obj.dataset['values'];
            var LeftOffsetAbsolute =  obj.hasOwnProperty('leftOffsetValue') ? obj.leftOffsetValue : 50;
            var BottomOffsetAbsolute = obj.hasOwnProperty('bottomOffsetValue') ? obj.bottomOffsetValue : 80;
            var TopOffsetAbsolute =  obj.hasOwnProperty('topOffsetValue') ? obj.topOffsetValue : 0;
            var RightOffsetAbsolute = obj.hasOwnProperty('rightOffsetValue') ? obj.rightOffsetValue : 0;
            var names = obj.legend['names'];
            var isGuideNeeded = obj.hasOwnProperty('isGuideLineNeeded') ? obj.isGuideLineNeeded : false;
            
            RightOffsetAbsolute = obj.dataset['fields'] ? (150 + RightOffsetAbsolute) : RightOffsetAbsolute;

            var viewbox = (-LeftOffsetAbsolute) + ' ' + (BottomOffsetAbsolute-height) + ' ' + width + ' ' + height;
            var svg =  Nwagon.createChartArea(obj.chart_div, obj.chartType, viewbox, width, height);
            var max = obj.highest ? obj.highest : Nwagon.getMax(values);
            var min = obj.lowest ? obj.lowest : 0;
            this.drawBackground(svg, names.length, obj.dataset, obj.increment, max, min, width-LeftOffsetAbsolute-RightOffsetAbsolute, height-BottomOffsetAbsolute-TopOffsetAbsolute);
            this.drawLineForeground(obj.chart_div, svg, obj.legend, obj.dataset, obj.increment, max, min, width-LeftOffsetAbsolute-RightOffsetAbsolute, height-BottomOffsetAbsolute-TopOffsetAbsolute, isAreaChart, isJira, isGuideNeeded);

            // after guide line is drawn, add eventlistener to svg
            if(Nwagon.line.guide_line){
                var line = Nwagon.line.guide_line;
                var interval = Math.floor((width-LeftOffsetAbsolute-RightOffsetAbsolute)/names.length);
                var x_coord_max = line.x1.animVal.value;
                var text_add = '', index = 0;
                var fields = obj.dataset['fields'];
                var _h = fields ?  fields.length * 14 : 14;
                var tool = Nwagon.createTooltip();
                var text_el = tool.getElementsByTagName('text')[0];
                if(text_el){
                    for(var i = 0; i<fields.length; i++){
                        var ts = Nwagon.createSvgElem('tspan', {});      
                        text_el.appendChild(ts);
                    }
                }
                svg.appendChild(tool);

                var pt = svg.createSVGPoint();
                function cursorPoint(evt){
                    pt.x = evt.clientX; pt.y = evt.clientY;
                    return pt.matrixTransform(svg.getScreenCTM().inverse());
                }
                svg.addEventListener('mousemove',function(evt){
                    var loc = cursorPoint(evt);
                    var x = loc.x;
                    if(x < 0) x = 0; 
                    if(x > x_coord_max) x = x_coord_max; 
                    if(loc.y < 0){
                        line.setAttribute('x1', x);
                        line.setAttribute('x2', x);
                        index = Math.floor(x/interval);
                        tool.style.cssText = 'display: block';                        
                        if(fields &&  values[index]){
                            var ts_group = text_el.getElementsByTagName('tspan');
                            for(var i = 0; i<fields.length; i++){
                                ts_group[i].setAttribute('x', x);
                                if(i>0) ts_group[i].setAttribute('dy', 15);
                                ts_group[i].textContent = names[index] + '('+ fields[i] + '): ' + values[index][i];
                            }
                        }
                        Nwagon.setAttributes(text_el, {'x':x, 'y':loc.y-40, 'text-anchor':'start'});
                        var _width = text_el.getBBox().width;
                        Nwagon.setAttributes(tool.getElementsByTagName('rect')[0], {'x':x-5, 'y':loc.y-50, 'width':_width+10,'height':_h});
                    }
                },false);
                svg.addEventListener('mouseout',function(evt){
                    tool.style.cssText = 'display:none';
                },false);
            }
        },
        drawJiraForeground:function(parentDiv, _points, colors){
            var getSlopeAndAlpha = function(point_1, point_2){
                var values = {};
                var slope;
                if((point_2[1] == point_1[1])){
                    slope = 0;
                }
                else{
                    slope = (point_2[1]-point_1[1])/(point_2[0]-point_1[0]);
                }
                values['alpha'] = point_1[1] - (slope * point_1[0]);
                values['slope'] = slope;
                return values;
            };
            var drawPolygons = function(arr1, arr2){

                if(arr1 && arr2){
                    var color, first, second, px, py;
                    var points_to_draw = '';

                    var i = 0;
                    while ( i < arr1.length){
                        if(arr1[i][1] > arr2[i][1]){
                            first = arr1;
                            second = arr2;
                            color ="yellow";
                            break;
                        }
                        if(arr1[i][1] < arr2[i][1]){
                            first = arr2;
                            second = arr1;
                            color = "yellow";
                            break;
                        }
                        i++;
                    }
                    var j = 0;
                    while(j<first.length){
                        px = first[j][0];
                        py = first[j][1];
                        if(j === 0){
                            points_to_draw += 'M '+px + ' -' + py;
                        }
                        else{
                            points_to_draw += ' L '+px + ' -' + py;
                        }
                        j++;
                    }
                    var k = second.length-1;
                    while(k >=0){
                        px = second[k][0];
                        py = second[k][1];
                        points_to_draw += ' L '+px + ' -' + py;
                        k--;
                    }

                    points_to_draw +=' Z';
                    var unlayered = Nwagon.createSvgElem('path', {'d':points_to_draw, 'fill': color, 'opacity':'0.7'});
                    polygons.appendChild(unlayered);
                }
            };
            
            var foregrounds = document.getElementById(parentDiv).querySelectorAll('.Nwagon_jira g.foreground');
            var foreground = foregrounds[foregrounds.length-1];
            
            var polygons = Nwagon.createSvgElem('g', {'class':'polygon'});
            foreground.appendChild(polygons);

            var layered_points = [];
            if(_points.length == 2){
                var colorOne = colors[0];
                var colorTwo = colors[1];
                var one = _points[0];
                var two = _points[1];
                var temp_one = [], temp_two = [];

                if(one.length === two.length){
                    var length = one.length;


                    for(var i = 0; i < length; i++){
                        temp_one.push(one[i]);
                        temp_two.push(two[i]);

                        if((one[i][1] > two[i][1])) layered_points.push(two[i]);
                        else layered_points.push(one[i]);

                        if(i !== length-1){
                            if( !((one[i][1] > two[i][1]) && (one[i+1][1] > two[i+1][1])) &&
                                !((one[i][1] < two[i][1]) && (one[i+1][1] < two[i+1][1])) &&
                                !((one[i][1] == two[i][1]) || (one[i+1][1] == two[i+1][1])) )
                            {
                                var points_to_push = [];
                                var equation1 = getSlopeAndAlpha(one[i], one[i+1]);
                                var equation2 = getSlopeAndAlpha(two[i], two[i+1]);
                                var slope1 = equation1['slope'];
                                var slope2 = equation2['slope'];
                                var alpha1 = equation1['alpha'];
                                var alpha2 = equation2['alpha'];

                                var px = (alpha2 - alpha1)/(slope1-slope2);
                                var py = (px * slope1) + alpha1;
                                points_to_push.push(px);
                                points_to_push.push(py);
                                layered_points.push(points_to_push);
                                temp_one.push(points_to_push); // for making splicing easier push the cross _points twice
                                temp_one.push(points_to_push);
                                temp_two.push(points_to_push);
                                temp_two.push(points_to_push);
                            }
                        }
                    }
                }
            }
            // Draw polygon where two areas are stacked up
            if(layered_points.length){

                var points_to_draw = '';
                for (var i = 0; i<layered_points.length; i++){
                    var px = layered_points[i][0];
                    var py = layered_points[i][1];
                    if(i === 0){
                        points_to_draw += 'M '+px + ' -' + py;
                    }
                    else{
                        points_to_draw += ' L '+px + ' -' + py;
                    }
                }
                points_to_draw += ' L '+layered_points[layered_points.length-1][0] + ' -' + 0 + ' L 0 0 Z';
                var layered_line = Nwagon.createSvgElem('path', {'d':points_to_draw, 'class':'layered'});
                polygons.appendChild(layered_line);
            }
            // Draw polygons for non-layered portions
            if(temp_one.length === temp_two.length){
                var i = 0;
                while(i<temp_one.length){
                    if((temp_one[i][1] == temp_two[i][1] ) && (i !=0) || (i == temp_one.length-1)) {
                        var splice_one = temp_one.splice(i+1);
                        var splice_two = temp_two.splice(i+1);
                        drawPolygons(temp_one, temp_two);

                        temp_one = splice_one;
                        temp_two = splice_two;
                        i = 0;
                    }
                    i++;
                }
            }
        },
        draw_vertex_and_tooltip:function(parentSVG, data, guide_needed){
            var circles = Nwagon.createSvgElem('g', {'class':'circles'});
            parentSVG.appendChild(circles);
            if(!guide_needed){
                var tooltip = Nwagon.createTooltip();
                parentSVG.appendChild(tooltip);
            }
            for (var i = 0; i<data.length; i++){
                var vertex = Nwagon.createSvgElem('circle', data[i]['attributes']);
                circles.appendChild(vertex);
                if(!guide_needed){
                    vertex.onmouseover = Nwagon.showToolTip(tooltip, data[i]['tooltip_x'], data[i]['tooltip_y'], data[i]['text'], 14, 7, 18);
                    vertex.onmouseout = Nwagon.hideToolTip(tooltip);
                }
            }
        },
        drawLineForeground: function(parentDiv, parentSVG, legend, dataset, increment, max, min, width, height, isAreaChart, isJira, guide_line_needed){
            var numOfCols = legend['names'].length;
            //수정 legend 가로 폭, 그래프 가로폭
            var colWidth = (width/numOfCols).toFixed(3);
            var yLimit = (Math.ceil((max-min)/increment)+1) * increment;
            var px = '', cw = '', ch = '';
            var names = legend['names'];
            var data = dataset['values'];
            var colors = dataset['colorset'];
            var fields = dataset['fields'];
            var circle_and_tooltips = [];
            var jira_points = [];

            var foreground = Nwagon.createSvgElem('g', {'class':'foreground'});
            parentSVG.appendChild(foreground);

            var lines = Nwagon.createSvgElem('g', {'class':'lines'});
            foreground.appendChild(lines);

            var labels = Nwagon.createSvgElem('g', {'class':'labels'});
           
            foreground.appendChild(labels);

            // Draw foreground elements (lines, circles, labels...)
            //수정 cw!!
            cw = (3/4*colWidth);
            if(data[0]){
                for (var k = 0; k < data[0].length; k++){
                    var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];
                    if(ul){
                        var textEl = document.createElement('li');
                        textEl.innerHTML = fields[k];
                        var innerUL = document.createElement('ul');
                        textEl.appendChild(innerUL);
                        ul.appendChild(textEl);
                    }

                    var first_y = 0;
                    var points_to_draw = '';
                    var line_points = [];
                    var start_point = 0;
                    for (var i = 0; i<data.length; i++){
                        var circle_and_tooltip_data = {};
                        var point_pair = [];
                        px =  colWidth*i;
                        
                        var py = ((data[i][k] - min) / yLimit) * height;
                        if(isNaN(py)){
                            start_point++;
                        }
                        else{
                            if(i === start_point){
                                points_to_draw += 'M '+px + ' -' + py;
                                first_y = py;
                            }
                            else{
                                points_to_draw += ' L '+px + ' -' + py;
                            }
                            point_pair.push(px);
                            point_pair.push(py);
                            line_points.push(point_pair);

                            var attributes = {'cx':px, 'cy':'-'+py, 'r':2, 'stroke': colors[k], 'fill':colors[k]};
                            var tooltip_text = names[i] + '('+ fields[k] + '): ' + data[i][k].toString();

                            circle_and_tooltip_data['attributes'] = attributes;
                            circle_and_tooltip_data['text'] = tooltip_text;
                            circle_and_tooltip_data['tooltip_x'] =  px+cw/2;
                            circle_and_tooltip_data['tooltip_y'] =  -py;
                            circle_and_tooltips.push(circle_and_tooltip_data);

                            if(innerUL){
                                var innerLI = document.createElement('li');
                                innerLI.innerHTML =  'Label ' + names[i] + ',  Value '+ data[i][k].toString();
                                innerUL.appendChild(innerLI);
                            }
                        }
                        if(k===0){
                        	//수정 라벨 y축 찾았다!, x축 수정!
                        	if(i==0){
                        		var text = Nwagon.line.drawLabels(px+cw/3, 30, names[i], false, 0);                        		
                        	}
                        	if(i==1){
                        		var text = Nwagon.line.drawLabels(px+cw/3, 30, names[i], false, 0);
                        	}
                        	if(i==2){
                        		var text = Nwagon.line.drawLabels(px+cw/12, 30, names[i], false, 0);
                        	}
                        	if(i==3){
                        		var text = Nwagon.line.drawLabels(px+cw/2, 30, names[i], false, 0);                  		
                        	}
                            labels.appendChild(text);
                        }
                    }

                    var line = Nwagon.createSvgElem('path', {'d':points_to_draw, 'fill': 'none', 'stroke':colors[k]});

                    if (isAreaChart){
                        var polygon_to_draw = points_to_draw +' L '+px+ ' ' + 0 + ' L '+0 + ' ' + 0 + ' L '+0 + ' -' + first_y +' Z';
                        var polygon = Nwagon.createSvgElem('path', {'d':polygon_to_draw, 'fill':colors[k], 'opacity': '0.8'});
                        lines.appendChild(polygon);
                    }
                    lines.appendChild(line);
                    jira_points.push(line_points);
                }
            }
            if(isJira){
                Nwagon.line.drawJiraForeground(parentDiv, jira_points, colors);
            }

            if(guide_line_needed){
                Nwagon.line.guide_line = Nwagon.createSvgElem('line',  {'x1':numOfCols*colWidth, 'y1': 4, 'x2':numOfCols*colWidth, 'y2' : -height, 'class':'guide_line'});
                parentSVG.appendChild(Nwagon.line.guide_line);  
            }

            Nwagon.line.draw_vertex_and_tooltip(foreground, circle_and_tooltips, guide_line_needed);

        },

        drawBackground: function(parentSVG, numOfCols, dataset, increment, max, min, width, height){

            var colWidth = (width/numOfCols).toFixed(3);
            var attributes = {};
            var px = '', yRatio = 1;

            var background = Nwagon.createSvgElem('g', {'class':'background'});
            parentSVG.appendChild(background);

            var numOfRows = Math.ceil((max-min)/increment);
            var rowHeight = height/(numOfRows+1);

            //Vertical lines(Fist line)
            attributes = {'x1':'0', 'y1':'0', 'x2':'0', 'y2':-height + (rowHeight/2), 'class':'v'};
            var line = Nwagon.createSvgElem('line', attributes);
            background.appendChild(line); 

            //Vertical lines(x-axis)
            for (var i = 0; i < numOfCols; i++)
            {
                px = i * colWidth;
                attributes = {'x1':px, 'y1': 4, 'x2':px, 'y2':-1 , 'class':'v'};
                line = Nwagon.createSvgElem('line', attributes);
                background.appendChild(line);
            }

            //Horizontal lines  
            var count = 0;
            for (i = 0; i<=numOfRows; i++)
            {
                var class_name = (i === 0) ? 'h' : 'h_dash' ;
              
                attributes = {'x1':'-3', 'y1':'-'+ i*rowHeight, 'x2':(numOfCols*colWidth).toString(), 'y2':'-'+ i*rowHeight, 'class':class_name};

                line = Nwagon.createSvgElem('line', attributes);
                background.appendChild(line);

                attributes = {'x':'-15', 'y':-((count*rowHeight)-3), 'text-anchor':'end'};
                var text = Nwagon.createSvgElem('text', attributes);
                text.textContent = ((count*increment) + min).toString();

                background.appendChild(text);
                count++;
            }
            //Field Names
            if(dataset['fields'])
            {
                var fields = Nwagon.createSvgElem('g', {'class':'fields'});
                background.appendChild(fields);

                var numOfFields = dataset['fields'].length;
                for (i = 0; i<numOfFields; i++)
                {
                    px = width+20;
                    py = (30*i) - height + rowHeight;

                    attributes = {'x':px, 'y':py, 'width':20, 'height':15, 'fill':dataset['colorset'][i]};
                    var badge = Nwagon.createSvgElem('rect', attributes);
                    fields.appendChild(badge);

                    attributes = {'x':px+30, 'y':py+7, 'alignment-baseline':'central'};
                    var name = Nwagon.createSvgElem('text', attributes);
                    name.textContent = dataset['fields'][i];
                    fields.appendChild(name);
                }
            }
        }
    },

    column:{

        drawColumnChart: function(obj){

            var width = obj.width, height = obj.height;
            var values = obj.dataset['values'];
            var LeftOffsetAbsolute =  obj.hasOwnProperty('leftOffsetValue') ? obj.leftOffsetValue : 50;
            var BottomOffsetAbsolute = obj.hasOwnProperty('bottomOffsetValue') ? obj.bottomOffsetValue : 80;
            var TopOffsetAbsolute =  obj.hasOwnProperty('topOffsetValue') ? obj.topOffsetValue : 0;
            var RightOffsetAbsolute = obj.hasOwnProperty('rightOffsetValue') ? obj.rightOffsetValue : 0;
            
            RightOffsetAbsolute = obj.dataset['fields'] ? (150 + RightOffsetAbsolute) : RightOffsetAbsolute;

            var viewbox = (-LeftOffsetAbsolute) + ' ' + (BottomOffsetAbsolute -height) + ' ' + width + ' ' + height;
            var svg =  Nwagon.createChartArea(obj.chart_div, obj.chartType, viewbox, width, height);
            var max = obj.highest ? obj.highest : Nwagon.getMax(values);

            this.drawBackground(svg, obj.legend['names'].length, obj.dataset, obj.increment, max, width-LeftOffsetAbsolute-RightOffsetAbsolute, height-BottomOffsetAbsolute-TopOffsetAbsolute);
            this.drawColumnForeground(obj.chart_div, svg, obj.legend, obj.dataset, obj.increment, max, width-LeftOffsetAbsolute-RightOffsetAbsolute, height-BottomOffsetAbsolute-TopOffsetAbsolute, obj.chartType);

        },

        drawColumn: function(parentGroup, width, height){

            var column = Nwagon.createSvgElem('rect', {'x':'0', 'y':-height, 'width':width, 'height':height});
            parentGroup.appendChild(column);

            return column;
        },

        drawLabels: function(x, y, labelText){

            var attributes = {'x':x, 'y':y, 'text-anchor':'end', 'transform':'rotate(315,'+ x +','+ y + ')'};
            var text = Nwagon.createSvgElem('text', attributes);
            text.textContent = labelText;

            return text;
        },

        getColorSetforSingleColumnChart: function(max, values, colorset){
            var numOfColors = colorset.length;
            var interval = max/numOfColors;
            var colors = [];
            
            for(var index = 0; index < values.length; index++){
                var colorIndex = Math.floor(values[index]/interval);
                if (colorIndex == numOfColors) colorIndex--;
                colors.push(colorset[colorIndex]);
            }
            return colors;
        },

        drawColumnForeground: function(parentDiv, parentSVG, legend, dataset, increment, max, width, height, chartType){

            var names = legend['names'];
            var numOfCols = names.length;
            var colWidth = (width/numOfCols).toFixed(3);
            var yLimit = (Math.ceil(max/increment)+1) * increment;
            var px = '', cw = '', ch = '';
            var data = dataset['values'];
            var chart_title = dataset['title'];
            var fields = dataset['fields'];

            var foreground = Nwagon.createSvgElem('g', {'class':'foreground'});
            parentSVG.appendChild(foreground);

            var columns = Nwagon.createSvgElem('g', {'class':'columns'});
            foreground.appendChild(columns);

            var labels = Nwagon.createSvgElem('g', {'class':'labels'});
            foreground.appendChild(labels);

            var tooltip = Nwagon.createTooltip();
            foreground.appendChild(tooltip);

            var drawColGroups = function(columns, ch, px, color, tooltipText, isStackedColumn, yValue){
                var colgroup  =  Nwagon.createSvgElem('g', {});
                columns.appendChild(colgroup);

                var column = Nwagon.column.drawColumn(colgroup, cw, ch);

                Nwagon.setAttributes(column, {'x':px, 'style':'fill:'+color});
                if(isStackedColumn)
                {
                    var py =  yValue - column.getBBox().y;
                    if ( py > 0 ) Nwagon.setAttributes(column, {'y':-py});
                    ch = py;
                }

                column.onmouseover = Nwagon.showToolTip(tooltip, px+cw/2, -ch, tooltipText, 14, 7, 18);
                column.onmouseout = Nwagon.hideToolTip(tooltip);

                column = null;  //prevent memory leak (in IE) 
            };

            var create_data_list = function(obj){
                var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];
                if (ul){
                    for (var key in obj){
                        if(obj.hasOwnProperty(key)){
                            var li = document.createElement('li');
                            li.innerHTML = key;
                            var innerUL = document.createElement('ul');
                            li.appendChild(innerUL);
                            ul.appendChild(li);
                            var innerList = obj[key];
                            for (var k = 0; k< innerList.length; k++){
                                var innerLI = document.createElement('li');
                                innerLI.innerHTML = innerList[k];
                                innerUL.appendChild(innerLI);
                            }
                        }
                    }
                }
            };

            if(chartType == 'column')
            {
                var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];
                if(ul){
                    ul.innerHTML = chart_title;
                }
                cw = (3/20*colWidth);
                var colors = Nwagon.column.getColorSetforSingleColumnChart(max, data, dataset['colorset']);

                for(var index = 0; index < data.length; index++){
                    px = (colWidth*(index+0.2));// + cw;
                    ch = data[index]/yLimit*height;
                    drawColGroups(columns, ch, px, colors[index], data[index]);

                    var text = Nwagon.column.drawLabels(px + cw/2, 15, names[index], false, 0);
                    labels.appendChild(text);

                    var innerLI = document.createElement('li');
                    innerLI.innerHTML = 'Label ' + names[index] + ', Value  '+ data[index];
                    if(ul){
                        ul.appendChild(innerLI);
                    }
                }
            }
            else if(chartType == 'multi_column')
            {
                var colors = dataset['colorset'];
                cw = (3/5*colWidth)/colors.length;
                var chart_data = {};
                for ( var k = 0; k<fields.length; k++){
                    chart_data[fields[k]] = [];
                }

                for(var i = 0; i < data.length; i++){
                    var one_data = data[i];
                    px = (colWidth*(i+0.2));

                    for(var index = 0; index < one_data.length; index++){
                        var pxx = px+ (index*(cw));
                        ch = one_data[index]/yLimit*height;
                        drawColGroups(columns, ch, pxx, colors[index], one_data[index], false, 0);
                        chart_data[fields[index]].push('Label ' + names[i] + ', Value  '+ one_data[index]);
                    }

                    var text = Nwagon.column.drawLabels(px + cw/2, 15, names[i]);
                    labels.appendChild(text);
                }
                create_data_list(chart_data);
            }
            else if(chartType == 'stacked_column')
            {
                cw = (3/5*colWidth);
                var colors = dataset['colorset'];
                var chart_data = {};
                for ( var k = 0; k<fields.length; k++){
                    chart_data[fields[k]] = [];
                }
                for(var i = 0; i < data.length; i++){
                    var one_data = data[i];
                    var yValue = 0;

                    for(var index = 0; index < one_data.length; index++){
                        px = (colWidth*(i+0.2));// + cw;
                        ch = one_data[index]/yLimit*height;

                        drawColGroups(columns, ch, px, colors[index], one_data[index], true, yValue);
                        chart_data[fields[index]].push('Label ' + names[i] + ', Value  '+ one_data[index]);
                        yValue +=ch;
                    }


                    var text = Nwagon.column.drawLabels(px + cw/2, 15, names[i]);
                    labels.appendChild(text);
                }
                create_data_list(chart_data);
            }
        },

        drawBackground: function(parentSVG, numOfCols, dataset, increment, max, width, height){

            var colWidth =(width/numOfCols).toFixed(3);
            var attributes = {};
            var px = '', yRatio = 1;

            var background = Nwagon.createSvgElem('g', {'class':'background'});
            parentSVG.appendChild(background);

            var numOfRows = Math.ceil(max/increment);
            rowHeight = height/(numOfRows+1);

            //Vertical lines
            for (var i = 0; i<=numOfCols; i++)
            {
                px = (i * colWidth).toString();
                attributes = {'x1':px, 'y1':'0', 'x2':px, 'y2':rowHeight-height, 'class':'v'};
                var line = Nwagon.createSvgElem('line', attributes);
                background.appendChild(line);
            }
            //Horizontal lines (draw 1 more extra line to accomodate the max value)
            var count = 0;
            for (var i = 0; i<=numOfRows; i++)
            {
                attributes = {'x1':'0', 'y1':'-'+ i*rowHeight, 'x2':(numOfCols*colWidth).toString(), 'y2':'-'+ i*rowHeight, 'class':'h'};
                var line = Nwagon.createSvgElem('line', attributes);
                background.appendChild(line);

                attributes = {'x':'-15', 'y':-((count*rowHeight)-3), 'text-anchor':'end'};
                var text = Nwagon.createSvgElem('text', attributes);
                text.textContent = (count*increment).toString();

                background.appendChild(text);
                count++;
            }
            //Field Names
            if(dataset['fields'])
            {
                var fields = Nwagon.createSvgElem('g', {'class':'fields'});
                background.appendChild(fields);

                var numOfFields = dataset['fields'].length;
                for (var i = 0; i<numOfFields; i++)
                {
                    px = width+20;
                    py = (30*i) - height + rowHeight;

                    attributes = {'x':px, 'y':py, 'width':20, 'height':15, 'fill':dataset['colorset'][i]};
                    var badge = Nwagon.createSvgElem('rect', attributes);
                    fields.appendChild(badge);

                    attributes = {'x':px+25, 'y':py+7, 'alignment-baseline':'central'};
                    var name = Nwagon.createSvgElem('text', attributes);
                    name.textContent = dataset['fields'][i];
                    fields.appendChild(name);
                }
            }
        }
    },


};

var Nwagon_ie = {

    setStyles: function(obj, styles){
        for (var key in styles) {
            if (styles.hasOwnProperty(key)) {
                obj.style[key] = styles[key];
            }
        }
    },

    setAttributes: function(obj, attributes){
        for (var key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                obj.setAttribute(key, attributes[key]);
            }
        }
    },
    createChartArea: function(id, width, height){

		var chartDiv = document.getElementById(id);
		chartDiv.style.cssText = 'width: '+ width+'px; height:'+ height + 'px';
		/*var textArea = document.createElement('ul');
		textArea.className = 'accessibility';
		chartDiv.appendChild(textArea);*/

		var vml = document.createElement("v:group");
		vml.setAttribute('class', id);
		vml.setAttribute("coordsize", width + " " + height);
		vml.setAttribute('aria-hidden', 'true');
		vml.style.cssText = 'width: '+ width+'px; height:'+ height + 'px;position:absolute;';

		var rect = document.createElement('v:rect');
		var style_attr = {'width': width + 'px', 'height': height + 'px'};
		Nwagon_ie.setStyles(rect, style_attr);
		rect.setAttribute('stroked','true');
		vml.appendChild(rect);
		chartDiv.appendChild(vml);
		return vml;
    },  

    createTooltip: function(parentCanvas){
        var tip = document.createElement('div');
        var textNode = document.createTextNode('');
        tip.appendChild(textNode);
        parentCanvas.appendChild(tip);
        return tip;
    },

    showToolTip: function(tooltip, px,  py, value){
        return function(){
            tooltip.style.cssText = 'display: block; padding: 0 5px 0 5px; background-color:#f9f9f9; border: 1px solid #666; position:absolute; z-index:100';
            tooltip.lastChild.nodeValue = value;
            tooltip.style.left = px + 'px'; 
            tooltip.style.top = (py -15) + 'px'; 
            tooltip.style.fontSize = '12px'; 
        }
    },

    hideToolTip: function(tooltip){
        return function(){
            tooltip.style.cssText = "display: none";
        }
    },
    drawWedges: function(cx, cy, r, fillcolor, start_a, end_a, s_attr){
        var wedge = document.createElement("v:shape"); 
        var sa = Math.round(start_a * 65535); 
        var a = -Math.round(end_a * 65536);  
        var path = "M " + cx + " " + cy + " AE " + cx + " " + cy + " " + r + " " + r + " " + sa + " " + a + " X E"; 

        attributes = {'path': path, 'fillcolor': fillcolor, 'strokecolor': '#FFFFFF', 'strokeweight':'0px'};    
        Nwagon_ie.setAttributes(wedge, attributes);
        Nwagon_ie.setStyles(wedge, s_attr);
        return wedge;
    },
    drawVertex: function(x, y, fill){
        var circle = document.createElement('v:oval');
        circle.setAttribute('fillcolor', fill); 
        circle.setAttribute('strokecolor', fill);
        circle.setAttribute('strokeweight', '1px');
        circle.style.cssText = 'z-index:99; width:6px; height:6px';
        circle.style.top = (y-3) + 'px';
        circle.style.left = (x-3) + 'px';

        return circle;
    },
    drawFields_for_circular_type_chart: function(fields, colors, canvas, h){
        var style_attr = {};
        if(fields.length){
            var lx = 5, ly=10;
            var field_div = document.createElement('div');
            
            style_attr = {'width':Math.round(h/2) + 'px', 'height': Math.round(h*(2/3)) + 'px', 'left': h + 'px', 'top': '70px', 'position':'absolute'};
            Nwagon_ie.setStyles(field_div, style_attr);
            field_div.className = 'fields_area';
            canvas.appendChild(field_div);
            var attributes = {};

            for(var i = 0; i<fields.length; i++){
                var badge = document.createElement("v:rect"); 
                style_attr = {'width':'20px', 'height': '15px', 'left':'5px', 'top': (ly+i*30) + 'px'};
                Nwagon_ie.setStyles(badge, style_attr);    
                attributes = {'fillcolor':colors[i], 'strokecolor': '#FFFFFF', 'strokeweight':'1px'};    
                Nwagon_ie.setAttributes(badge, attributes);
                field_div.appendChild(badge); 

                var name = document.createElement('div'); 
                name.appendChild(document.createTextNode(fields[i])); 
                style_attr = {'position':'absolute', 'left': (lx + 30) + 'px', 'top': (ly + 30*i) + 'px', 'fontSize': '12px'};
                Nwagon_ie.setStyles(name, style_attr);    
                field_div.appendChild(name); 
            }
        }
    },
    column:{

        drawColumnChart: function(obj){
            
            var width = obj.width, height = obj.height;
            var canvas = Nwagon_ie.createChartArea(obj.chart_div, width, height); 
            
            var values = obj.dataset['values'];
            var left =  obj.hasOwnProperty('leftOffsetValue') ? obj.leftOffsetValue : 50;
            var bottom = obj.hasOwnProperty('bottomOffsetValue') ? obj.bottomOffsetValue : 80;
            
            var max = obj.highest ? obj.highest : Nwagon.getMax(values);
            var fields = obj.dataset['fields'];
            var fieldsExist = ((fields && (obj.chartType !='column')) || (obj.chartType =='column' && obj.dataset['colorset'].length == 1)) ;
            this.drawBackground(canvas, obj.legend['names'], obj.dataset, obj.increment, max, width, height, left, bottom, fieldsExist);
            this.drawColumnForeground(obj.chart_div, canvas, obj.legend, obj.dataset, obj.increment, max, width, height, left, bottom, obj.chartType, fieldsExist);

        },

        drawColumnForeground: function(parentDiv, canvas, legend, dataset, increment, max, width, height, left, bottom, chart_type, isFields){
            var names = legend['names'];
            var numOfCols = names.length;
            var data = dataset['values'];
            var chart_title = dataset['title'];
            var fields = dataset['fields'];
            var right = isFields ?  150 : 0;
            var colWidth = Math.floor((width-left-right)/numOfCols);
            var x1 = 0, x2 = 0, y1 = 0, y2 = 0, cw = 0;
            var yLimit = (Math.ceil(max/increment)+1) * increment;  //let's check if it's used in here
            var numOfRows = max/increment;
            var rowHeight = Math.round((height-bottom)/(numOfRows+1));
            var yRatio = rowHeight/increment;
            var colors = [];
            var attributes = {}, style_attr={};
            var tooltip  = Nwagon_ie.createTooltip(canvas);
            var text_to_add = ''; 
            
            var drawColumn = function(attr, w, h, x, y, text, tip){
                var column = document.createElement('v:shape');
                Nwagon_ie.setAttributes(column, attr);
                style_attr = {'position':'absolute', 'width': w, 'height': h, 'filter':'alpha(opacity=80)'};
                Nwagon_ie.setStyles(column, style_attr);
                column.onmouseover = Nwagon_ie.showToolTip(tip, x, y, text);
                column.onmouseout = Nwagon_ie.hideToolTip(tip);
                return column;
            };
            var create_data_list = function(obj){
                var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];
                if (ul){
                    for (var key in obj){
                        if(obj.hasOwnProperty(key)){
                            var li = document.createElement('li');
                            li.innerHTML = key;
                            var innerUL = document.createElement('ul');
                            li.appendChild(innerUL);
                            ul.appendChild(li);
                            var innerList = obj[key];
                            for (var k = 0; k< innerList.length; k++){
                                var innerLI = document.createElement('li');
                                innerLI.innerHTML = innerList[k];
                                // console.log('innerList['+k+'] : '+  innerList[k]);
                                innerUL.appendChild(innerLI);
                            }
                        }
                    }
                }
            };
            if(chart_type == 'column'){
                var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];
                if(ul){
                    ul.innerHTML = chart_title;
                }
                cw = colWidth * 1/5;
                colors = Nwagon.column.getColorSetforSingleColumnChart(max, data, dataset['colorset']);
                for(var i = 0; i<data.length; i++){
                    x1 = left + Math.round(colWidth * (i+0.2)); 
                    x2 = Math.round(left + (colWidth * (i+1)) - cw);
                    y1 = height - bottom;
                    y2 = height - bottom - Math.round(yRatio * data[i]);

                    var path = 'M ' + x1 + ' ' + y1 + ' L ' + x1 + ' ' + y2 + ' L ' + x2 + ' ' + y2 + ' L ' + x2 + ' ' + y1 +' X E';
                    attributes = {'path': path, 'strokecolor': colors[i], 'strokeweight':'1px', 'fillcolor': colors[i]};    
                    text_to_add =  data[i].toString();
                    var c = drawColumn(attributes, canvas.style.width, canvas.style.height, x1+5, y2+rowHeight, text_to_add, tooltip);
                    canvas.appendChild(c);

                    var innerLI = document.createElement('li');
                    innerLI.innerHTML = 'Label ' + names[i] + ', Value  '+ data[i];
                    if(ul){
                        ul.appendChild(innerLI);
                    }
                }                   
            }
            if(chart_type == 'multi_column'){
                colors = dataset['colorset'];
                cw = (3/5*colWidth)/colors.length; 
                var chart_data = {};
                for ( var k = 0; k<fields.length; k++){
                    chart_data[fields[k]] = [];
                }
                
                for(var i = 0; i < data.length; i++){
                    var one_data = data[i];
                    var px = left + Math.round(colWidth * (i+0.2)); 

                    for(var k = 0; k < one_data.length; k++){
                        x1 = px + Math.round((k*(cw)));
                        x2 = px + Math.round((k+1)*cw); 
                        y1 = height - bottom;
                        y2 = height - bottom - Math.round(yRatio * one_data[k]);

                        var path = 'M ' + x1 + ' ' + y1 + ' L ' + x1 + ' ' + y2 + ' L ' + x2 + ' ' + y2 + ' L ' + x2 + ' ' + y1 +' X E';
                        attributes = {'path': path, 'strokecolor': colors[k], 'strokeweight':'1px', 'fillcolor': colors[k]};    
                        text_to_add =  one_data[k].toString();
                        var c = drawColumn(attributes, canvas.style.width, canvas.style.height, x1+5, y2+rowHeight, text_to_add, tooltip);
                        canvas.appendChild(c);
                        chart_data[fields[k]].push('Label ' + names[i] + ', Value  '+ one_data[k]);
                    }
                }
                create_data_list(chart_data);
            }
            if(chart_type == 'stacked_column'){
                colors = dataset['colorset'];
                cw = colWidth * 1/5;
                var chart_data = {};
                for ( var k = 0; k<fields.length; k++){
                    chart_data[fields[k]] = [];
                }
                for(var i = 0; i < data.length; i++){
                    var one_data = data[i];
                    var yValue = height-bottom;
                    var px = left + Math.round(colWidth * (i+0.2)); 

                    for(var k = 0; k < one_data.length; k++){
                        
                        x1 = left + Math.round(colWidth * (i+0.2)); 
                        x2 = Math.round(left + (colWidth * (i+1)) - cw);
                        y1 = yValue;
                        y2 = yValue - Math.round(yRatio * one_data[k]);

                        var path = 'M ' + x1 + ' ' + y1 + ' L ' + x1 + ' ' + y2 + ' L ' + x2 + ' ' + y2 + ' L ' + x2 + ' ' + y1 +' X E';
                        attributes = {'path': path, 'strokecolor': colors[k], 'strokeweight':'1px', 'fillcolor': colors[k]};    
                        text_to_add =  one_data[k].toString();
                        var c = drawColumn(attributes, canvas.style.width, canvas.style.height, x1+5, y2+rowHeight, text_to_add, tooltip);
                        canvas.appendChild(c);

                        chart_data[fields[k]].push('Label ' + names[i] + ', Value  '+ one_data[k]);
                        yValue -=Math.round(yRatio * one_data[k]);
                    }
                }
                create_data_list(chart_data);
            }
            if((fields && (chart_type !='column')) || (chart_type =='column' && dataset['colorset'].length == 1)) {
                for(var i = 0; i<fields.length; i++){
                    var lx = width - right +30, ly= 30;
                    var badge = document.createElement("v:rect"); 
                    style_attr = {'position':'absolute', 'width': '20px', 'height':'15px', 'top':(ly+i*30) + 'px', 'left':lx + 'px'};
                    Nwagon_ie.setStyles(badge, style_attr);
                    attributes = {'fillcolor': colors[i], 'strokecolor':'#FFFFFF', 'strokeweight':'1px'};    
                    Nwagon_ie.setAttributes(badge, attributes);
                    canvas.appendChild(badge); 

                    var name = document.createElement('div'); 
                    name.appendChild(document.createTextNode(fields[i])); 
                    style_attr = {'position':'absolute', 'top':(ly + 30*i) + 'px', 'left': (lx + 30) + 'px', 'fontSize':'12px'};
                    Nwagon_ie.setStyles(name, style_attr);
                    canvas.appendChild(name); 
                }
            }
        },

        drawBackground: function(canvas, names, dataset, increment, max, width, height, left, bottom, isFields){
            var numOfCols = names.length;
            var numOfRows = Math.ceil(max/increment);
            var right = 0, line_width=0, colWidth = 0; 
            if(isFields){
                var right = 150;
            }
            if(numOfCols){
                var colWidth = Math.floor((width-left-right)/numOfCols);
            }
            var rowHeight = Math.round((height-bottom)/(numOfRows+1));
            var values = dataset['values'];
            var attributes = {}, style_attr = {};

            for (var i = 0; i<=values.length; i++){
                var v_line = document.createElement('v:shape');
                var v_height_start = height - bottom;
                var v_height_end = height - bottom -(rowHeight*(numOfRows+1));
                var px = left + (colWidth*i);
                var v_path = 'M '+ px + ' '+ v_height_start + 'L ' + px +' ' + v_height_end;
                
                attributes = {'path': v_path, 'strokecolor': '#CCC', 'strokeweight':'1px'};    
                Nwagon_ie.setAttributes(v_line, attributes);
                style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height};
                Nwagon_ie.setStyles(v_line, style_attr);
                canvas.appendChild(v_line);

                // draw text as well  (x coord) 
                if(i<values.length){
                    var x_label = document.createElement('div'); 
                    x_label.appendChild(document.createTextNode(names[i])); 
                    x_label.setAttribute('class', 'label_ie')
                    style_attr = {'position':'absolute', 'left': (px + (colWidth/4))+ 'px', 'top': (height - bottom + 15)+ 'px', 'fontSize':'13px'};
                    Nwagon_ie.setStyles(x_label, style_attr);
                    canvas.appendChild(x_label); 
                }
                if(i == values.length){
                    line_width = px;
                }
            }

            //Horizontal lines & labels
            var count = 0;
            for (i = 0; i<=numOfRows; i++){
                var line = document.createElement('v:shape'); 
                var line_height = height - bottom - (rowHeight * i);
                var path = 'M '+ left + ' '+ line_height + 'L ' + line_width +' ' + line_height;
                
                attributes = {'path': path, 'strokecolor': '#CCC', 'strokeweight':'1px'};    
                Nwagon_ie.setAttributes(line, attributes);
                line.style.position = "absolute"; 
                line.style.width = canvas.style.width; 
                line.style.height = canvas.style.height;  
                canvas.appendChild(line);

                // label 
                var label = document.createElement('div'); 
                var label_text = (increment*i).toString();
                label.setAttribute('class', 'label_ie')
                label.appendChild(document.createTextNode(label_text));
                style_attr = {'position':'absolute', 'right':(width - left +15) + 'px', 'top':line_height - 6 + 'px', 'fontSize':'13px' };
                Nwagon_ie.setStyles(label, style_attr);
                canvas.appendChild(label); 
            }
        }
    },
    line: {
        guide_line: null,
        guide_line_max_left: 0,
        drawLineChart: function(obj){
            var type = obj.chartType;
            var isAreaChart = false, isJira = false;
            var width = obj.width, height = obj.height;
            var canvas = Nwagon_ie.createChartArea(obj.chart_div, width, height); 
            var left = obj.leftOffsetValue ? obj.leftOffsetValue : 50;
            var bottom = obj.bottomOffsetValue ? obj.bottomOffsetValue : 80;
            var names = obj.legend['names'];
            var fields = obj.dataset['fields'];
            var values = obj.dataset['values'];
            var max = obj.highest ? obj.highest : Nwagon.getMax(values);   
            var min = obj.lowest ? obj.lowest : 0;   
            isAreaChart = (type == 'area');
            isJira = (type == 'jira');
            var isGuideNeeded = obj.hasOwnProperty('isGuideLineNeeded') ? obj.isGuideLineNeeded : false;

            this.drawBackground(canvas, names, obj.dataset, obj.increment, max, min, width, height, left, bottom);    
            this.drawLineForeground(obj.chart_div, canvas, obj.legend, obj.dataset, obj.increment, max, min, width, height, left, bottom, isAreaChart , isJira, isGuideNeeded);
            if(isGuideNeeded && Nwagon_ie.line.guide_line){
                var right = fields ?  150 : 0;
                var interval = Math.round(width-left-right)/names.length;
                var tool = document.createElement('div');
                canvas.appendChild(tool);

                var g = Nwagon_ie.line.guide_line;
                var d = document.getElementById(obj.chart_div);
                var x_offset = canvas.offsetLeft + canvas.clientLeft;
                var y_offset = canvas.offsetTop + canvas.clientTop;
                function moveGuideLine(e) {
                    var xPosition = e.clientX - x_offset;
                    var yPosition = e.clientY - y_offset;
                    if((xPosition-left) > 0 ){
                        var index = (Math.floor((xPosition-left)/interval));
                        if(xPosition > Nwagon_ie.line.guide_line_max_left){
                            xPosition = Nwagon_ie.line.guide_line_max_left -left;
                        }
                        if(xPosition >= left && (index < names.length)){
                            g.style.left = xPosition+'px';
                            tool.innerHTML = '';
                            tool.style.cssText = 'display: block; float:left; padding: 0 5px 0 5px; background-color:#f9f9f9; border: 1px solid #666; position:absolute; z-index:100';
                            tool.style.fontSize = '12px'; 
                            tool.style.left = xPosition + 'px'; 
                            tool.style.top = ( yPosition-(fields.length*14) +  document.body.scrollTop )+ 'px';
                            for(var i = 0; i<fields.length; i++){
                                var s = names[index] + '('+ fields[i] + '): ' + values[index][i];
                                var textDiv = document.createElement('div');
                                if(textDiv){
                                    textDiv.innerHTML = s;
                                    tool.appendChild(textDiv);
                                }
                            }
                        }
                    }
                }
                function hideTool(e){
                    tool.style.cssText = 'display:none';
                }
                d.attachEvent('onmousemove', moveGuideLine);
                d.attachEvent('onmouseout', hideTool);
            }
        },

        drawJiraForeground:function(points, colors, canvas, left_off, bottom_off){
            var getSlopeAndAlpha = function(point_1, point_2){
                var values = {};
                var slope;
                if((point_2[1] == point_1[1])){
                    slope = 0;
                }
                else{
                    slope = (point_2[1]-point_1[1])/(point_2[0]-point_1[0]);
                }
                values['alpha'] = point_1[1] - (slope * point_1[0]);
                values['slope'] = slope;
                return values;
            };
            var drawPolygons = function(arr1, arr2){

                if(arr1 && arr2){
                    var color, first, second, px, py;
                    var points_to_draw = '';

                    var i = 0;
                    while ( i < arr1.length){
                        if(arr1[i][1]< arr2[i][1]){
                            first = arr1;
                            second = arr2;
                            color = colors[0];
                            break;
                        }
                        if(arr1[i][1]> arr2[i][1]){
                            first = arr2;
                            second = arr1;
                            color = colors[1];
                            break;
                        }
                        i++;
                    }
                    var j = 0;
                    while(j<first.length){
                        px = Math.round(first[j][0]);
                        var y_coord = bottom_off - first[j][1];
                        py = Math.round(bottom_off - y_coord);
                        // py = first[j][1];
                        if(j === 0){
                            points_to_draw += 'M '+px + ' ' + py;
                        }
                        else{
                            points_to_draw += ' L '+px + ' ' + py;
                        }
                        j++;
                    }
                    var k = second.length-1;
                    while(k >= 0){
                        px = Math.round(second[k][0]);
                        var y_coord = bottom_off - second[k][1];
                        py = Math.round(bottom_off - y_coord);
                        points_to_draw += ' L '+px + ' ' + py;
                        k--;
                    }

                    points_to_draw +=' X E';
                    var unlayered = document.createElement('v:shape');
                    var attributes = {'path': points_to_draw, 'strokecolor': '#CCC', 'fillcolor':color};    
                    Nwagon_ie.setAttributes(unlayered, attributes);    
                    var style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height, 'filter':'alpha(opacity=80)'};
                    Nwagon_ie.setStyles(unlayered, style_attr);
                    canvas.appendChild(unlayered);
                }
            };
            
            var layered_points = [];

            if(points.length == 2){
                var colorOne = colors[0];
                var colorTwo = colors[1];
                var one = points[0];
                var two = points[1];
                var temp_one = [], temp_two = [];

                if(one.length === two.length){
                    var length = one.length;


                    for(var i = 0; i < length; i++){
                        temp_one.push(one[i]);
                        temp_two.push(two[i]);

                        if((one[i][1] < two[i][1])) layered_points.push(two[i]);
                        else layered_points.push(one[i]);

                        if(i !== length-1){
                            if( !((one[i][1] > two[i][1]) && (one[i+1][1] > two[i+1][1])) &&
                                !((one[i][1] < two[i][1]) && (one[i+1][1] < two[i+1][1])) &&
                                !((one[i][1] == two[i][1]) || (one[i+1][1] == two[i+1][1])) )
                            {
                                var points_to_push = [];
                                var equation1 = getSlopeAndAlpha(one[i], one[i+1]);
                                var equation2 = getSlopeAndAlpha(two[i], two[i+1]);
                                var slope1 = equation1['slope'];
                                var slope2 = equation2['slope'];
                                var alpha1 = equation1['alpha'];
                                var alpha2 = equation2['alpha'];

                                var px = (alpha2 - alpha1)/(slope1-slope2)
                                var py = (px * slope1) + alpha1;
                                points_to_push.push(px);
                                points_to_push.push(py);
                                layered_points.push(points_to_push);
                                temp_one.push(points_to_push); // for making splicing easier push the cross points twice
                                temp_one.push(points_to_push);
                                temp_two.push(points_to_push);
                                temp_two.push(points_to_push);
                            }
                        }
                    }
                }
            }
            // Draw polygon where two areas are stacked up
            if(layered_points.length){
                var points_to_draw = '';
                for (var i = 0; i<layered_points.length; i++){
                    var px = Math.round(layered_points[i][0]);
                    var y_coord = bottom_off - layered_points[i][1];
                    var py = Math.round(bottom_off - y_coord);
                    if(i === 0){
                        points_to_draw += 'M '+px + ' ' + py;
                    }
                    else{
                        points_to_draw += ' L '+px + ' ' + py;
                    }
                }
                points_to_draw += ' L '+layered_points[layered_points.length-1][0] + ' ' + bottom_off + ' L '+ left_off + ' '+  bottom_off + ' X E';
                var layered_line = document.createElement('v:shape');
                var attributes = {'path': points_to_draw, 'strokecolor': '#CCC', 'fillcolor':'#FFF'};    
                Nwagon_ie.setAttributes(layered_line, attributes);
                var style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height, 'filter':'alpha(opacity=80)'};
                Nwagon_ie.setStyles(layered_line, style_attr);
                canvas.appendChild(layered_line);
            }
            // Draw polygons for non-layered portions
            if(temp_one.length === temp_two.length){
                var i = 0;
                while(i<temp_one.length){

                    if((temp_one[i][1] == temp_two[i][1] ) && (i !=0) || (i == temp_one.length-1)) {
                        var splice_one = temp_one.splice(i+1, temp_one.length-1);
                        var splice_two = temp_two.splice(i+1, temp_two.length-1);

                        drawPolygons(temp_one, temp_two);

                        temp_one = splice_one;
                        temp_two = splice_two;
                        i = 0;
                    }
                    i++;
                }
            }
        },

        drawLineForeground: function(parentDiv, canvas, legend, dataset, increment, max, min, width, height, left, bottom, isArea, isJira, guide_line_needed){
            var names = legend['names'];
            var colors = dataset['colorset'];
            var fields = dataset['fields'];
            var values = dataset['values'];
            var numOfCols = values.length;
            var right = fields ? 150 : 0; 
            var colWidth = Math.round((width-left-right)/numOfCols);
            var px = left, py = height-bottom;
            var numOfRows = ((max-min)/increment);
            var rowHeight = Math.round((height-bottom)/(numOfRows+1));
            var yRatio = rowHeight/increment;
            var paths = [], polygon_paths = [];
            var text_to_add = '';
            var value = values[0]; 
            var tooltip = Nwagon_ie.createTooltip(canvas);
            var style_attr = {};
            var jira_points = [];

            for(var k = 0; k<value.length; k++){
                var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];
                if(ul){
                    var textEl = document.createElement('li');
                    textEl.innerHTML = fields[k];
                    var innerUL = document.createElement('ul');
                    textEl.appendChild(innerUL);
                    ul.appendChild(textEl);
                }
                var first_y = 0; 
                var start_point = 0;
                var path = '';
                var polygon_path = '';
                var line_points = [];
                var x = 0, y = 0;
                for(var i = 0; i<values.length; i++){
                    var point_pair = [];
                    x = px + (colWidth * i);
                    y = py - Math.round((values[i][k]-0.5 - min)*yRatio);
                    if(isNaN(y)){
                        start_point++;
                    }
                    else {
                        if(i == start_point){
                            path += 'M '+x + ' ' + y;
                            first_y = y; 
                        }
                        else{
                            path += 'L '+x + ' ' + y;   
                        }
                        point_pair.push(x);
                        point_pair.push(y);
                        line_points.push(point_pair);

                        var vertex = Nwagon_ie.drawVertex(x, y, colors[k]); 
                        text_to_add = fields ? names[i] + '('+ fields[k] + '): ' + values[i][k].toString() : names[i] + ': ' + values[i][k].toString();
                        if(!guide_line_needed){
                            vertex.onmouseover = Nwagon_ie.showToolTip(tooltip, x, y, text_to_add);
                            vertex.onmouseout = Nwagon_ie.hideToolTip(tooltip);
                        }
                        canvas.appendChild(vertex);
                        if(innerUL){
                            var innerLI = document.createElement('li');
                            innerLI.innerHTML =  'Label ' + names[i] + ',  Value '+ values[i][k].toString();
                            innerUL.appendChild(innerLI);
                        }
                    }
                }
                paths.push(path);
                if(isArea){
                    polygon_path  = path + 'L ' + x + ' '+ py +' L '+ px + ' ' + py +' L '+ px + ' ' + y +' X E'; 
                    polygon_paths.push(polygon_path);
                }
                jira_points.push(line_points);
            }

            for(var k = 0; k<value.length; k++){

                var line = document.createElement('v:shape');
                var attributes = {'path': paths[k], 'strokecolor': colors[k], 'strokeweight':'2px'};    
                Nwagon_ie.setAttributes(line, attributes);
                style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height};
                Nwagon_ie.setStyles(line, style_attr);
                var fill = document.createElement('v:fill');
                fill.setAttribute('on', 'false');
                line.appendChild(fill);  
                canvas.appendChild(line);
                
                if(isArea){
                    var polygon = document.createElement('v:shape');
                    attributes = {'path': polygon_paths[k], 'strokecolor': colors[k], 'fillcolor':colors[k]};    
                    Nwagon_ie.setAttributes(polygon, attributes);
                    style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height, 'filter':'alpha(opacity=80)'};
                    Nwagon_ie.setStyles(polygon, style_attr);
                    canvas.appendChild(polygon);
                }
                
                if(fields){
                    var lx = width - right +30, ly= 30;
                    var badge = document.createElement("v:rect"); 
                    style_attr = {'position':'absolute', 'width': '20px', 'height': '15px', 'left':lx + 'px', 'top':(ly+k*30) + 'px'};
                    Nwagon_ie.setStyles(badge, style_attr);

                    attributes = {'fillcolor': colors[k], 'strokecolor':'#FFFFFF', 'strokeweight':'1px'};    
                    Nwagon_ie.setAttributes(badge, attributes);
                    canvas.appendChild(badge); 
 
                    var name = document.createElement('div'); 
                    name.appendChild(document.createTextNode(fields[k])); 
                    style_attr = {'position':'absolute', 'left':(lx + 30) + 'px', 'top':(ly + 30*k) + 'px', 'fontSize':'12px'};
                    Nwagon_ie.setStyles(name, style_attr);
                    
                    canvas.appendChild(name); 
                }
            }
            if(isJira){
                Nwagon_ie.line.drawJiraForeground(jira_points, colors, canvas, left, height-bottom);
            }
            if(guide_line_needed){
                Nwagon_ie.line.guide_line = document.createElement('div');
                var x_max = left + (colWidth*numOfCols);
                Nwagon_ie.line.guide_line_max_left = x_max;
                Nwagon_ie.setStyles(Nwagon_ie.line.guide_line,  {'position':'absolute', 'width': '2px', 'height': (height-bottom+5)+'px', 'left':x_max + 'px', 'background':'#4010ad'});
                canvas.appendChild(Nwagon_ie.line.guide_line);
            } 
        },

        drawBackground: function(canvas, names, dataset, increment, max, min, width, height, left, bottom){
            var numOfCols = dataset['values'].length;
            var numOfRows = Math.ceil((max-min)/increment);
            var right = 0; 
            var fields = dataset['fields'];
            if(fields){
                right = 150;
            }
            if(numOfCols){
                var colWidth = Math.round((width-left-right)/numOfCols);
            }
            var rowHeight = Math.round((height-bottom)/(numOfRows+1));
            var values = dataset['values'];
            var yRatio = (height-bottom)/100;
            var attributes = {}, style_attr = {};
            
            for (var i = 0; i<values.length; i++){
                var v_line = document.createElement('v:shape');
                var v_height_start = height - bottom + 5;
                var v_height_end = (i == 0) ? height - bottom -(rowHeight*(numOfRows+1)) : height - bottom -5;
                var px = left + (colWidth*i);
                var v_path = 'M '+ px + ' '+ v_height_start + 'L ' + px +' ' + v_height_end;
                
                attributes = {'path': v_path, 'strokecolor': '#CCC', 'strokeweight':'1px'};    
                Nwagon_ie.setAttributes(v_line, attributes);
                style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height};
                Nwagon_ie.setStyles(v_line, style_attr);
                canvas.appendChild(v_line);

                // draw text as well  (x coord) 
                var x_label = document.createElement('div'); 
                x_label.appendChild(document.createTextNode(names[i])); 
                style_attr = {'position':'absolute', 'left': px+ 'px', 'top': (height - bottom + 15)+ 'px', 'fontSize': '13px'};
                Nwagon_ie.setStyles(x_label, style_attr);
                canvas.appendChild(x_label); 
            }

            //Horizontal lines & labels
            var count = 0;
            var line_width = width-right+3;
            for (i = 0; i<=numOfRows; i++){
                var line = document.createElement('v:shape'); 
                var line_height = height - bottom - (rowHeight * i);
                var path = 'M '+ (left-3) + ' '+ line_height + 'L ' + line_width +' ' + line_height;
                
                attributes = {'path': path, 'strokecolor': '#CCC', 'strokeweight':'1px'};    
                Nwagon_ie.setAttributes(line, attributes);
                style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height};
                Nwagon_ie.setStyles(line, style_attr);
                var stroke = document.createElement('v:stroke'); 
                stroke.setAttribute('dashstyle', 'dash');
                line.appendChild(stroke);
                canvas.appendChild(line);

                // label 
                var label = document.createElement('div'); 
                var label_text = ((increment*i) + min).toString();
                label.appendChild(document.createTextNode(label_text));
                
                style_attr = {'position':'absolute', 'right': (width - left +15) + 'px', 'top': line_height - 3 + 'px', 'fontSize': '13px'};
                Nwagon_ie.setStyles(label, style_attr);
                canvas.appendChild(label); 
            }
        }
    },


};

