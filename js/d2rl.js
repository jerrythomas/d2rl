/*!
 * Versatile Listview - Copyright (c) 2016 Jerry Thomas - http://jerrythomas.name/
 * Dual-licensed under the BSD or MIT licenses
 */
/*

modes:
   Editable : Editing the input text, with some format validations. or a callback for validations
   Selection: Select one or more items. Action can be taken on multiple selected items
   Progress: Shows the progress of individual tasks and groups the progress at higher levels
   Accordion: Allows collapse/expand of different levels. This will not be compatible with striped class
   Drag drop to reorder:
   Action icons on the right which call an action function by supplying current node and child node data. The function expects the same data s
   
   fixed structure data
   

      
*/
var colors = {"blue" : "#3399FF",
"pastel_orange" : "#FF9966",
"light_orange" : "#FFCC99",
"pale_orange" : "#FFeecc",
"dark_blue" : "#003366",
"bluegreen" : "#336688",
"yellow" : "#FFCC00",
"anotherorange" : "#FF9900",
"green" : "#7BB31A",
"purple" : "#8B88FF",
"yellow" : "#EEDB00",
"orange" : "#FF9C00",
"sky-blue" : "#CAE5FF",
"blue-gray" : "#586784",
"red":"#EC7063"};
// Icon generation 
var icons = { "open": [ {"shape":"line","x1":75,"y1":36, "x2":90,"y2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#999","class":"action"},
                        {"shape":"line","x1":75,"y1":64, "x2":90,"y2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#999","class":"action"}],
              "left": [ {"shape":"circle","cx":50,"cy":50,"r":33,"stroke":"#666","stroke-width":4,"fill":"none"},
                        {"shape":"line","x1":55,"y1":36, "x2":40,"y2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#666","class":"action"},
                        {"shape":"line","x1":55,"y1":64, "x2":40,"y2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#666","class":"action"}],
              "right": [ {"shape":"circle","cx":50,"cy":50,"r":33,"stroke":"#666","stroke-width":4,"fill":"none"},
                        {"shape":"line","x1":45,"y1":36, "x2":60,"y2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#666","class":"action"},
                        {"shape":"line","x1":45,"y1":64, "x2":60,"y2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#666","class":"action"}],
              "add":  [ {"shape":"circle","cx":50,"cy":50,"r":33,"stroke":"#666","stroke-width":4,"fill":"none"},
                        {"shape":"circle","cx":50,"cy":50,"r":27,"fill":"#666","class":"action"},
                        {"shape":"line","x1": 37,"x2":63,"y1":50,"y2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#fff","class":"action"},
                        {"shape":"line","y1": 37,"y2":63,"x1":50,"x2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#fff","class":"action"}],
              "delete":  [ {"shape":"circle","cx":50,"cy":50,"r":33,"stroke":"#666","stroke-width":4,"fill":"none"},
                           {"shape":"circle","cx":50,"cy":50,"r":27,"class":"red","fill":"#EC7063"},
                           {"shape":"line","x1": 37,"x2":63,"y1":50,"y2":50,"stroke-width":8,"stroke-linecap":"round","stroke":"#fff","class":"action"}],
              "radio":[ {"shape":"circle","cx":50,"cy":50,"r":33,"stroke":"#666","stroke-width":4,"fill":"none"},
                        {"shape":"circle","cx":50,"cy":50,"r":27,"class":"radio","fill":"#FF9966"}],
              "checkbox":[ {"shape":"circle","cx":50,"cy":50,"r":33,"stroke":"#666","stroke-width":4,"fill":"none"},
                          {"shape":"g","class":"on","shapes":[
                          {"shape":"circle","cx":50,"cy":50,"r":27,"class":"checked","fill":"#FF9900"},
                          {"shape":"line","x1": 36,"y1":55,"x2":46 ,"y2":64,"stroke-width":6,"stroke-linecap":"round","stroke":"#fff","class":"action"},
                          {"shape":"line","x1": 46,"y1":64,"x2":63 ,"y2":42,"stroke-width":6,"stroke-linecap":"round","stroke":"#fff","class":"action"}]}],
              "success":[ {"shape":"circle","cx":50,"cy":50,"r":33,"stroke":"#666","stroke-width":4,"fill":"none"},
                          {"shape":"circle","cx":50,"cy":50,"r":27,"class":"checked","fill":"#2ECC40"},
                          {"shape":"line","x1": 36,"y1":55,"x2":46 ,"y2":64,"stroke-width":6,"stroke-linecap":"round","stroke":"#fff","class":"action"},
                          {"shape":"line","x1": 46,"y1":64,"x2":63 ,"y2":42,"stroke-width":6,"stroke-linecap":"round","stroke":"#fff","class":"action"}],
              "failure":  [ {"shape":"circle","cx":50,"cy":50,"r":33,"stroke":"#666","stroke-width":4,"fill":"none"},
                          {"shape":"circle","cx":50,"cy":50,"r":27,"class":"action","fill":"#EC7063"},
                          {"shape":"line","x1": 40,"y1":40,"x2":60 ,"y2":60,"stroke-width":8,"stroke-linecap":"round","stroke":"#fff","class":"action"},
                          {"shape":"line","x1": 40,"y1":60,"x2":60 ,"y2":40,"stroke-width":8,"stroke-linecap":"round","stroke":"#fff","class":"action"}],
              "search": [{"shape":"circle","cx":40,"cy":40,"r":22,"fill":"#AED6F1","stroke":"#666","stroke-width":4},
                         {"shape":"circle","cx":40,"cy":40,"r":16,"fill":"#fff","opacity":.7,"class":"gradient"},
                         {"shape":"circle","cx":42,"cy":42,"r":16,"fill":"#AED6F1"},
                         {"shape":"line","x1": 58,"y1":58,"x2":80 ,"y2":80,"stroke-width":6,"stroke-linecap":"round","stroke":"#666"},
                         {"shape":"line","x1": 68,"y1":68,"x2":80 ,"y2":80,"stroke-width":12,"stroke-linecap":"round","stroke":"#666"}]
            };

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function d2r(degs) {
  return degs * (Math.PI / 180);
}

