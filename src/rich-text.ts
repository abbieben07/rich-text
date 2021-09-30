import { EditableTextBase, Property } from "@nativescript/core";
import { isNullOrUndefined } from "@nativescript/core/utils/types";
import { CurrencyTextField } from "./currency";
import { MaskedTextField } from "./mask";

export const maskProperty = new Property<EditableTextBase, string>({
    name: 'mask',
    valueChanged: MaskedTextField
});

export const currencyProperty = new Property<EditableTextBase, string>({
    name: 'currency',
    valueChanged: CurrencyTextField
});

export const RichText = () => {
    console.log("Started")
    maskProperty.register(EditableTextBase);
    currencyProperty.register(EditableTextBase);
}

export const getNativeView = (target: EditableTextBase) => isNullOrUndefined(target.nativeTextViewProtected) ? target.nativeTextViewProtected : target.nativeView
