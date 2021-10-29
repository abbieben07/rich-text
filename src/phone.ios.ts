import { EditableTextBase, View } from "@nativescript/core";
import { textProperty } from "@nativescript/core/ui/text-base";
import { CountryCode } from "libphonenumber-js";
import { FormatPhone } from "./phone.common";

export const PhoneTextField = (target: EditableTextBase, oldvalue: string, value: string) => {
    target.once(View.loadedEvent, _ => {
        const view: UITextField = target.nativeTextViewProtected;
        view.text = FormatPhone(view.text, value as CountryCode)
        view.delegate = PhoneTextDelegate.init(new WeakRef(target), value as CountryCode)
    })
}

@NativeClass()
@ObjCClass([UITextFieldDelegate])
class PhoneTextDelegate extends NSObject implements UITextFieldDelegate {
    private owner: WeakRef<EditableTextBase>;
    private country: CountryCode;
    //static ObjCProtocols = [UITextFieldDelegate];

    public static init(owner: WeakRef<EditableTextBase>, country: CountryCode): PhoneTextDelegate {
        const delegate = super.new() as PhoneTextDelegate;
        delegate.owner = owner;
        delegate.country = country;
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
        const formatted = FormatPhone(text, this.country);
        textField.text = formatted;
        textProperty.nativeValueChange(this.owner.get() as EditableTextBase, formatted)

        return false;
    }
}