function getRadialPosition(value, maxValue, radius, origin) {
  let degrees = (value / maxValue) * 360;

  let theta = degrees * (Math.PI / 180);

  let pos = {
    x: origin.x + (Math.sin(theta) * radius),
    y: origin.y - (Math.cos(theta) * radius),
    sin: Math.sin(theta),
    cos: Math.cos(theta),
    angle: degrees
  };
  
  lastPos = pos;

  return pos;
}

function addShape(node, d){
   var width  = parseInt(node.style('width'),10);
   var height = parseInt(node.style('height'),10);
   
   var yScale = d3.scale.linear() //d3.scaleLinear() in v4 
                  .domain([0,100])
                  .range([Math.max(0,(height-width)/2), Math.min(height,(height + width)/2)])  
   var xScale = d3.scale.linear() //d3.scaleLinear() in v4
                  .domain([0,100])
                  .range([Math.max(0,(width-height)/2), Math.min(width,(height + width)/2)])  
   var scale =  (width < height) ? xScale:yScale;
   
   //console.log(d);
    if (d.shape == "line"){
       shape = node.append(d.shape)
                   .attr("x1",xScale(d.x1))
                   .attr("y1",yScale(d.y1))
                   .attr("x2",xScale(d.x2))
                   .attr("y2",yScale(d.y2))
                   .attr("stroke",d.stroke);
    }
    else if (d.shape == "circle"){
       shape = node.append(d.shape)
            .attr("cx",xScale(d.cx))
            .attr("cy",yScale(d.cy))
            .attr("r",scale(d.r))
            .attr("fill",d.fill);
    }
    else if (d.shape == "rect"){
       shape = node.append(d.shape)
            .attr("x",xScale(d.x))
            .attr("y",yScale(d.y))
            .attr("width",xScale(d.width))
            .attr("height",xScale(d.height))
            .attr("fill",d.fill);
    }
    
    if (d.hasOwnProperty("stroke"))
        shape.attr("stroke",d.stroke);
    if (d.hasOwnProperty("stroke-linecap"))
        shape.attr("stroke-linecap",d["stroke-linecap"]);
    if (d.hasOwnProperty("stroke-width"))
        shape.attr("stroke-width",scale(d["stroke-width"]));
    if (d.hasOwnProperty("stroke-dasharray"))
        shape.attr("stroke-dasharray",d["stroke-dasharray"]);
    if (d.hasOwnProperty("id"))
        shape.attr("id",d.id);
    if (d.hasOwnProperty("class"))
        shape.attr("class",d.class);
    if (d.hasOwnProperty("clip-path"))
        shape.attr("clip-path",d["clip-path"]);
    if (d.hasOwnProperty("opacity"))
        shape.attr("opacity",d.opacity);
}

