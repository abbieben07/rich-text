import { EditableTextBase, View } from "@nativescript/core";
import { textProperty } from "@nativescript/core/ui/text-base";
import { FormatMoney } from "./currency.common";

export const CurrencyTextField = (target: EditableTextBase, oldvalue: string, value: string) => {
    target.once(View.loadedEvent, _ => {
        const view: UITextField = target.nativeTextViewProtected;
        const formatted: string = FormatMoney(view.text, value);
        view.text = formatted;
        textProperty.nativeValueChange(target, formatted)
        //@ts-ignore
        target._delegate = CurrencyTextDelegate.init(new WeakRef(target), target._delegate, value)
    })
}

@NativeClass()
//@ObjCClass([UITextFieldDelegate])
class CurrencyTextDelegate extends NSObject implements UITextFieldDelegate {
    private owner: WeakRef<EditableTextBase>;
    private _default: any;
    private symbol: string;
    public static ObjCProtocols = [UITextFieldDelegate];

    public static init(owner: WeakRef<EditableTextBase>, _default: UITextFieldDelegate, symbol: string): CurrencyTextDelegate {
        const delegate = super.new() as CurrencyTextDelegate;
        delegate.owner = owner;
        delegate._default = _default;
        delegate.symbol = symbol;
        return delegate;
    }

    public textFieldShouldBeginEditing(textField: UITextField): boolean {
        return this._default.textFieldShouldBeginEditing(textField);
    }

    public textFieldDidBeginEditing(textField: UITextField): void {
        this._default.textFieldDidBeginEditing(textField);
        textField.selectedTextRange = textField.textRangeFromPositionToPosition(textField.beginningOfDocument, textField.beginningOfDocument);
    }

    public textFieldDidEndEditing(textField: UITextField): void {
        this._default.textFieldDidEndEditing(textField);
    }

    public textFieldShouldClear(textField: UITextField): boolean {
        return this._default.textFieldShouldClear(textField);
    }

    public textFieldShouldReturn(textField: UITextField): boolean {
        return this._default.textFieldShouldReturn(textField);
    }

    public textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacement: string): boolean {
        const text: string = textField.text.slice(0, range.location) + replacement + textField.text.slice(range.location);

        const formatted = FormatMoney(text, this.symbol);
        textField.text = formatted;
        textProperty.nativeValueChange(this.owner.get() as EditableTextBase, formatted)

        return false;
    }
}
