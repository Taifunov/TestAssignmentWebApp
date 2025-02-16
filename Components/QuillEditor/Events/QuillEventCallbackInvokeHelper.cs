using Microsoft.JSInterop;

namespace TestAssignmentWebApp.Components.QuillEditor.Events;

public class QuillEventCallbackInvokeHelper
{
    private readonly Func<string, object[], Task> action;

    public QuillEventCallbackInvokeHelper(Func<string, object[], Task> action)
    {
        this.action = action;
    }

    [JSInvokable]
    public Task QuillEventCallbackCaller(string eventName, object[] arguments)
    {
        return action.Invoke(eventName, arguments);
    }
}