function showIcon(wrapper,icon){
   var node   = d3.select(wrapper)
                  .append("svg");
   
   //console.log(node);
   parent = d3.select(wrapper).node();
   //console.log(parent);
   if (!icons.hasOwnProperty(icon))
   {
       console.log("No data for icon named "+icon);
       return;
   }
   node.attr("id",icon);
   node.on("click",handleClick);
   node.data([{"name":icon,"state":"active","mode":parent.className}]);
   
   for (var i=0;i < icons[icon].length;i++){
       addShape(node,icons[icon][i])
   }
}

function removeIcon(wrapper){
   d3.select(wrapper).select("svg").remove();
}

// Drag and Drop Handlers
var dragSrcEl;

function handleDrop(d,i){
   d3.event.stopPropagation();
   if (this != dragSrcEl)
      this.parentNode.insertBefore(dragSrcEl, this);

}

function handleDragStart (d,i) {
   dragSrcEl = d3.event.target;
    
   d3.event.dataTransfer.effectAllowed = 'move';
   d3.event.dataTransfer.setData('text/html', d3.event.target);
   d3.event.fromElement = d3.event.target;
}
  
function handleDragOver (d,i) {
   d3.event.preventDefault();
   d3.event.stopPropagation();
   d3.event.dataTransfer.dropEffect = 'move';
  
   return false;
}
  
function handleDragEnter (d,i) {
    // this / e.target is the current hover target.
   d3.event.stopPropagation();
   if (this != dragSrcEl)
      d3.select(this).classed("over",true);
}
  
function handleDragLeave (d,i) {
   d3.event.stopPropagation();
   d3.select(this).classed("over",false);
}

function handleDragEnd (d,i) {
   d3.event.stopPropagation();
   d3.selectAll("li.over").classed("over",false);
}

function toggle(d){
    d3.event.stopPropagation();
    var node = d3.select(this)
    node.classed("collapsed",!node.classed("collapsed"));
}   

function handleClick(d,i){
    d3.event.stopPropagation();
    
    if (d.mode == "toolbar"){
        var root = this.parentNode.parentNode.parentNode;
        var config = d3.select(root)
                       .data()[0];
        if (d.name == "add"){
            console.log("clicked");
            if (config.hasOwnProperty("template")){
                var rowData = config.template;
                rowData.id = guid();
                console.log(rowData);
                
                var item = d3.select(root).select("ul")
                            .append("li")
                            .attr("id",rowData.id)
                            .data([rowData])
                            .append("h2");
                item.data([rowData])
                    .enter();
                item.each(addContent);
                enableEvents(config);
            }
        }
        if (d.name == "delete"){  
            console.log("clicked!");
            console.log(this);
            console.log(d);
            //d3.select(root)
            //  .select
        }
        if (d.name == "search"){
            searchbar = d3.select(root)
                          .select(".search");
            console.log(searchbar.style("display"));
            if (searchbar.style("display") == "none"){
                searchbar.style("display","block");
            }
            else {
                searchbar.style("display","none");
                clearFilter(root);
            }
            console.log("clicked!");
            console.log(this);
            console.log(d);
            //d3.select(root)
            //  .select
        }
        
    }
    //console.log(i);
}

