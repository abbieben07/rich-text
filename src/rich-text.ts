import { EditableTextBase, Property } from "@nativescript/core";
import { isNullOrUndefined } from "@nativescript/core/utils/types";
import { CurrencyTextField } from "./currency";
import { MaskedTextField } from "./mask";
import { PhoneTextField } from "./phone";

export const maskProperty = new Property<EditableTextBase, string>({
    name: 'mask',
    valueChanged: MaskedTextField
});

export const currencyProperty = new Property<EditableTextBase, string>({
    name: 'currency',
    valueChanged: CurrencyTextField
});

export const phoneProperty = new Property<EditableTextBase, string>({
    name: 'phone',
    valueChanged: PhoneTextField
})

export function installRichText(): void {
    maskProperty.register(EditableTextBase);
    currencyProperty.register(EditableTextBase);
    phoneProperty.register(EditableTextBase);
}

export function getNativeView(target: EditableTextBase): any {
    return isNullOrUndefined(target.nativeTextViewProtected) ? target.nativeTextViewProtected : target.nativeView;
}
