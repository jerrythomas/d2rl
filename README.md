# Data Driven Responsive Listview

A dynamic list component that can be driven by data in JSON format. Inspired by the awesome d3 library which binds data to DOM and uses the data driven approach to create svg elements.

This library creates a list view component that supports several options

* draggable: Allows list rows to be dragged and reordered
* collapsible: Enables expanding and collapsing levels
* toolbar: adds a toolbar with predefined icons (delete, add, search). 

## Usage Options:
* Accordion
* Editable List
* Collapsible
* Drag & Drop interactions
* Themes

## Example:

Requires d3. Add the following to the html header
```
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="js/d2rl.js"></script>
<link rel="stylesheet" href="css/d2rl.css" type="text/css" media="all">
```
Add a tag for the list container
```
<div id="selection" class="list"></div>
```
Add the following javascript code providing some data. 
```
<script type="text/javascript">
  createList([{}]);
</script>
```
