/**
 * Created by Zimme on 20.01.2016.
 */
$(function () {
    var ITEM_TEMPLATE = $('.state-ready').html();
    var SHORT_TEMPLATE = $('.col-right .segments .stats-not-bought .stats-label').html();

    $(".form input").focus();

    $(".form").keyup(function (event) {
        if (event.keyCode == 13) {
            $(".form button").click();
        }
    });

    function addItem(title){

    }

    $(".form button").click(function () {
        var node = $(ITEM_TEMPLATE);
        var form = $(".form input");
        var parent = $('<div class="segment state-not-bought state-ready"></div>');
        if (form.val()) {
            node.find(".title").text(form.val());
            parent.append(node);
            parent.hide().appendTo($(".col-left .segments")).show('normal');
            form.val("");
            form.focus();

            function addToList(item) {
                var node = $(SHORT_TEMPLATE);
                var parent = $('<span class="label stats-label"></span>');
                $(node[0]).text(item.find(".title").text());
                parent.append(node);
                parent.hide().appendTo($(".col-right .segments .stats-not-bought")).show('normal');
            }

            addToList(node);
        }
    });
});