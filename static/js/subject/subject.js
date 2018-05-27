/**
 * Created by marcos on 07/05/15.
 */

$(document).ready(function() {
    var name = $('#nameInput');
    var activities = $('#activitiesInput');
    var records = $('#ol');
    var salvar = $('#salvar');
    var gerenciar = $('#gerenciar');
    var fields = $('#fields').find('input[type=text]');
    var ajaxBtn = $('#ajax-save-gif');
    var table = $('table');
    var lst = $('#lst');
    var pesq = $('#pesq');
    ajaxBtn.hide();


    function clearAllFields() {
        fields.val('');
    }

    function getFields() {
        return {
            'name': name.val(),
            'activities': activities.val(),
            'course': $('option:selected').val()
        }
    }

    function getId(id) {
        return {
            'id': id.val()
        }
    }

    $(document).on('click', 'td button', function() {
        var r = confirm("Deseja realmente remover este registro?");

        if (r) {
            $.post('/subjects/rest/deletar',
                getId($(this))
            ).success(function(dic) {
                    $('tr[value='+dic["id"]+']').remove();
                });
        }
    });

    salvar.click(function() {
        $('.has-error').removeClass('has-error');
        $('.help-block').empty();
        salvar.attr('disabled', 'disabled');
        ajaxBtn.show("slow");
        $.post('/subjects/rest/salvar',
            getFields()
        ).success(function(success) {
                //table.append('<tr value="'+success["id"]+'"> <td>'+success["name"]+
                //'</td> <td>' +success["activities"]+ '</td> <td>'+success["course"]+'</td>'+
                //'</td><td> <a class="btn btn-success" href="{{ s.edit_path }}" style="background: #10698F !important; margin-left: 10px"> <i class="glyphicon glyphicon-pencil"></i></a>'+
                //'</td> <td> <button class="btn btn-danger" value="'+success["id"]+'" style="margin-left: 10px"> <i class="glyphicon glyphicon-trash"></i> </button> </td>');
                clearAllFields();
            }).error(function(erro) {
                for (propriedade in erro.responseJSON){
                    $('#'+propriedade+'-div').addClass('has-error');
                    $('#'+propriedade+'-span').text(erro.responseJSON[propriedade]);
                }
            }).always(function(){
                ajaxBtn.hide();
                salvar.removeAttr('disabled');
            });
    });


    gerenciar.click(function(){
        lst.fadeToggle();
        records.fadeToggle();
        $(this).css({"color":"white"});
    });
});


