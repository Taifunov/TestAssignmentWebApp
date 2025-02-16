namespace TestAssignmentWebApp.Components.QuillEditor.Events;

public class TextChangeEventArgs
{
    public object ContentDelta { get; }
    public object OldContentDelta { get; }
    public string? Source { get; }

    public TextChangeEventArgs(object[] argsData)
    {
        ContentDelta = argsData[0];
        OldContentDelta = argsData[1];
        Source = argsData[2].ToString();
    }
}