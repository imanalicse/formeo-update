function formeoRadioCheckboxValidation($selector) {

        $selector.find(".f-field-group[required='true']").each(function (index, element) {
            var $element = $(element);
            var radio = $element.find("input[type='radio']").last();
            if (radio.length > 0) {
                console.log('radio = ', radio);
                radio.rules('add', {
                    required: true
                });
            }

            var checkbox = $element.find("input[type='checkbox']").last();
            if(checkbox.length > 0) {
                console.log('checkbox = ', checkbox);
                checkbox.rules('add', {
                    required: true
                });
            }
        });
    }

jQuery(document).ready(function ($) {
	 const controlOptions = {
        disable: {
            formActions: true, // cancel and save buttons will not be shown
            // formActions: ['clearBtn'], // only the clear button will be disabled
        },
    }

    const formeoOptions = {
        controls: controlOptions,
    }
    console.log(formeoOptions);

    disable: {
        groups: ['html', 'layout']
    }

    var formeo = new FormeoEditor({
        editorContainer: '#formeo-editor',
        controls: {
            elementOrder : {
                html: ['divider', 'header', 'paragraph'],
            },
            config: {
                html: 'header'
            },
            disable: {
                //formActions: true, // cancel and save buttons will not be shown
                // formActions: ['clearBtn'], // only the clear button will be disabled
            },


        },
    });

  $.fn.serializeFiles = function() {
    var form = $(this),
        formData = new FormData()
        formParams = form.serializeArray();

        $.each(form.find('input[type="file"]'), function(i, tag) {
          $.each($(tag)[0].files, function(i, file) {
            formData.append(tag.name, file);
          });
        });

        $.each(formParams, function(i, val) {
          formData.append(val.name, val.value);
        });

    return formData;
  };


    const renderer = new FormeoRenderer({
        renderContainer: '#formeo-editor-render',
    });

    $('#btn-clck').on('click', function (e) {
        var form_data = formeo.json;
        form_data = JSON.parse(form_data);
        console.log(form_data);
        renderer.render(form_data);
        setTimeout(function () {
            $form_selector = $("#test_form");
            $form_selector.validate({
                errorPlacement: function (error, element) {
                    console.log(error);
                    console.log(element);
                    if (element.attr('type') === 'radio' && element.closest(".f-field-group") && element.closest(".f-field-group").length > 0) {
                        error.insertAfter(element.closest(".f-field-group"));
                    }else if (element.attr('type') === 'checkbox' && element.closest(".f-field-group") && element.closest(".f-field-group").length > 0) {
                        error.insertAfter(element.closest(".f-field-group"));
                    } else {
                        error.insertAfter(element);
                    }
				},
                submitHandler: function(form) {
                    console.log("submitted");
                    $form = $(form);
                    //$(form).submit();
                    console.log('$form', $form);
                    let myForm = document.getElementById('test_form');
                    let test_form2 = document.getElementById('test_form2');
                    //var formData = $("#test_form").serializeFiles();
                    var formData = new FormData(myForm);
                    console.log('formData', formData.entries());
                    var customFormData = {};
                    for (var d of formData) {
                        console.log(d);
                        customFormData[d[0]] = d[1];
                    }
                    console.log('customFormData', customFormData);
                    var test_form2FormData = new FormData(test_form2);
                    console.log('test_form2FormData', formData.entries());
                    for (var d of test_form2FormData) {
                        console.log(d);
                    }

                    $.ajax({
                        url: "http://localhost/test/formeo-update/form_submit.php",
                        method:"POST",
                        data: {
                            'aaa': customFormData
                        },
                        contentType: 'multipart/form-data',
                        cache : false,
                        //processData: false,
                        success:function(res) {
                            console.log('res', res);
                        }

                    });
                    return false;
                }
            });
            formeoRadioCheckboxValidation($form_selector);
        }, 1000);

        //console.log(fdata);

        // var options = {
        //     editorContainer: '#formeo-editor-2',
        //     formData: JSON.parse(fdata)
        // }
		//
        // console.log(JSON.stringify(fdata));
        // var formeo2 = new FormeoEditor(options);

    });

    //FormeoEditor#json
    $('.save-form').on('click', function () {
        console.log('fdf');
        alert('hhh');
    })

    var data = formeo.onSave;
    console.log(data);
})