function onFilterKeyDown(d)
{
   if (d3.event.keyCode === 8 || d3.event.keyCode == 46  ){
      var rootNode = d3.event.target.parentNode.parentNode;
      clearFilter(rootNode);
   }
}
function clearFilter(rootNode)
{ 
    d3.select(rootNode).selectAll("li").style("display","block");
}
function filter()
{
   //console.log(d3.event.target);
   //console.log("["+this.value+"]");
   var rootNode = d3.event.target.parentNode.parentNode;
   var nodes = rootNode.childNodes[2].childNodes;
   
   filterRecursive(nodes,this.value)
       
}
function filterRecursive(nodes,searchText)
{
    for (var i = 0; i< nodes.length;i++)
    {
        //console.log(nodes[i].childNodes[0].textContent);
        //console.log(searchText);
        //console.log(nodes[i].childNodes[0].textContent.indexOf(searchText));
        if (nodes[i].childNodes[0].textContent.indexOf(searchText) == -1)
           if (nodes[i].childNodes.length > 1)
           {
              //console.log(nodes[i].childNodes);
              children = nodes[i].childNodes[1].childNodes;
              filterRecursive(children,searchText);
              var hidden = true;
              
              for (var j = 0; j< children.length && hidden ;j++)
                   hidden = (d3.select(children[j]).style("display") == "none");
              if (hidden)
                 d3.select(nodes[i]).style("display","none");
           }
           else 
              d3.select(nodes[i]).style("display","none"); 
           
    }
}
function showProgress (d)
{
   //var container = d3.select(containerId);
   var pct_success = d["success-pct"] ;
   var pct_failure = d["failure-pct"] ;
   
   var node = d3.select(this);
   
   var width = parseInt(node.style('width'),10);
   var height = parseInt(node.style('height'),10);
   
   if (width == 0){
      width = height*6/8;
   }
   
   var radius = Math.min(width,height)/2;
   var scale = d3.scale.linear()  //scaleLinear in d3 v4
                  .domain([0,100])
                  .range([0, 2*radius]);
   var endAngleSuccess = (2*Math.PI*Math.max(0,Math.min(pct_success/100,1)));
   var endAngleFailure = (2*Math.PI*Math.max(0,Math.min((pct_success+pct_failure)/100,1)));

   node.style("margin-top",top);
   node.select("svg").remove();
   
   var icon = node.append("svg")
               .attr("width", 2*radius)
               .attr("height", 2*radius)
               .style("margin-top", height/2 - radius);
               
               
   var ring = d3.svg.arc() //d3.arc() in v4 
                .innerRadius(scale(45))  
                .outerRadius(scale(50))
                .startAngle(0) 
                .endAngle(2*Math.PI); 
   var success = d3.svg.arc() //d3.arc() in v4 
                .innerRadius(0)  
                .outerRadius(scale(40))
                .startAngle(0) 
                .endAngle(endAngleSuccess); 
   var failure = d3.svg.arc() //d3.arc() in v4 
                .innerRadius(0)  
                .outerRadius(scale(40))
                .startAngle(endAngleSuccess) 
                .endAngle(endAngleFailure); 

   icon.append("path")
       .attr("d", ring)
       .attr("fill", "#AAAAAA")
       .attr("transform", "translate("+scale(50)+","+scale(50)+")");
   
   if (pct_success > 0) {
       icon.append("path")
           .attr("d", success)
           .attr("fill", "#2ECC40")
           .attr("transform", "translate("+scale(50)+","+scale(50)+")");
   }
   if (pct_failure > 0) {
       icon.append("path")
           .attr("d", failure)
           .attr("fill", "#EC7063")
           .attr("transform", "translate("+scale(50)+","+scale(50)+")");
   }
   if (pct_success + pct_failure < 100){
      icon.append("circle")
          .attr("class","pulse")
          .attr("cx",scale(50))
          .attr("cy",scale(50))
          .attr("r",scale(40))
          .attr("fill","#001f3f");
   }
   else if (pct_success == 100) {
      icon.append("line")
          .attr("x1",scale(33)) 
          .attr("x2",scale(44)) 
          .attr("y1",scale(57)) 
          .attr("y2",scale(67)) 
          .attr("stroke-width",scale(8))
          .attr("stroke-linecap","round")
          .attr("stroke","#fff");
      icon.append("line")
         .attr("x1",scale(44)) 
         .attr("x2",scale(68)) 
         .attr("y1",scale(67)) 
         .attr("y2",scale(39)) 
         .attr("stroke-width",scale(8))
         .attr("stroke-linecap","round")
         .attr("stroke","#fff");
   }
   else  {
      icon.append("line")
          .attr("x1",scale(35)) 
          .attr("x2",scale(65)) 
          .attr("y1",scale(35)) 
          .attr("y2",scale(65)) 
          .attr("stroke-width",scale(8))
          .attr("stroke-linecap","round")
          .attr("stroke","#fff");
      icon.append("line")
          .attr("x1",scale(35)) 
          .attr("x2",scale(65)) 
          .attr("y1",scale(65)) 
          .attr("y2",scale(35)) 
          .attr("stroke-width",scale(8))
          .attr("stroke-linecap","round")
          .attr("stroke","#fff");
      
   }
   return this;
}

                 
function addNode(){

}

function deleteNode(d){
}

function updateParentData(){
 //console.log(this);
 var nodeData = d3.select(this).data();
 var childNodes;
 
 if (typeof nodeData[0] == 'undefined'){
   //console.log("this node has no data");
   return this;
 }
 //console.log("before"); 
 //console.log(nodeData[0]); 
 if (this.childNodes.length == 2){
    if (this.childNodes[1].tagName == "UL"){
        nodeData[0].data = [];
        childNodes = this.childNodes[1].childNodes;
        //console.log(childNodes);
        
        if (childNodes.length > 0){
           d3.selectAll(childNodes)
             .each(updateParentData);
        
           nodeData[0].data = d3.selectAll(childNodes).data();
           //console.log("after");
           //console.log(nodeData[0]);
        }
    }
 }
 else {
    //console.log("No more children");
    nodeData[0].extra = "Something extra added at leaf node";
 }
 d3.select(this).data(nodeData);
 return this;
}

