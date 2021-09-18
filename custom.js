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
            $("#test_form").validate({
                submitHandler: function(form) {
                    return false;
                    //$(form).submit();
                }
            });
        }, 1000);

        //console.log(fdata);

        // var options = {
        //     editorContainer: '#formeo-editor-2',
        //     formData: JSON.parse(fdata)
        // }
		//
        // console.log(JSON.stringify(fdata));
        // var formeo2 = new FormeoEditor(options);

    })

    //FormeoEditor#json
    $('.save-form').on('click', function () {
        console.log('fdf');
        alert('hhh');
    })

    var data = formeo.onSave;
    console.log(data);
})