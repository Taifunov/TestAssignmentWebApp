namespace TestAssignmentWebApp.Components.QuillEditor.Events;

public class SelectionChangeEventArgs
{
    public object Range { get; }
    public object OldRange { get; }
    public string? Source { get; }

    public SelectionChangeEventArgs(object[] argsData)
    {
        Range = argsData[0];
        OldRange = argsData[1];
        Source = argsData[2].ToString();
    }
}