import { EditableTextBase, View } from "@nativescript/core";
import { textProperty } from "@nativescript/core/ui/text-base";
import { FormatMask } from "./mask.common";

export const MaskedTextField = (target: EditableTextBase, oldvalue: string, value: string) => {
    target.once(View.loadedEvent, _ => {
        const view: UITextField = target.nativeTextViewProtected;
        const formatted = FormatMask(view.text, value);
        view.text = formatted;
        textProperty.nativeValueChange(target, formatted)
        //@ts-ignore
        target._delegate = MaskTextDelegate.init(new WeakRef(target), target._delegate, value)
    })
}

@NativeClass()
//@ObjCClass([UITextFieldDelegate])
class MaskTextDelegate extends NSObject implements UITextFieldDelegate {
    private owner: WeakRef<EditableTextBase>;
    private _default: any;
    private symbol: string;
    public static ObjCProtocols = [UITextFieldDelegate];

    public static init(owner: WeakRef<EditableTextBase>, _default: UITextFieldDelegate, symbol: string): MaskTextDelegate {
        const delegate = super.new() as MaskTextDelegate;
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
        const text = textField.text.slice(0, range.location) + replacement + textField.text.slice(range.location);
        const formatted = FormatMask(text, this.symbol);
        textField.text = formatted;
        textProperty.nativeValueChange(this.owner.get() as EditableTextBase, formatted)

        return false;
    }
}
