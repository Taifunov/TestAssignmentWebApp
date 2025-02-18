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
        insertTextAtCursor: function (quillElement, text) {
            const quill = this.getInstance(quillElement);

            var range = quill.getSelection();

            if (range) {
                quill.insertText(range.index, text);
            } else {
                quill.focus();
                range = quill.getSelection();
                quill.insertText(range.index, text);
            }
        },
        getQuillText: function (quillElement) {
            return quillElement.__quill.getText();
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

    // Just to not create separate file to simplify pasted this func here
    window.getElementPositionById = function (selector) {
        const element = document.querySelector(selector);
        if (!element) {
            return null;
        }

        const rect = element.getBoundingClientRect();
        const scrollLeft = document.documentElement.scrollLeft;
        const scrollTop = document.documentElement.scrollTop;

        //return {
        //    x: rect.x,
        //    y: rect.y,
        //    width: rect.width,
        //    height: rect.height,
        //    top: rect.top + scrollTop,
        //    right: rect.right + scrollLeft,
        //    bottom: rect.bottom + scrollTop,
        //    left: rect.left + scrollLeft
        //}

        return {
            Top: rect.top,
            Bottom: rect.bottom,
            Left: rect.left,
            Right: rect.right
        };
    };
    })();