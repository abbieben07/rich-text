import { EditableTextBase } from "@nativescript/core";
import { FormatMoney } from "./currency.common";

export const CurrencyTextField = (target: EditableTextBase, oldvalue: string, value: string) => {
    target.once(View.loadedEvent, _ => {
        const view: android.widget.EditText = target.nativeTextViewProtected;
        view.setText(FormatMoney(view.text, value))
        view.delegate = CurrencyTextDelegate.initWithOwner(new WeakRef(target), value)
    })
}

@NativeClass()
class CurrencyTextDelegate extends NSObject implements UITextFieldDelegate {
    private owner: WeakRef<EditableTextBase>;
    private symbol: string;
    static ObjCProtocols = [UITextFieldDelegate];

    public static initWithOwner(owner: WeakRef<EditableTextBase>, symbol: string): CurrencyTextDelegate {
        const delegate = super.new() as CurrencyTextDelegate;
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
        const formatted = FormatMoney(text, this.symbol);
        textField.text = formatted;

        return false;
    }
}
