"use strict";

var d = $(":input").serializeArray();
$("#confirm").empty();
jQuery.each(d, function (i, field) {
  $("#confirm").append(field.name + ": " + field.value + "<br>");
});