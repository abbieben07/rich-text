import { EditableTextBase, View } from '@nativescript/core';
import { textProperty } from '@nativescript/core/ui/text-base';
import { CountryCode } from 'libphonenumber-js';
import { FormatPhone } from './phone.common';

export const PhoneTextField = (target: EditableTextBase, oldvalue: string, value: string): void => {

    target.once(View.loadedEvent, (_) => {
        const view: android.widget.EditText = target.nativeTextViewProtected;

        //@ts-ignore
        view.removeTextChangedListener(view.listener)
        view.setText(FormatPhone(view.getText().toString(), value as CountryCode));

        //@ts-ignore
        if (target.textWatcher) view.removeTextChangedListener(target.textWatcher);
        //@ts-ignore
        target.textWatcher = new PhoneTextWatcher(new WeakRef(target), value as CountryCode);
        //@ts-ignore
        view.addTextChangedListener(target.textWatcher);
    });
};

@NativeClass()
@Interfaces([android.text.TextWatcher])
class PhoneTextWatcher extends java.lang.Object implements android.text.TextWatcher {
    constructor(private owner: WeakRef<EditableTextBase>, private country: CountryCode) {
        super();
        return global.__native(this);
    }

    afterTextChanged(s: any): void { }

    beforeTextChanged(s: string, start: number, before: number, count: number): void { }

    onTextChanged(s: string, start: number, before: number, count: number) {
        const owner: EditableTextBase = this.owner.get();
        const editText: android.widget.EditText = owner.nativeTextViewProtected;
        editText.removeTextChangedListener(this);

        const formatted = FormatPhone(s.toString(), this.country);
        editText.setText(formatted);
        editText.setSelection(formatted.length);
        textProperty.nativeValueChange(owner, formatted);

        editText.addTextChangedListener(this);
    }
}
