import * as elements from 'typed-html';

class SearchBarProps {
    placeholder: string = '';
    endpoint: string = '';
    target: string = '';
    swap: string = 'innerHTML';
    className: string = '';
};

export const SearchBar = (
    {placeholder, endpoint, target, swap, className}: SearchBarProps,
    children: elements.Children
) => {
    return (<form
        _="on resetSearch call me.reset()"
        autocomplete="off"
        class={className}
        data-hx-get={endpoint}
        data-hx-target={target}
        data-hx-swap={swap}
        data-hx-trigger='input delay:150ms'
    >
        {children}
    </form>)
};