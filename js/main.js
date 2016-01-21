/**
 * Created by Zimme on 20.01.2016.
 */
$(function () {
    var ITEM_TEMPLATE = $('.state-ready').html();
    var SHORT_TEMPLATE = $('.col-right .segments .stats-not-bought .stats-label').html();

    $(".form input").focus();
    addItem("bread");
    addItem("butter");



    $(".form").keyup(function (event) {
        if (event.keyCode == 13) {
            $(".form button").click();
        }
    });

    $(".form button").click(function () {
        var form = $(".form input");
        addItem(form.val());
        form.val("");
        form.focus();
    });

    function addItem(title){
        var node = $(ITEM_TEMPLATE);
        var parent = $('<div class="segment state-not-bought state-ready"  style="display:none;"></div>');
        if (title) {
            node.find(".title").text(title);
            parent.append(node);
            parent.appendTo($(".col-left .segments")).slideDown();
            addToList(node);

            function addToList(item) {
                var node = $(SHORT_TEMPLATE);
                var parent = $('<span class="label stats-label"  style="display:none;"></span>');
                $(node[0]).text(item.find(".title").text());
                parent.append(node);
                parent.appendTo($(".col-right .segments .stats-not-bought")).fadeIn('slow');
            }


        }
    }

    $(".segments").delegate(".delete-button", "click", function(){
        var parent = $($(this).parents()[2]);
        parent.slideUp( function(){
            parent.remove();
        });
        removeFromList(parent.find(".title").text());

        function removeFromList(node){
            $(".col-right .stats-not-bought .stats-label").each(function(index, item){
                var title = $(item).find(".title").text();
                if(title == node){
                    $(item).fadeOut( function(){
                        $(item).remove();
                    });
                }
            });
        }
    });

    $(".segments").delegate(".buy-button", "click", function(){
        var parent = $($(this).parents()[2]);
        parent.children().fadeOut(function(){
            parent.removeClass("state-ready").addClass("state-bought");
            parent.find(".last-buttons").html('<button class="button unbuy-button">Не куплено</button>');
            parent.children().fadeIn();
        });
        changeInList(parent.find(".title").text());

        function changeInList(node){
            $(".col-right .stats-not-bought .stats-label").each(function(index, item){
                item = $(item);
                var title = item.find(".title").text();
                if(title == node){
                    item.fadeOut( function(){
                        item.remove();
                        var child = '<span class="label stats-label"  style="display:none;">'+item.html()+'</span>';
                        $(child).appendTo($(".col-right .stats-bought")).fadeIn();
                    });
                }
            });
        }
    });

    $(".segments").delegate(".unbuy-button", "click", function(){
        var parent = $($(this).parents()[2]);
        parent.children().fadeOut(function(){
            parent.removeClass("state-bought").addClass("state-ready");
            parent.find(".last-buttons").html('<button class="button buy-button">Куплено</button> <button class="button red delete-button" title="Видалити">x</button>');
            parent.children().fadeIn();
        });
        changeInList(parent.find(".title").text());

        function changeInList(node){
            $(".col-right .stats-bought .stats-label").each(function(index, item){
                item = $(item);
                var title = item.find(".title").text();
                if(title == node){
                    item.fadeOut( function(){
                        item.remove();
                        var child = '<span class="label stats-label"  style="display:none;">'+item.html()+'</span>';
                        $(child).appendTo($(".col-right .stats-not-bought")).fadeIn();
                    });
                }
            });
        }
    });
});