function recursive(element){ 
   var root = d3.select(element); 
   console.log(root.node()); 
   
   if (root.node().childNodes.length == 2){
    if (root.node().childNodes[1].tagName == "UL"){
        var childNodes = this.childNodes[1].childNodes;
        for (var i = 0;i <childNodes.length;i++){
            recursive(childNodes[i]);
        }
    }
   }
   
}
  
function serialize(wrapper){
   var item = d3.select(wrapper);
   item.each(updateParentData);
   return item.data();
}
// Adds a list item and it's contents based on the data associated

function addContent(d){
   var node = d3.select(this);
   var level = parseInt(node.node().tagName.substr(1));
   //console.log(d);
   
   if (d.hasOwnProperty("level")){  
      node.append("i").text("&nbsp;");
   } 
   
   
   if (d.hasOwnProperty("text")){
      node.text(d["text"]);
   }
   
   if (d.hasOwnProperty("type-icon")){
      node.append("span")
          .append("img")
          .attr("src",d["type-icon"])
          .attr("alt",d.hasOwnProperty("type")? d["type"]:"");
   }
   if (d.hasOwnProperty("input")){
      node.append("input")
          .attr("value",d["input"])
          .attr("maxlength",d["input-length"])
          .attr("type",d["input-type"]);
   }
   if (d.hasOwnProperty("action")){
      if (d.action == "progress"){
         node.append("span")
             .attr("class","right")
             .each(showProgress);
         
      }
      else {
          showIcon(this,d["action"]);
      }
   }
   // Add a toolbar with predefined set of tools.
   if (d.hasOwnProperty("toolbar")){
      var toolbar = node.append("div")
                        .attr("class","toolbar");
      for (var i = d.toolbar.length -1  ; i >= 0;i--){
          //console.log(d.toolbar[i]);
          showIcon(toolbar.node(),d.toolbar[i]);
          if (d.toolbar[i] == "search"){
              d3.select(node.node().parentNode)
                .append("div")
                .attr("class","search")
                .append("input")
                .attr("id","spotlight")
                .attr("maxlength",500)
                .attr("type","text")
                .on("keydown",onFilterKeyDown)
                .on("keyup",filter);
          }
      }
   }
   var levels = 6;
   if (d.hasOwnProperty("levels")){
       levels = d.hasOwnProperty("levels");
   }
   if (d.hasOwnProperty("data")){
      // Needs to have an option to avoid ul/li for single level lists. 
      // this way single level striped lists can look nice. 
      
      if (levels > 1)
         node = d3.select(this.parentNode).append("ul");
      else 
         node = d3.select(this.parentNode);

      if (d.hasOwnProperty("style")){
         if (level == 1)
            styleNode = d3.select(this.parentNode);
         else 
            styleNode = node;
         
         for (i in d.style)
            styleNode.classed(d.style[i],true);
      }
      if (levels > 1) {
          node.selectAll("li")
              .data(d.data)
              .enter()
              .append("li")
              .attr("id",function(d){return d.id;})
              .append("h2") //+(level+1))
              .each(addContent);
      }
      else{
         node.selectAll("h2")//+(level+1))
             .data(d.data)
             .enter()
             .append("h2") //+(level+1))
             .each(addContent); 
      }
          
   }
   return this;
}

function enableEvents(d){
    if (d.options.indexOf("draggable") >= 0){
       d3.selectAll(d.container + " li")
         .attr("draggable","true")
         .on("dragstart",handleDragStart)
         .on("dragenter",handleDragEnter)
         .on("dragover",handleDragOver)
         .on("dragleave",handleDragLeave)
         .on("dragend",handleDragEnd)
         .on("drop",handleDrop);
   }
   if (d.options.indexOf("collapsible") >= 0){
       d3.selectAll(d.container + " li")
         .on("click",toggle);
   }
}

// Can be converted into List() constructor
function createList(d){
   var wrapper = d.container;
   var node    = d3.select(wrapper);
   node.data([d]).enter();
   node.append("h1")
       .each(addContent);
   
   enableEvents(d);
}

