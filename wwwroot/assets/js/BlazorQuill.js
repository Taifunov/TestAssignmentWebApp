// Ensure you have the quill-blot-formatter library installed

(function () {
    window.QuillFunctions = {
        createQuill: function (
            quillElement,
            toolBar,
            readOnly,
            placeholder,
            theme,
            debugLevel) {
                
            var options = {
                debug: debugLevel,
                modules: {
                    toolbar: toolBar,
                },
                placeholder: placeholder,
                readOnly: readOnly,
                theme: theme
            };

            const quill = new Quill(quillElement, options);

            quillElement.__quill = quill;
        },
        getQuillContent: function (quillElement) {
            return JSON.stringify(quillElement.__quill.getContents());
        },
        getQuillText: function (quillElement) {
            return quillElement.__quill.getText();
        },
        loadQuillContent: function (quillElement, quillContent) {
            content = JSON.parse(quillContent);
            return quillElement.__quill.setContents(content, 'api');
        },
        insertQuillImage: function (quillElement, imageURL) {
            var Delta = Quill.import('delta');
            editorIndex = 0;

            if (quillElement.__quill.getSelection() !== null) {
                editorIndex = quillElement.__quill.getSelection().index;
            }

            return quillElement.__quill.updateContents(
                new Delta()
                    .retain(editorIndex)
                    .insert({ image: imageURL },
                        { alt: imageURL }));
        },
        getQuillHTML: function (quillElement) {
            const quill = this.getInstance(quillElement);
            return quill.root.innerHTML;
        },
        registerQuillEvent: function (quillElement, dotnetHelper, eventName) {
            const quill = this.getInstance(quillElement);

            if (!quillElement[`__quill_event_${eventName}`]) {
                quillElement[`__quill_event_${eventName}`] = function (...args) {
                    dotnetHelper.invokeMethodAsync("QuillEventCallbackCaller", eventName, [...arguments])
                }
                quill.on(eventName, quillElement[`__quill_event_${eventName}`]);
            }
        },
        unregisterQuillEvent: function (quillElement, eventName) {
            const quill = this.getInstance(quillElement);

            if (quillElement[`__quill_event_${eventName}`]) {
                quill.off(eventName, quillElement[`__quill_event_${eventName}`]);
            }
        },
        getInstance: function (quillElement) {
            const quill = quillElement.__quill;
            if (!quill) {
                console.error("Quill instance not found on element.");
                return;
            }

            return quill;
        }
    };
})();