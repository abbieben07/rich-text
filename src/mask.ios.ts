import { EditableTextBase } from "@nativescript/core";

@NativeClass()
export class MaskTextDelegate extends NSObject implements UITextFieldDelegate {
    private owner: WeakRef<EditableTextBase>;
    private symbol: string;
    static ObjCProtocols = [UITextFieldDelegate];

    public static initWithOwner(owner: WeakRef<EditableTextBase>, symbol: string): MaskTextDelegate {
        const delegate = super.new() as MaskTextDelegate;
        delegate.owner = owner;
        delegate.symbol = symbol;
        return delegate;
    }

    public textFieldShouldBeginEditing(textField: UITextField): boolean {
        return true;//this._defaultImplementation.textFieldShouldBeginEditing(textField);
    }

    public textFieldDidBeginEditing(textField: UITextField) {
        //this._defaultImplementation.textFieldDidBeginEditing(textField);
        //textField.selectedTextRange = textField.textRangeFromPositionToPosition(textField.beginningOfDocument, textField.beginningOfDocument);
    }

    public textFieldDidEndEditing(textField: UITextField) {
        //this._defaultImplementation.textFieldDidEndEditing(textField);
    }

    public textFieldShouldClear(textField: UITextField): boolean {
        return true;//this._defaultImplementation.textFieldShouldClear(textField);
    }

    public textFieldShouldReturn(textField: UITextField): boolean {
        return true;//this._defaultImplementation.textFieldShouldReturn(textField);
    }

    public textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacement: string): boolean {
        const text = textField.text.slice(0, range.location) + replacement + textField.text.slice(range.location);
        const formatted = FormatMask(text, this.symbol);
        textField.text = formatted;

        return false;
    }
}
