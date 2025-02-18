using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;

namespace TestAssignmentWebApp.Components.QuillEditor;

public static class QuillInterop
{
    #region Constants

    private const string CreateQuillFunction = "QuillFunctions.createQuill";

    private const string GetHtmlFunction = "QuillFunctions.getQuillHTML";

    private const string RegisterQuillEventFunction = "QuillFunctions.registerQuillEvent";

    private const string UnregisterQuillEventFunction = "QuillFunctions.unregisterQuillEvent";

    private const string InsertTextAtCursorFunction = "QuillFunctions.insertTextAtCursor";

    private const string GetElementPositionByIdFunction = "getElementPositionById";

    #endregion Constants

    internal static ValueTask<object> CreateQuillAsync(
        IJSRuntime jsRuntime,
        ElementReference quillElement,
        ElementReference toolbar,
        bool readOnly,
        string placeholder,
        string theme,
        string debugLevel)
    {
        return jsRuntime.InvokeAsync<object>(
            CreateQuillFunction,
            quillElement,
            toolbar,
            readOnly,
            placeholder,
            theme,
            debugLevel);
    }

    internal static ValueTask<string> GetHtmlAsync(
        IJSRuntime jsRuntime,
        ElementReference quillElement)
    {
        return jsRuntime.InvokeAsync<string>(
            GetHtmlFunction,
            quillElement);
    }

    internal static ValueTask<object> InsertTextAtCursor(
        IJSRuntime jsRuntime,
        ElementReference quillElement,
        string content)
    {
        return jsRuntime.InvokeAsync<object>(
            InsertTextAtCursorFunction,
            quillElement, content);
    }

    internal static ValueTask<object> RegisterQuillEvent(
        IJSRuntime jsRuntime,
        ElementReference quillElement,
        object objRef,
        string eventName)
    {
        return jsRuntime.InvokeAsync<object>(
            RegisterQuillEventFunction,
            quillElement, objRef, eventName);
    }

    internal static ValueTask<object> UnregisterQuillEvent(
        IJSRuntime jsRuntime,
        ElementReference quillElement,
        string eventName)
    {
        return jsRuntime.InvokeAsync<object>(
            UnregisterQuillEventFunction,
            quillElement, eventName);
    }
}
