import * as elements from 'typed-html';

class SearchBarProps {
    placeholder: string = '';
    endpoint: string = '';
    target: string = '';
    swap: string = 'innerHTML';
    className: string = '';
    inputDelayMs: number = 300;
};

export const SearchBar = (
    {placeholder, endpoint, target, swap, className, inputDelayMs: inputDelay}: SearchBarProps,
    children: elements.Children
) => {
    return (<form
        _="on resetSearch call me.reset()"
        autocomplete="off"
        class={className}
        data-hx-get={endpoint}
        data-hx-target={target}
        data-hx-swap={swap}
        data-hx-trigger={`input delay:${inputDelay}ms`}
    >
        {children}
    </form>)
};