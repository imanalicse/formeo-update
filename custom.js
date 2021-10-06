function formeoGroupValidation($selector) {
        var radio = $selector.find(".f-field-group[required='true'] input[type='radio']").last();
        if (radio.length > 0) {
            console.log('radio = ', radio);
            radio.rules('add', {
                required: true
            });
        }
        var checkbox = $selector.find(".f-field-group[required='true'] input[type='checkbox']").last();
        if(checkbox.length > 0) {
            console.log('checkbox = ', checkbox);
            checkbox.rules('add', {
                required: true
            });
        }
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
                    //$(form).submit();
                    console.log("submitted");
                }
            });
            formeoGroupValidation($form_selector);
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