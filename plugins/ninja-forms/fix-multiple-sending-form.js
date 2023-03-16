(function ($) {
    $(document).on( 'nfFormReady' , function () {
        if(typeof Marionette !== 'undefined') {
            const FormExtend = Marionette.Object.extend( {

                initialize: function() {
                    // js foreach from array
                    nfForms.forEach(function (form) {
                        Backbone.Radio.channel( 'form-' + form.id ).reply( 'maybe:submit', this.beforeSubmit, this, form.id);

                        this.listenTo( Backbone.Radio.channel( 'form-' + form.id ), 'submit:response', this.actionSubmit );
                    }.bind(this));
                },

                actionSubmit: function( response ) {
                    let form = nfRadio.channel( 'form-' + response.data.form_id ).request( 'get:el' )
                    $(".submit-container button", form).css('pointer-events', '');
                    nfRadio.channel( 'form-' + response.data.form_id ).request( 'add:extra', 'sending', false )
                },

                beforeSubmit( formObject ) {
                    if ( !formObject.get( 'errors' ).length ) {
                        if( formObject.getExtra( 'sending' ) ) {
                            return false;
                        }

                        let form = nfRadio.channel( 'form-' + formObject.id ).request( 'get:el' )
                        $(".submit-container button", form).css('pointer-events', 'none');
                        nfRadio.channel( 'form-' + formObject.id ).request( 'add:extra', 'sending', true )
                    }
                },
            });

            new FormExtend()
        }
    } );
})(jQuery);

