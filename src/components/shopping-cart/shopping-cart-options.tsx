
import { availableCurrencies } from '../../config/utilities';
import * as elements from 'typed-html';

interface ShoppingCartOptionsProps {
    rushMode: string
    currency: string
}

export const ShoppingCartOptions = ({rushMode, currency}: ShoppingCartOptionsProps) => {
    const rushModeChecked = rushMode === 'on';

    return <fieldset name="options">
        <legend>Options</legend>
        <noscript>
            <legend>Please click on refresh to update your options</legend>
        </noscript>
        <div class="mb-3">
            <input type="radio" name="rushMode" id="nonRushMode" value="off" checked={!rushModeChecked}/>
            <label for="nonRushMode">
                Normal delivery
            </label>
            <br />
            <input type="radio" name="rushMode" id="rushMode" value="on" checked={rushModeChecked}/>
            <label for="rushMode">
                Fast delivery
            </label>
        </div>
        <div class="mb-3">
            <label for="currency" class="form-label">Currency</label>
            <select class="form-select form-select-lg" name="currency" id="currencySelect">
                {Object.entries(availableCurrencies).map(
                    ([currencySymbol, currencyDisplay]) => {
                        if (currencySymbol !== currency) {
                            return <option value={currencySymbol}>
                                {currencyDisplay}
                            </option>
                        } else {
                            return <option value={currencySymbol} selected=''>
                                {currencyDisplay}
                            </option>
                        }
                    }
                )}
            </select>
        </div>
    </fieldset>
};