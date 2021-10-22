import { EditableTextBase, View } from "@nativescript/core";
import { FormatMask } from "./mask.common";

export const MaskedTextField = (target: EditableTextBase, oldvalue: string, value: string) => {
    target.once(View.loadedEvent, _ => {
        const view: android.widget.EditText = target.nativeTextViewProtected;
        console.log("Currency", value);
        view.setText(FormatMask(view.getText().toString(), value))

        if (target.textWatcher) {
            view.removeTextChangedListener(target.textWatcher);
        }
        target.textWatcher = new MaskTextWatcher(new WeakRef(target), value)
        view.addTextChangedListener(target.textWatcher);
    })
}

@NativeClass()
@Interfaces([android.text.TextWatcher])
class MaskTextWatcher extends java.lang.Object implements android.text.TextWatcher {
    constructor(private owner: WeakRef<EditableTextBase>, private mask: string) {
        super();
        return global.__native(this);
    }

    afterTextChanged(s: any) { }

    beforeTextChanged(s: string, start: number, before: number, count: number) { }

    onTextChanged(s: string, start: number, before: number, count: number) {
        const owner = this.owner.get();
        const editText: android.widget.EditText = owner.nativeTextViewProtected;
        editText.removeTextChangedListener(this);

        console.log("masked", s.toString());
        const formatted = FormatMask(s.toString(), this.mask);
        editText.setText(formatted);
        editText.setSelection(formatted.length);

        editText.addTextChangedListener(this);
    }
}
