import { EditableTextBase, View } from "@nativescript/core";
import { FormatMoney } from "./currency.common";

export const CurrencyTextField = (target: EditableTextBase, oldvalue: string, value: string) => {

    target.once(View.loadedEvent, _ => {
        const view: android.widget.EditText = target.nativeTextViewProtected;
        console.log("Currency", value);
        view.setText(FormatMoney(view.getText().toString(), value))

        if (target.textWatcher) {
            view.removeTextChangedListener(target.textWatcher);
        }
        target.textWatcher = new CurrencyTextWatcher(new WeakRef(target), value)
        view.addTextChangedListener(target.textWatcher);
    })
}

@NativeClass()
@Interfaces([android.text.TextWatcher])
class CurrencyTextWatcher extends java.lang.Object implements android.text.TextWatcher {
    constructor(private owner: WeakRef<EditableTextBase>, private symbol: string) {
        super();
        return global.__native(this);
    }

    afterTextChanged(s: any) { }

    beforeTextChanged(s: string, start: number, before: number, count: number) { }

    onTextChanged(s: string, start: number, before: number, count: number) {
        console.log("Text", this.symbol)
        const owner = this.owner.get();
        const editText: android.widget.EditText = owner.nativeView;
        editText.removeTextChangedListener(this);

        const formatted = FormatMoney(s.toString(), this.symbol);
        editText.setText(formatted);
        editText.setSelection(formatted.length);

        editText.addTextChangedListener(this);
    }
}
