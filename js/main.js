/**
 * Created by Zimme on 20.01.2016.
 */
$(function () {
    var ITEM_TEMPLATE = $('.state-ready').html();
    var SHORT_TEMPLATE = $('.col-right .segments .stats-not-bought .stats-label').html();
    var LEFT_PANEL = $(".col-left .segments");
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

    LEFT_PANEL.delegate(".delete-button", "click", function(){
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

    LEFT_PANEL.delegate(".buy-button", "click", function(){
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

    LEFT_PANEL.delegate(".unbuy-button", "click", function(){
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

    LEFT_PANEL.delegate(".state-ready span.title", "click", function(){
        var parent = $($(this).parents()[0]);
        $(this).fadeOut(function(){
            var input = '<input class="title" type="text" value="'+$(this).text()+'" style="display: none"/><span class="oldtitle" style="display: none;">'+$(this).text()+'</span> ';
            parent.html(input);
            $(parent.children()[0]).fadeIn( function(){
                parent.children().focus();
            });
        });
    });

    LEFT_PANEL.delegate(".state-ready input.title", "focusout", function(){
        var parent = $($(this).parents()[0]);
        var oldName = parent.find(".oldtitle").text();
        var newName = $(this).val();
        $(this).fadeOut(function(){
            var input = '<span class="title" style="display: none">'+newName+'</span>';
            parent.html(input);
            parent.children().fadeIn();
            changeInList(oldName);

            function changeInList(node){
                $(".col-right .stats-not-bought .stats-label").each(function(index, item){
                    item = $(item);
                    var title = item.find(".title").text();
                    if(title == node){
                        item.find(".title").fadeOut(function(){
                            item.find(".title").text(newName).fadeIn();
                        });
                    }
                });
            }
        });
    });

    LEFT_PANEL.delegate(".state-ready .add-buttons .button", "click", function(){
        var parent = $($(this).parents()[0]);
        var numCol = parent.find(".count-label");
        var itemTitle = $($(this).parents()[2]).find(".title").text();
        var currentNum = parseInt(numCol.text());
        var currentButton = $(this);

        numCol.fadeOut(function(){
            if(currentButton.hasClass("plus-button")) numCol.text(currentNum+1).fadeIn();
            else                                      numCol.text(currentNum-1).fadeIn();

            if(parseInt(numCol.text())<=1) parent.find(".minus-button").attr("disabled", true);
            else                           parent.find(".minus-button").removeAttr("disabled");

        });
        changeInList(itemTitle);
        function changeInList(node){
            $(".col-right .stats-not-bought .stats-label").each(function(index, item){
                item = $(item);
                var title = item.find(".title").text();
                if(title == node){
                    item.find(".count").fadeOut(function(){
                        if(currentButton.hasClass("plus-button")) item.find(".count").text(currentNum+1).fadeIn();
                        else                                      item.find(".count").text(currentNum-1).fadeIn();
                    });
                }
            });
        }
    });

});